import { Container, Fieldset, Grid, SimpleGrid, Text } from '@mantine/core';
import { FC, useEffect, useState } from 'react';
import { getDocService } from '../../../services/app/common/getDoc.service';
import { DB } from '../../../constants/db.constant';

interface ViewBillProps {

}

const ViewBill: FC<ViewBillProps> = ({ }) => {
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
                View Bill
            </Text>
            <Container my="md">
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                    <Fieldset legend="Monthly Bill">
                        <Text style={{ fontSize: '4rem', fontWeight: 'bold' }} >
                            {userData?.fees ? userData.fees : 'No Fees Record'}
                        </Text>
                        <Text c={'dimmed'} >
                            in Indian Rupees
                        </Text>
                    </Fieldset>
                    <Grid gutter="md">
                        <Grid.Col>
                            <Fieldset legend="Last Bill Payment">
                                {
                                    userData?.lastBillPayment ?
                                        (
                                            userData?.lastBillPayment ?
                                                `${userData?.lastBillPayment}` : 'No Last Payment Record'
                                        ) : "No Last Payment Record"
                                }
                            </Fieldset>
                        </Grid.Col>
                        <Grid.Col>
                            <Fieldset legend="Personal information">
                                <Text>Name: {userData?.username}</Text>
                                <Text>Email: {userData?.email}</Text>
                            </Fieldset>
                        </Grid.Col>
                    </Grid>
                </SimpleGrid>
            </Container>
        </>
    );
};

export default ViewBill;