import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Flex,
    Icon,
    Skeleton,
    SkeletonCircle,
    SkeletonText,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import LineChart from 'components/charts/LineChart';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { MdBarChart, MdOutlineCalendarToday } from 'react-icons/md';
import { RiArrowUpSFill } from 'react-icons/ri';
import LineAreaChart from "../../../../../../../components/charts/LineAreaChart";

const generateRandomData = (baseVal: number, yrange: { min: number; max: number }) => {
    const x = new Date().getTime();
    const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1) + yrange.min);
    return { x, y };
};

const Sample = () => {
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const textColorSecondary = useColorModeValue('secondaryGray.600', 'white');
    const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
    const iconColor = useColorModeValue('brand.500', 'white');
    const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

    const [loaded, setLoaded] = useState(false);
    const [chartData, setChartData] = useState<any[]>([
        {
            name: 'Spent',
            data: [{ x: new Date().getTime(), y: 0 }] // Initialize data with a starting point of 0
        }
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newSeriesData = generateRandomData(new Date().getTime(), { min: 30, max: 70 });
            setChartData([{
                name: 'Spent',
                data: [...chartData[0].data, newSeriesData].slice(-10)
            }]);
            setLoaded(true);
        }, 5000); // Slowed down to 4 seconds

        return () => clearInterval(interval);
    }, [chartData]);

    const lineChartOptions = {
        fill: {
            // type: "gradient",
            // gradient: {
            //     shadeIntensity: 1,
            //     opacityFrom: 0.7,
            //     opacityTo: 0.9,
            //     stops: [0, 90, 100]
            // }
        },
        chart: {
            title: {
                text: "Sample",
            },
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 5000 // Slowed down animation speed
                }
            },
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            },
        },
        tooltip: {
            enabled: false,
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            show: false,
        },
        colors: ['#39B8FF'],
        xaxis: {
            labels: {
                show: false,
            },
            type: 'datetime',
        },
        yaxis: {
            labels: {
                show: false,
            },
            type: 'price',
        },
        stroke: {
            curve: 'smooth'
        },
    };

    return (
        <Card justifyContent="center" alignItems="center" flexDirection="column" w="100%" mb="0px">
            {/* Chart */}
            <Flex
                w="100%"
                flexDirection={{ base: 'column', lg: 'column' }}
                bgGradient="linear(to-b, brand.400, brand.600)"
            >
                <Skeleton isLoaded={loaded}>
                    <Box minH="260px" minW="75%" mt="auto">
                        <LineAreaChart
                            chartData={chartData}
                            chartOptions={lineChartOptions}
                        />
                    </Box>
                </Skeleton>
            </Flex>
        </Card>
    );
};

export default Sample;
