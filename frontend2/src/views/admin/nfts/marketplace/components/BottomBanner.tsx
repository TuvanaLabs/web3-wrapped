// Chakra imports
import { Button, Flex, Link, Text, Image } from '@chakra-ui/react';

// Assets
import banner from 'assets/img/nfts/NftBanner2.png';
import navImage from 'assets/img/crm/navbar.png';

import ReactGA from "react-ga4";
import { IoBagAdd } from "react-icons/io5";

export default function BottomBanner() {
    const gaMeasurementID = process.env.REACT_APP_GA_MEASUREMENT_ID;
    ReactGA.initialize(gaMeasurementID);

    const handlePreorder = () => {
        ReactGA.event({
            action: "Clicked 'Pre-order PRO'",
            category: "Purchase",
            label: "Button",
            nonInteraction: false,
            // transport: undefined,
            // value: 0
        });
        // console.log("sent to GA");
    }

    const handleJoinWaitlist = () => {
        ReactGA.event({
            action: "Clicked 'Join waitlist'",
            category: "Waitlist",
            label: "Button",
            nonInteraction: false,
            // transport: undefined,
            // value: 0
        });
        // console.log("sent to GA");
    }

    // Chakra Color Mode
    return (
        <Flex
            direction="row"
            backgroundImage={banner}
            backgroundRepeat="no-repeat"
            bgPosition="10%"
            bgSize="cover"
            // bgGradient="linear(to-b, brand.400, brand.600)"
            borderRadius="13px"
            justify="space-between"
            // height={70}
        >
            <Flex
                py={{ base: '10px', md: '36px' }}
                px={{ base: '30px', md: '64px' }}
                direction="column"
                w="100%"
            >
                {' '}
                <Text
                    fontSize={{ base: '24px', md: '34px' }}
                    color="white"
                    mb="7px"
                    //   maxW={{
                    //     base: '100%',
                    //     md: '64%',
                    //     lg: '46%',
                    //     xl: '70%',
                    //     '2xl': '50%',
                    //     '3xl': '42%',
                    //   }}
                    fontWeight="700"
                    // lineHeight={{ base: '32px', md: '42px' }}
                >
                    Want more features?
                </Text>
                {/*<Text*/}
                {/*    fontSize="md"*/}
                {/*    color="#E3DAFF"*/}
                {/*    //   maxW={{*/}
                {/*    //     base: '100%',*/}
                {/*    //     md: '64%',*/}
                {/*    //     lg: '40%',*/}
                {/*    //     xl: '56%',*/}
                {/*    //     '2xl': '46%',*/}
                {/*    //     '3xl': '34%',*/}
                {/*    //   }}*/}
                {/*    fontWeight="500"*/}
                {/*    mb="10px"*/}
                {/*    lineHeight="28px"*/}
                {/*>*/}
                {/*    Reserve your spot!*/}
                {/*</Text>*/}
                <Flex align="center">
                    <Button
                        bg="white"
                        color="black"
                        _hover={{ bg: 'whiteAlpha.900' }}
                        _active={{ bg: 'white' }}
                        _focus={{ bg: 'white' }}
                        fontWeight="500"
                        fontSize="14px"
                        py="20px"
                        px="27"
                        me="38px"
                        as={"a"}
                        target={"_blank"}
                        href={"https://tuvanalabs.com/preorder"}
                        onClick={handlePreorder}
                        boxShadow='0 8px 8px -4px lightblue'
                        leftIcon={<IoBagAdd/>}
                    >
                        Pre-order PRO
                    </Button>
                    <Link
                        target={"_blank"}
                        href={"https://tuvanalabs.com/waitlist"}
                        onClick={handleJoinWaitlist}
                    >
                        <Text
                            color="white"
                            fontSize="sm"
                            fontWeight="500"
                            // as={"a"}
                        >
                            {"Also subscribe for announcements >"}
                        </Text>
                    </Link>
                </Flex>
            </Flex>
            {/*<Image maxW="415px" src={navImage} />*/}
        </Flex>
    );
}
