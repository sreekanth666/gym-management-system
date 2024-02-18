import { FC, useEffect, useState } from 'react';
import { Progress, Box, Text, Group, Paper, SimpleGrid } from '@mantine/core';
import { IconDeviceAnalytics } from '@tabler/icons-react';
import classes from './Report.module.css';
import { getAllDocsService } from '../../../services/app/common/getAllDoc.service';
import { DB } from '../../../constants/db.constant';



interface ReportProps {

}

const Report: FC<ReportProps> = ({ }) => {
    const [userCount, setUserCount] = useState(0)
    const [esTotalIncome, setEsTotalIncome] = useState(0)
    const [totalIncome, setTotalIncome] = useState(0)
    const [totalDue, setTotalDue] = useState(0)
    
    const data = [
        { label: 'Total Income', count: ((totalIncome/100)*esTotalIncome).toFixed(1), part: totalIncome.toFixed(1), color: '#47d6ab' },
        { label: 'Total Due', count: ((totalDue/100)*esTotalIncome).toFixed(1), part: totalDue.toFixed(1), color: '#03141a' },
    ];
    const segments = data.map((segment) => (
        <Progress.Section value={Number(segment.part)} color={segment.color} key={segment.color}>
            {Number(segment.part) > 10 && <Progress.Label>{segment.part}%</Progress.Label>}
        </Progress.Section>
    ));

    const descriptions = data.map((stat) => (
        <Box key={stat.label} style={{ borderBottomColor: stat.color }} className={classes.stat}>
            <Text tt="uppercase" fz="xs" c="dimmed" fw={700}>
                {stat.label}
            </Text>

            <Group gap={0}>
                <Text fw={700}>{stat.count}</Text>
                <Text ml='xl' c={stat.color} fw={700} size="sm" className={classes.statCount}>
                    {stat.part}%
                </Text>
            </Group>
        </Box>
    ));
    

    const fetchReportData = async() => {
        const allUsers: any = await getAllDocsService(DB.USER)
        setUserCount(allUsers.filter((item: { role: string; }) => item.role !== "admin" && item.role !== "user").length);

        const esIncomeFilter = allUsers.filter((item: { role: string; }) => item.role !== "admin" && item.role !== "user")
        const esIncome = esIncomeFilter.map((item: { fees: any; }) => item.fees)
        const esIncomeTotal = esIncome.reduce((add: any, item: any) => add + item, 0)
        setEsTotalIncome(esIncomeTotal)
        
        const dueIncomeFilter = allUsers.filter((item: { role: string; }) => item.role !== "admin" && item.role !== "user")
        const dueIncome = dueIncomeFilter.filter((item: { lastBillPayment: string; }) => item.lastBillPayment === 'Due' || !item.lastBillPayment)
        const dueIncomeArray = dueIncome.map((item: { fees: any; }) => item.fees)        
        const dueIncomeTotal = dueIncomeArray.reduce((add: any, item: any) => add + item, 0)        
        setTotalDue(dueIncomeTotal !== 0 ? (dueIncomeTotal/esIncomeTotal)*100 : 0);

        const incomeFilter = allUsers.filter((item: { role: string; }) => item.role !== "admin" && item.role !== "user")
        const income = incomeFilter.filter((item: { lastBillPayment: string; }) => item.lastBillPayment && item.lastBillPayment !== 'Due')        
        const incomeArray = income.map((item: { fees: any; }) => item.fees)
        const incomeTotal = incomeArray.reduce((add: any, item: any) => add + item, 0)        
        setTotalIncome(incomeTotal !== 0 ? ((incomeTotal/esIncomeTotal)*100) : 0);
    }

    useEffect(() => {
        fetchReportData()
    }, [])
    return (
        <>
            <Text fw={500} size="xl" c="dimmed" mb="md" mt="md">
                Report
            </Text>
            <Paper withBorder p="md" radius="md">
                <Group justify="space-between">
                    <Group align="flex-end" gap="xs">
                        <Text fz="xl" fw={700}>
                            {userCount}
                        </Text>
                    </Group>
                    <IconDeviceAnalytics size="1.4rem" className={classes.icon} stroke={1.5} />
                </Group>

                <Text c="dimmed" fz="sm">
                    Total members
                </Text>

                <Progress.Root size={40} classNames={{ label: classes.progressLabel }} mt={40}>
                    {segments}
                </Progress.Root>
                <SimpleGrid cols={{ base: 1, xs: 3 }} mt="xl">
                    {descriptions}
                </SimpleGrid>
            </Paper>
        </>
    );
};

export default Report;