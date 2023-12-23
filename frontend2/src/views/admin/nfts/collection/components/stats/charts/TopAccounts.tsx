// Chakra imports
import {Box, Flex, Icon, Skeleton, Text, useColorModeValue} from '@chakra-ui/react';
import BarChart from 'components/charts/BarChart';

// Custom components
import Card from 'components/card/Card';
import {
    barChartDataDailyTraffic,
    barChartOptionsDailyTraffic,
} from 'variables/charts';

// Assets
import { RiArrowUpSFill } from 'react-icons/ri';
import {useEffect, useState} from "react";

interface TopAccountProps {
    data: any;
    type: string;
}

type TopAccountsData = {
    ethereum: {
        coinpath: Array<{
            receiver?: {
                address: string;
                receiversCount: number;
            };
            sender?: {
                address: string;
                sendersCount: number;
            };
        }>;
    };
};

const defaultOptions = {
    ...barChartOptionsDailyTraffic,
    fill: {
        ...barChartOptionsDailyTraffic.fill,
        gradient: {
            type: 'vertical',
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            colorStops: [
                [
                    {
                        offset: 0,
                        color: 'var(--chakra-colors-brand-500)',
                        opacity: 1,
                    },
                    {
                        offset: 100,
                        color: 'white',
                        opacity: 0.28,
                    },
                ],
            ],
        },
    },
};

export default function TopAccounts(props: TopAccountProps) {
    const titleColor = useColorModeValue('secondaryGray.900', 'white');
    const textColor = useColorModeValue('', 'secondaryGray.600');

    const { data, type, ...rest } = props;

    const [chartData, setChartData] = useState<any>({
        categories: [],
        series: []
    });
    const [chartOptions, setChartOptions] = useState<any>(defaultOptions);

    const processData = (data: TopAccountsData) => {
        // console.log(data.ethereum);

        const addresses = type === "sent" ?
            data.ethereum.coinpath.map(item => item.receiver.address)
            : data.ethereum.coinpath.map(item => item.sender.address);

        const accountsCount = type === "sent" ?
            data.ethereum.coinpath.map(item => item.receiver.receiversCount)
            : data.ethereum.coinpath.map(item => item.sender.sendersCount);

        return {
            categories: addresses,
            series: [{
                name: type === "sent" ? 'Transactions Sent': 'Transactions Received',
                data: accountsCount,
            }],
        };
    };

    // const originalData = data; //type === "sent" ? topAccountsSentData : topAccountsReceived
    const truncateAddress = (address: string) => {
        return address.substring(0, 4) + ".." + address.substring(40);
    };

    useEffect(() => {
        if(data !== undefined) {
            const processed = processData(data);
            setChartData(processed);
            // console.log(chartData);
            let newOptions: any = {
                ...chartOptions,
                xaxis: {
                    ...chartOptions.xaxis,
                    categories: processed.categories,
                    // labels: {
                    //   formatter: truncateAddress
                    // },
                },
                yaxis: {
                    ...chartOptions.yaxis,
                    title: type === "sent" ? "Transactions Sent" : "Transactions Received",
                }
            };
            // console.log(newOptions.xaxis);
            setChartOptions(newOptions);
        }
    }, [data]);

    return (
        <Card alignItems="center" flexDirection="column" w="100%" {...rest}>
            <Skeleton isLoaded={data !== undefined}>
                <Text
                    me="auto"
                    color={titleColor}
                    fontSize="xl"
                    fontWeight="700"
                    lineHeight="100%"
                >
                    {type === "sent" ?
                        "Your Top Recipients"
                        :
                        "Your Top Senders"
                    }
                </Text>
                <Text
                    mt="1.5"
                    me="auto"
                    color={textColor}
                    fontSize="md"
                    // fontWeight="700"
                    lineHeight="100%"
                >
                    {type === "sent" ?
                        "These were the accounts you sent the most transactions to."
                    :
                        "These were the accounts you received the most transactions from."
                    }
                </Text>
                <Box h="240px" mt="auto">
                    <BarChart
                        // chartData={barChartDataDailyTraffic}
                        chartData={chartData.series}
                        chartOptions={chartOptions}
                    />
                </Box>
            </Skeleton>
        </Card>
    );
}
