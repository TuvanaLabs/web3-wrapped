// Chakra imports
import { Button, Flex, Link, Text, Image } from '@chakra-ui/react';
import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';


// Assets
import banner from 'assets/img/nfts/NftBanner1.png';

import ReactGA from "react-ga4";

export default function TopBanner() {
    const gaMeasurementID = process.env.REACT_APP_GA_MEASUREMENT_ID;
    ReactGA.initialize(gaMeasurementID);

    const navigate = useNavigate();
    const handleClick = () => {
        ReactGA.event({
            action: "Clicked 'Get Started'",
            category: "Navigation",
            label: "Button",
            nonInteraction: false,
            // transport: undefined,
            // value: 0
        });
        navigate('/wrapped');
    }

    // Chakra Color Mode
    return (
        <Flex
            direction="row"
            bgGradient="linear(to-b, brand.400, brand.600)"
            borderRadius="13px"
            justify="space-between"
        >
            <Flex
                py={{ base: '30px', md: '56px' }}
                px={{ base: '30px', md: '64px' }}
                direction="column"
                w="100%"
            >
                {' '}
                <Text
                    fontSize={{ base: '24px', md: '34px' }}
                    color="white"
                    mb="14px"
                    //   maxW={{
                    //     base: '100%',
                    //     md: '64%',
                    //     lg: '46%',
                    //     xl: '70%',
                    //     '2xl': '50%',
                    //     '3xl': '42%',
                    //   }}
                    fontWeight="700"
                    lineHeight={{ base: '32px', md: '42px' }}
                >
                    What did your year in crypto look like?
                </Text>
                <Text
                    fontSize="md"
                    color="#E3DAFF"
                    //   maxW={{
                    //     base: '100%',
                    //     md: '64%',
                    //     lg: '40%',
                    //     xl: '56%',
                    //     '2xl': '46%',
                    //     '3xl': '34%',
                    //   }}
                    fontWeight="500"
                    mb="40px"
                    lineHeight="28px"
                >
                    Dive deep into your activity across web3 and chat with your wallet!
                </Text>
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
                        onClick={handleClick}
                    >
                        Get Started
                    </Button>
                    {/*<Link>*/}
                    {/*    <Text*/}
                    {/*        color="white"*/}
                    {/*        fontSize="sm"*/}
                    {/*        fontWeight="500"*/}
                    {/*        as={"a"}*/}
                    {/*        target={"_blank"}*/}
                    {/*        href={"https://tuvanalabs.com/waitlist"}*/}
                    {/*    >*/}
                    {/*        {"Subscribe for announcements >"}*/}
                    {/*    </Text>*/}
                    {/*</Link>*/}
                </Flex>
            </Flex>
            <Image maxW="415px" src={banner} />
        </Flex>
    );
}
