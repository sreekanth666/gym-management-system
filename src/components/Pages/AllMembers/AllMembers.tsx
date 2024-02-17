import { FC, useEffect, useState } from 'react';
import { Avatar, Table, Group, Text, ActionIcon, Menu, rem, Button, Flex } from '@mantine/core';
import {
    IconPencil,
    IconMessages,
    IconNote,
    IconReportAnalytics,
    IconTrash,
    IconDots,
    IconReload,
} from '@tabler/icons-react';
import AddMemberModal from '../../Shared/UserModal/AddMemberModal';
import { getAllDocsService } from '../../../services/app/common/getAllDoc.service';
import { DB } from '../../../constants/db.constant';

interface AllMembersProps {

}

const AllMembers: FC<AllMembersProps> = ({ }) => {
    const [userList, setUsersList] = useState<any>([])
    const fetchAllUsers = async () => {
        try {
            const users = await getAllDocsService(DB.USER)
            setUsersList(users)
            console.log(users);

        } catch (error) {
            console.log(error);

        }
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
            </Table.Td>
            <Table.Td>
                <Group gap={0} justify="flex-center">
                    <ActionIcon variant="subtle" color="gray">
                        <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
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
                                    <IconMessages style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                                }
                            >
                                Send message
                            </Menu.Item>
                            <Menu.Item
                                leftSection={<IconNote style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                            >
                                Add note
                            </Menu.Item>
                            <Menu.Item
                                leftSection={
                                    <IconReportAnalytics style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                                }
                            >
                                Analytics
                            </Menu.Item>
                            <Menu.Item
                                leftSection={<IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                                color="red"
                            >
                                Terminate contract
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
                <AddMemberModal />
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