import { FC, useEffect, useState } from 'react';
import { Avatar, Table, Group, Text, ActionIcon, Menu, rem, Button, Flex } from '@mantine/core';
import {
    IconTrash,
    IconDots,
    IconReload,
    IconReceiptRupee,
    IconCoinRupee,
} from '@tabler/icons-react';
import AddMemberModal from '../../Shared/UserModal/AddMemberModal';
import { getAllDocsService } from '../../../services/app/common/getAllDoc.service';
import { DB } from '../../../constants/db.constant';
import { deleteDocService } from '../../../services/app/common/removeDoc.service';
import { notifications } from '@mantine/notifications';
import { SUCCESS_MESSAGE } from '../../../constants/success.constants';
import { ERROR_MESSAGE } from '../../../constants/error.constant';
import { format } from 'date-fns';
import { partialUpdateDocService } from '../../../services/app/common/updateDoc.service';

interface AllMembersProps {

}

const AllMembers: FC<AllMembersProps> = ({ }) => {
    const [userList, setUsersList] = useState<any>([])

    // FETCH ALL USERS FROM DB
    const fetchAllUsers = async () => {
        try {
            const users: any = await getAllDocsService(DB.USER)
            const filteredUsers = users.filter((item: { role: string; }) => item.role !== "admin" && item.role !== "user")
            setUsersList(filteredUsers)
        } catch (error) {
            console.error(error);
        }
    }

    // DELETE A SINGLE USER
    const deleteUser = async (userId: string) => {
        const result = await deleteDocService(userId, DB.USER)
        if (result.success) {
            notifications.show({
                message: SUCCESS_MESSAGE.DELETE,
                title: 'Success',
                color: 'green'
            })
            fetchAllUsers()
        } else {
            notifications.show({
                message: ERROR_MESSAGE.DEFAULT,
                title: 'Error',
                color: 'red'
            })
        }
    }

    // UPDATE BILL STATUS OF SINGLE USER
    const updateBillPaymentStatus = async (docId: string, status: boolean) => {
        const currentDate = new Date();
        const formattedDate = format(currentDate, 'dd MMMM yyyy')
        console.log(formattedDate);
        if (status) {
            const updatedStatus = {
                lastBillPayment: formattedDate
            }
            await partialUpdateDocService(docId, updatedStatus, DB.USER)
            fetchAllUsers()
        } else {
            const updatedStatus = {
                lastBillPayment: "Due"
            }
            await partialUpdateDocService(docId, updatedStatus, DB.USER)
            fetchAllUsers()
        }
    }

    // SET NOTIFICATION ON BILL DUE TO THE USER
    const setBillNotification = async (docId: string, status: boolean) => {
        const currentDate = new Date();
        const formattedDate = format(currentDate, 'dd MMMM yyyy')
        if (status) {
            const billReminder = {
                billReminder: {
                    reminder: "You have not paid the fee yet.",
                    date: formattedDate
                }
            }
            await partialUpdateDocService(docId, billReminder, DB.USER)
        } else {
            const billReminder = {
                billReminder: {
                    reminder: null,
                    date: formattedDate
                }
            }
            await partialUpdateDocService(docId, billReminder, DB.USER)
        }
        fetchAllUsers()
    }

    useEffect(() => {
        fetchAllUsers()
    }, [])
    const rows = userList.map((item: any) => (
        <Table.Tr key={item.username}>
            <Table.Td>
                <Group gap="sm">
                    <Avatar size={40} radius={40} />
                    <div>
                        <Text fz="sm" fw={500}>
                            {item.username}
                        </Text>
                        <Text c="dimmed" fz="xs">
                            {item.email}
                        </Text>
                    </div>
                </Group>
            </Table.Td>
            <Table.Td>
                <Text fz="sm">{item.healthCondition}</Text>
                <Text fz="xs" c="dimmed">
                    Health Condition
                </Text>
            </Table.Td>
            <Table.Td>
                <Text fz="sm">Rs {item.fees.toFixed(1)} / month</Text>
                <Text fz="xs" c="dimmed">
                    Monthly Fees
                </Text>
                <Text fz="xs" c="dimmed">
                    {item.lastBillPayment ? `Last Payment: ${item.lastBillPayment}` : "Last Payment: Due"}
                </Text>
            </Table.Td>
            <Table.Td>
                <Group gap={0} justify="flex-center">
                    <ActionIcon variant="subtle" color="gray">
                        <AddMemberModal isEditing={true} editingData={item} />
                    </ActionIcon>
                    <Menu
                        transitionProps={{ transition: 'pop' }}
                        withArrow
                        position="bottom-end"
                        withinPortal
                    >
                        <Menu.Target>
                            <ActionIcon variant="subtle" color="gray">
                                <IconDots style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item
                                leftSection={
                                    <IconCoinRupee style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                                }
                                onClick={() => updateBillPaymentStatus(item.id, (item.lastBillPayment === 'Due' || !item.lastBillPayment) ? true : false)}                            >
                                {(item.lastBillPayment === 'Due' || !item.lastBillPayment) ? "Bill Paid" : "Bill Not Paid"}
                                <Text fz="xs" c="dimmed">
                                    Update payment status
                                </Text>
                            </Menu.Item>
                            <Menu.Item
                                leftSection={<IconReceiptRupee style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                                onClick={() => setBillNotification(item.id, (item.billReminder ? (item.billReminder.reminder === null ? true : false) : true))}
                            >
                                {(item.billReminder ? (item.billReminder.reminder === null ? "Send Bill Reminder" : "Remove Bill Reminder") : "Send Bill Reminder")}
                                <Text fz="xs" c="dimmed">
                                    {(item.billReminder ? (item.billReminder.reminder === null ? "No notification is send" : "Notification already delivered") : "No notification is send")}
                                </Text>
                            </Menu.Item>
                            <Menu.Item
                                leftSection={<IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                                color="red"
                                onClick={() => deleteUser(item.id)}
                            >
                                Delete Membership
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));
    return (
        <>
            <Text fw={500} size="xl" c="dimmed" mb="md" mt="md">
                Manage Members
            </Text>

            <Flex justify={"space-between"}>
                <AddMemberModal isEditing={false} />
                <Button p='5' mb="md" radius='xl' onClick={fetchAllUsers}><IconReload /></Button>
            </Flex>

            <Table.ScrollContainer minWidth={800}>
                <Table verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Member</Table.Th>
                            <Table.Th>Condition</Table.Th>
                            <Table.Th>Fee Status</Table.Th>
                            <Table.Th>Actions</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </>
    );
};

export default AllMembers;