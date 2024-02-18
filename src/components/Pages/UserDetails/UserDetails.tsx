import { FC, useEffect, useState } from 'react';
import { Card, Avatar, Text } from '@mantine/core';
import classes from './UserDetails.module.css';
import { getDocService } from '../../../services/app/common/getDoc.service';
import { DB } from '../../../constants/db.constant';

const stats = [
    { value: '34K', label: 'Followers' },
    { value: '187', label: 'Follows' },
    { value: '1.6K', label: 'Posts' },
];

interface UserDetailsProps {

}

const UserDetails: FC<UserDetailsProps> = ({ }) => {
    const [userData, setUserData] = useState<any>()
    const id = localStorage.getItem("_uid")

    const fetchUserData = async () => {
        if (id) {
            const result = await getDocService(id, DB.USER)
            setUserData(result);
        }
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    return (
        <>
            <Text fw={500} size="xl" c="dimmed" mb="md" mt="md">
                Personal Details
            </Text>
            <Card withBorder padding="xl" radius="md" className={classes.card}>
                <Card.Section
                    h={150}
                    style={{
                        backgroundImage:
                            'url(https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?cs=srgb&dl=pexels-victor-freitas-841130.jpg&fm=jpg)',
                    }}
                />
                <Avatar
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
                    size={80}
                    radius={80}
                    mx="auto"
                    mt={-30}
                    className={classes.avatar}
                />
                <Text ta="center" fz="lg" fw={500} mt="sm">
                    {userData?.name}
                </Text>
                <Text ta="center" fz="sm" c="dimmed">
                    {userData?.email}
                </Text>
            </Card>
        </>
    );
};

export default UserDetails;