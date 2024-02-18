import { FC, useEffect, useState } from 'react';
import { Card, Text, Badge, Group } from '@mantine/core';
import { getDocService } from '../../../services/app/common/getDoc.service';
import { DB } from '../../../constants/db.constant';

interface NotificationProps {

}

const Notification: FC<NotificationProps> = ({ }) => {
    const [notification, setNotification] = useState<any>()

    const getUserData = async () => {
        const id = localStorage.getItem("_uid")
        if (id) {
            const result: any = await getDocService(id, DB.USER)
            if (result.billReminder) {
                setNotification(result.billReminder)
            } else {
                setNotification(null)
            }

        }
    }

    useEffect(() => {
        getUserData()
    }, [])
    return (
        <>
            <Text fw={500} size="xl" c="dimmed" mb="md" mt="md">
                Notifications
            </Text>
            <Card withBorder padding="lg" radius="md">
                {
                    notification?.reminder ?
                    <>
                        <Group justify="space-between">
                            <Badge>{notification?.date}</Badge>
                        </Group>
                        <Text fz="lg" fw={500} mt="md">
                            {notification?.reminder}
                        </Text>
                    </> : "No notifications yet."
                }
            </Card>
        </>
    );
};

export default Notification;