import {Skeleton, Text, useColorModeValue} from "@chakra-ui/react";
import Card from 'components/card/Card';
import {useEffect, useState} from "react";

interface SimpleStatProps {
    type: "blocks_included_in" | "num_transactions" | "largest_fee_paid"
        | "tokens_minted" | "tokens_burnt" | "nfts_minted" | "nfts_burnt";
    data: any;
    title: string;
    focusTextUnit: string;
    backgroundImage?: string;
};

export default function SimpleStat(props: SimpleStatProps) {
    const {type, data, title, focusTextUnit, backgroundImage} = props;
    const titleColor = useColorModeValue('secondaryGray.900', 'white');
    const textColor = useColorModeValue('', 'secondaryGray.900');
    const cardBg = useColorModeValue('white', 'navy.800');

    const [cumulative, setCumulative] = useState("");

    const getCumulative = (d: any) => {
        switch(type) {
            case "blocks_included_in":
                setCumulative(d["EVM"]["Transactions"][0]["count"]);
                break;
            case "num_transactions":
                setCumulative(d["EVM"]["Transactions"][0]["count"]);
                break;
            case "largest_fee_paid":
                setCumulative(Number(d["EVM"]["Calls"][0]["Fee"]["SenderFee"]).toPrecision(2));
                break;
            case "tokens_minted":
                setCumulative(
                    d["EVM"]["Transfers"].reduce(
                        (acc: number, curr: any) => acc + Number(curr["count"]),
                        0
                    )
                );
                break;
            case "tokens_burnt":
                setCumulative(
                    d["EVM"]["Transfers"].reduce(
                        (acc: number, curr: any) => acc + Number(curr["count"]),
                        0
                    )
                );
                break;
            case "nfts_minted":
                setCumulative(
                    d["EVM"]["Transfers"].reduce(
                        (acc: number, curr: any) => acc + Number(curr["count"]),
                        0
                    )
                );
                break;
            case "nfts_burnt":
                setCumulative(
                    d["EVM"]["Transfers"].reduce(
                        (acc: number, curr: any) => acc + Number(curr["count"]),
                        0
                    )
                );
                break;
        }
    };

    useEffect(() => {
        if(data !== undefined) {
            getCumulative(data);
        }
    }, [data, type]);

    return (
        <Card
            backgroundImage={backgroundImage}
            backgroundRepeat="no-repeat"
            bgGradient={backgroundImage === null ? "linear(to-b, brand.400, brand.600)" : null}
            bgPosition="10%"
            bgSize="cover"
            alignItems="center"
            flexDirection="column"
            w="100%"
        >
            <Skeleton isLoaded={data !== undefined}>
                <Text fontWeight='500' fontSize='22px'>
                    {title}
                </Text>
                <Text
                    fontWeight='700'
                    fontSize="5xl"
                    color={textColor}
                    // fontSize={{ base: '48px', md: '54px', xl: '64px' }}
                    my='10px'
                    lineHeight='100%'
                    align="center"
                >
                    {cumulative} {focusTextUnit}
                </Text>
            </Skeleton>
        </Card>
    );
};
