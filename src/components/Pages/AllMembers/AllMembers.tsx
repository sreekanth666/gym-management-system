import { FC } from 'react';
import { Avatar, Table, Group, Text, ActionIcon, Menu, rem } from '@mantine/core';
import {
    IconPencil,
    IconMessages,
    IconNote,
    IconReportAnalytics,
    IconTrash,
    IconDots,
} from '@tabler/icons-react';

const data = [
    {
        avatar:
            'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
        name: 'Robert Wolfkisser',
        job: 'Engineer',
        email: 'rob_wolf@gmail.com',
        rate: 22,
    },
    {
        avatar:
            'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
        name: 'Jill Jailbreaker',
        job: 'Engineer',
        email: 'jj@breaker.com',
        rate: 45,
    },
    {
        avatar:
            'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
        name: 'Henry Silkeater',
        job: 'Designer',
        email: 'henry@silkeater.io',
        rate: 76,
    },
    {
        avatar:
            'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
        name: 'Bill Horsefighter',
        job: 'Designer',
        email: 'bhorsefighter@gmail.com',
        rate: 15,
    },
    {
        avatar:
            'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
        name: 'Jeremy Footviewer',
        job: 'Manager',
        email: 'jeremy@foot.dev',
        rate: 98,
    },
];

interface AllMembersProps {

}

const AllMembers: FC<AllMembersProps> = ({ }) => {
    const rows = data.map((item) => (
        <Table.Tr key={item.name}>
            <Table.Td>
                <Group gap="sm">
                    <Avatar size={40} src={item.avatar} radius={40} />
                    <div>
                        <Text fz="sm" fw={500}>
                            {item.name}
                        </Text>
                        <Text c="dimmed" fz="xs">
                            {item.job}
                        </Text>
                    </div>
                </Group>
            </Table.Td>
            <Table.Td>
                <Text fz="sm">{item.email}</Text>
                <Text fz="xs" c="dimmed">
                    Email
                </Text>
            </Table.Td>
            <Table.Td>
                <Text fz="sm">${item.rate.toFixed(1)} / hr</Text>
                <Text fz="xs" c="dimmed">
                    Rate
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
            <Table.ScrollContainer minWidth={800}>
                <Table verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Member</Table.Th>
                            <Table.Th>Assigned Diet Plan</Table.Th>
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