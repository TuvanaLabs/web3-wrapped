import React, {useEffect, useState} from 'react';
import { Flex, Box, Skeleton, Text, useColorModeValue } from '@chakra-ui/react';
import LineChart from 'components/charts/LineChart';
import Card from 'components/card/Card';

import {
    lineChartDataOverallRevenue,
    lineChartOptionsOverallRevenue,
} from 'variables/charts';

// // Data for monthly transactions sent and received
// const transactionsSentData = [
//     { "Date": "2023-01-01", "count": 3 },
//     { "Date": "2023-02-01", "count": 4 },
//     // ... (Add all months data here)
//     { "Date": "2023-12-01", "count": 36 }
// ];
//
// const transactionsReceivedData = [
//     { "Date": "2023-01-01", "count": 1 },
//     { "Date": "2023-03-01", "count": 1 },
//     // ... (Add all months data here)
//     { "Date": "2023-11-01", "count": 1 }
// ];

type Data = {
    EVM: {
        Transactions: Array<{
            Block: {
                Date: string;
            };
            count: string;
        }>;
    };
};

const formatChartData = (data: Data) => {
    if (!data.EVM) {
        return [];
    }

    // Create an object with all months initialized to 0
    const monthlyCounts: { [key: string]: number } = {
        'Jan': 0, 'Feb': 0, 'Mar': 0, 'Apr': 0, 'May': 0, 'Jun': 0,
        'Jul': 0, 'Aug': 0, 'Sep': 0, 'Oct': 0, 'Nov': 0, 'Dec': 0
    };

    // Populate the object with the counts from the data
    data.EVM.Transactions.forEach(item => {
        const month = new Date(`${item.Block.Date}T00:00`).toLocaleString('default', { month: 'short' });
        monthlyCounts[month] = Number(item.count);
    });

    // Convert the object into the format needed for ApexCharts
    return Object.entries(monthlyCounts).map(([month, count]) => ({
        x: month,
        y: count
    }));
};



export default function MonthlyActivity(props: any) {
    const {data} = props;
    const textColor = useColorModeValue('secondaryGray.900', 'white');

    const [chartData, setChartData] = useState<any>([]);
    const [chartOptions, setChartOptions] = useState<any>(lineChartOptionsOverallRevenue);


    useEffect(() => {
        if(data !== undefined &&
            data["monthly_transactions_sent"] !== undefined &&
            data["monthly_transactions_received"] !== undefined
        ) {
            const sentChartData = formatChartData(data["monthly_transactions_sent"]);
            const receivedChartData = formatChartData(data["monthly_transactions_received"]);

            // Chart Data and Options
            const lineChartDataOverallRevenue = [
                {
                    name: 'Transactions Sent',
                    data: sentChartData
                },
                {
                    name: 'Transactions Received',
                    data: receivedChartData
                }
            ];
            setChartData(lineChartDataOverallRevenue);

            let newOptions: any = {
                ...chartOptions,
                xaxis: {
                    ...chartOptions.xaxis,
                    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                },
            };

            setChartOptions(newOptions);
        }
    }, [data]);

    return (
        <Card
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            w="100%"
        >
            <Skeleton isLoaded={data !== undefined}>
                <Flex justify="space-between" px="20px" w="100%">
                    <Flex align="center" w="100%">
                        <Flex flexDirection="column" me="20px">
                            <Text
                                color={textColor}
                                fontSize="lg"
                                fontWeight="700"
                            >
                                Monthly Transactions Sent vs Received
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Box minH="260px" mt="auto" w="100%">
                    <LineChart
                        chartData={chartData}
                        chartOptions={chartOptions}
                    />
                </Box>
            </Skeleton>
        </Card>
    );
}
