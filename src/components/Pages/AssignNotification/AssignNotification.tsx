import { FC } from 'react';
import { Button, Card, Flex, Group, Switch, Text } from '@mantine/core';
import classes from './AssignNotification.module.css';
import { useDisclosure } from '@mantine/hooks';
import { IconMail } from '@tabler/icons-react';

const data = [
    { title: 'Messages', description: 'Direct messages you have received from other users' },
    { title: 'Review requests', description: 'Code review requests from your team members' },
    { title: 'Comments', description: 'Daily digest with comments on your posts' },
    {
        title: 'Recommendations',
        description: 'Digest with best community posts from previous week',
    },
];

interface AssignNotificationProps {

}

const AssignNotification: FC<AssignNotificationProps> = ({ }) => {
    const [loading, { toggle }] = useDisclosure();

    const items = data.map((item) => (
        <Group justify="space-between" className={classes.item} wrap="nowrap" gap="xl" key={item.title}>
            <div>
                <Text>{item.title}</Text>
                <Text size="xs" c="dimmed">
                    {item.description}
                </Text>
            </div>
            <Switch onLabel="ON" offLabel="OFF" className={classes.switch} size="lg" />
        </Group>
    ));
    return (
        <>
            <Text fw={500} size="xl" className={classes.title} c="dimmed" mb="md" mt="md">
                Assign Notification
            </Text>
            <Card withBorder radius="md" p="xl" className={classes.card}>
                <Text fz="lg" className={classes.title} fw={500}>
                    Configure notifications
                </Text>
                <Text fz="xs" c="dimmed" mt={3} mb="xl">
                    Choose what notifications you want to receive
                </Text>
                {items}
            </Card>
            <Flex justify="center" align="center">
                <Button loading={loading} mt="md" rightSection={<IconMail />} radius='xl'>Set Notification</Button>
            </Flex>
        </>
    );
};

export default AssignNotification;