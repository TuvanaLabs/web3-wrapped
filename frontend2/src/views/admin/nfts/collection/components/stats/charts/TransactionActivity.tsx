import { Box, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import HeatMapChart from 'components/charts/HeatMapChart';
import Card from 'components/card/Card';
import { parseISO, startOfYear, endOfYear, eachDayOfInterval, format } from 'date-fns';

import {barChartOptionsDailyTraffic} from "../../../../../../../variables/charts";


interface TransactionActivityProps {
    // type: string
}

export default function TransactionActivity(props: TransactionActivityProps) {
    const { ...rest } = props;
    //eslint-disable-next-line

    // let newOptions = {
    //     ...barChartOptionsDailyTraffic,
    //     fill: {
    //         ...barChartOptionsDailyTraffic.fill,
    //         gradient: {
    //             type: 'vertical',
    //             shadeIntensity: 1,
    //             opacityFrom: 0.7,
    //             opacityTo: 0.9,
    //             colorStops: [
    //                 [
    //                     {
    //                         offset: 0,
    //                         color: 'var(--chakra-colors-brand-500)',
    //                         opacity: 1,
    //                     },
    //                     {
    //                         offset: 100,
    //                         color: 'white',
    //                         opacity: 0.28,
    //                     },
    //                 ],
    //             ],
    //         },
    //     },
    // };

    // Chakra Color Mode
    const titleColor = useColorModeValue('secondaryGray.900', 'white');
    const textColor = useColorModeValue('', 'secondaryGray.600');

    type TransactionData = {
        EVM: {
            Transactions: Array<{
                Block: {
                    Date: string;
                };
                Transaction: {
                    From: string;
                    Hash: string;
                };
            }>;
        };
    };

    const processDataForHeatmap = (data: TransactionData) => {
        // Create an object with all dates of the year set to 0
        const yearStart = startOfYear(new Date());
        const yearEnd = endOfYear(yearStart);
        const allDates = eachDayOfInterval({ start: yearStart, end: yearEnd });
        let dayCounts: Record<string, number> = {};

        allDates.forEach((date: Date) => {
            const formattedDate = format(date, 'yyyy-MM-dd');
            dayCounts[formattedDate] = 0; // Initialize all counts to 0
        });

        // Process data to count transactions per day
        data.EVM.Transactions
            .sort((a, b) => parseISO(a.Block.Date).getTime() - parseISO(b.Block.Date).getTime())
            .forEach(({ Block }) => {
                const formattedDate = format(new Date(Block.Date), 'yyyy-MM-dd');
                if (dayCounts[formattedDate] !== undefined) {
                    dayCounts[formattedDate] += 1; // Increment the count for the day
                }
            }
        );

        // Create the series data for the heatmap
        let series = Object.entries(dayCounts).reduce((seriesAcc, [date, count]) => {
            const [year, month, day] = date.split('-');
            const monthIndex = parseInt(month, 10) - 1;
            const dayIndex = parseInt(day, 10) - 1;

            if (!seriesAcc[monthIndex]) {
                seriesAcc[monthIndex] = { name: format(new Date(Number(year), monthIndex), 'MMMM'), data: [] };
            }

            seriesAcc[monthIndex].data[dayIndex] = { x: day, y: count };
            return seriesAcc;
        }, [] as { name: string; data: { x: string; y: number; }[] }[]);

        // Make sure each month has 31 days
        series.forEach(monthSeries => {
            for (let i = monthSeries.data.length; i < 31; i++) {
                monthSeries.data.push({ x: `${i + 1}`, y: 0 });
            }
        });

        // Sort the series by month
        series.sort((a, b) => a.name.localeCompare(b.name));

        // Generate categories (1 to 31)
        let categories = Array.from({ length: 31 }, (_, i) => `${i + 1}`);

        return { series, categories };
    };

// Example usage with the provided data
    const originalData: TransactionData = {
        "EVM": {
            "Transactions": [
                {
                    "Block": {
                        "Date": "2023-01-21"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0xd92280f686c511a52bb6511a9b0f9e607e67049e0bc34020998b35c56c9ccefa"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-01-24"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0x85a9f574040a50bbbb8a0c578a59a0a1a802890577dc6432a1c431478d518cc3"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-01-24"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0x5ff4ae3d5770517280190ff694e09cee1653a79797ce465a986d887f038da2ce"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-02-04"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0xd57bed2d0cc40029c6ae4abb8393c939b3b357d58eefbfb25aeb23c6628d7a20"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-02-05"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0x6b649207b52684b14e71d8c601388bb78c11c50e37e510d3096549b9f870066b"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-02-14"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0x4ccbaec63fb5457867bea2f71a75eaf7957df612cc1c0d6f5aa4b72d1eaca48f"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-02-20"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0x67bd8d22ef4940f29695adcc6337b431724f778fbd99182d955cad31e8d9d4ef"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-02-21"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0xea85a3e6c5e377c15a1c4bcc0e9868f723a6b590e6735baf45b492c04dbde862"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-03-01"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0x9cd17764b47ef7bf58a6eb54e4cdde7e04224ecc53cc3706e0ba32db0df7ec27"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-04-04"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0x08680d4d5256afd586e171c01889c92244c00450f28cc1baa740523f13c43b0c"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-05-02"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0xfb6ee7cdc4db8c6d8270d87b38886646f45750d889d534bb174ef08e202f98f0"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-05-05"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0x3224aa55d59bab704f60b24b214864b6dba39dd96be8b5c18627cc019053cc7b"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-05-07"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0xaa1c4bfc29dea053b7a23e897e877abd5a5465b0e9192fbf93bd63fcaff2afd2"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-05-07"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0x6d6aa964cd1344ed0f2c4f5245f27398f629d46829e7fa8dafbe8c7acd0bc1d8"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-05-08"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0x10c794429f6223a130fd318b001cb043e406984982684ef966093d5cc0dba7e4"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-05-18"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0xd7055fb9d82cba395b5afcc8d1a6f88425363501f48c80d398daaf8396f48709"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-05-22"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0x64725ef0ef168ce08630dabf9946a4777828d984e21c6d98ca01fc495eab464b"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-05-27"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0x7dd98db52cef1e9d57e9d06444ab121bb3361195e82f6237b5f0fd3a35acb8a4"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-05-27"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0x475efb1d248957c725e9e6efa6f27cd4528f4c11ba013392f5b082e067153ad8"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-05-28"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0x1cf1763bf88fa950f508570acb8b45165045bd332b6e5ad6755fe84dbcd98f71"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-06-10"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0x82694d0e78295d5221e27489472205c57af4d701868d18dd8c277bc99c1bc742"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-06-18"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0xe8b2d64f68616df5f3dcf944ee7ce844f1fb276b8049156b638d48d337beaab2"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-06-18"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0x265b1bb6361ba19216557ced18df0da63083617b8e594812870a026cf98a94e2"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-07-07"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0x21b09417e5ae004a6515451a801dced59f8dbe403a4882719e97cc997c62be4b"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-07-08"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0xcfb7ab3fc1a0f3702080e7ebb94369f48d69a37818a6006b6ba2e9d194e6dacf"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-07-08"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0x499605b66dea750427c751585fdb30c982b6e1e9aec052b933583843d018aa28"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-07-08"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0xfe67915dcc163572a46e2cd7738061605a8bbaa589b2148cbcba94585be4548e"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-07-08"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0x13b16d66763cf0f23e3866e7ccf417030197bca424a5c2c7d85710481ecb6573"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-07-10"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0xb6ac7b57ac9c43ba5237a781dbb0a8fe62fedbb241b472acfe2266b111ddcaf3"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-07-26"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0xcd199b3bd94cb7006d6d092a4f8b1c7fed66827149b881d59a03d34f2f132916"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-08-17"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0x30bbb773fed06f86478521a456db8f1357d93936f16ac6e8d26ad5fc759f4511"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-11-18"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0xabae6494c6396fd9d79e702a4054e6dc0be7201aee5d58419e1c1b94cfac2562"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-11-24"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0x945c2c1da98f25556b78cbb175b15228d1ff0c3ee38f3507a863eb3ac3d3eb57"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-11-24"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0x2dcb5ccb40e8f506bb5c0505aaca8214fc7de04a6492b6b5ef1666dd3e96dde6"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-11-30"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0x196f0111993332872100b042108d36a617a73d45e3e53ecc7d6676f39644c332"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-11-30"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0xdb94c0c70b730419c8828b9cd42620141b3120076669ee405267281c820a7cd8"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-12-01"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0x40eec26fc1e5e808635496ed40c921af39cf8bed37a009d110a6abfcf306fea4"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-12-04"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0xd87d28aa5722ee43d4e67062156d00eabd80bed5cf23824ca37699879ced8fb8"
                    }
                },
                {
                    "Block": {
                        "Date": "2023-12-08"
                    },
                    "Transaction": {
                        "From": "0x910d7fdf70f12e26c659d74a058b1f0bfa282ed9",
                        "Hash": "0x19c4212ef92e4004da887396346936492fc5595c8aa4cf567784f2aa1d542898"
                    }
                }
            ]
        }
    };

    const heatmapData = processDataForHeatmap(originalData);
    let newOptions = {
        chart: {
            type: 'heatmap',
            toolbar: {
                show: false // Disables the toolbar
            },
        },
        colors: ["#7551FF"],
        plotOptions: {
            heatmap: {
                shadeIntensity: 0.5,
                radius: 0,
                useFillColorAsStroke: true,
                distributed: true,
                // colorScale: {
                //     ranges: [
                //         {
                //             from: 0,
                //             to: 5,
                //             name: 'low',
                //             color: '#00A100'
                //         },
                //         {
                //             from: 6,
                //             to: 10,
                //             name: 'medium',
                //             color: '#128FD9'
                //         },
                //         {
                //             from: 11,
                //             to: 15,
                //             name: 'high',
                //             color: '#FFB200'
                //         },
                //         {
                //             from: 16,
                //             to: 20,
                //             name: 'extreme',
                //             color: '#FF0000'
                //         }
                //     ]
                // }
            }
        },
        dataLabels: {
            enabled: true,
            style: {
                colors: ['#fff']
            }
        },
        xaxis: {
            type: 'category',
            categories: heatmapData.categories, // ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            labels: {
                show: true,
                rotate: -45,
                rotateAlways: true,
            },
            position: 'top', // Moves the x-axis labels to the top
        },
        yaxis: {
            show: true // Hides the y-axis labels
        },
        grid: {
            padding: {
                top: 10,
            },
            weight: "10",
        },
        // tooltip: {
        //     // Customizes the tooltip
        //     y: {
        //         formatter: (value: any) => `${value} transactions`,
        //     },
        // },
    };


    // console.log(chartData);
    // newOptions.title = "Txn Activity Heatmap";

    return (
        <Card alignItems="center" flexDirection="column" w="100%" {...rest} bgGradient="linear(to-b, brand.400, brand.600)">
            <Text
                me="auto"
                color={titleColor}
                fontSize="xl"
                fontWeight="700"
                lineHeight="100%"
            >
                Transaction Activity
            </Text>
            <Text
                mt="1.5"
                me="auto"
                color={textColor}
                fontSize="md"
                // fontWeight="700"
                lineHeight="100%"
            >
                These is what your activity looked like sending transactions over the year.
            </Text>
            <Box h="240px" mt="auto">
                <HeatMapChart
                    chartData={heatmapData.series}
                    chartOptions={newOptions}
                />
            </Box>
        </Card>
    );
}
