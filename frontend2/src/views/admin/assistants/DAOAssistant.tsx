'use client';
/*eslint-disable*/

import MessageBoxChat from 'components/chat/MessageBox';
import { ChatBody, OpenAIModel } from 'types/types';
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Flex,
    Icon,
    Image,
    Img,
    Input,
    SimpleGrid,
    Text,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { MdAutoAwesome, MdBolt, MdEdit, MdPerson } from 'react-icons/md';
import Bg from 'assets/img/chat/bg-image.png';
import {useAccount} from "wagmi";

export default function DAOAssistant() {
    // *** If you use .env.local variable for your API key, method which we recommend, use the apiKey variable commented below
    // const { apiKeyApp } = props;
    // Input States
    const [inputOnSubmit, setInputOnSubmit] = useState<string>("Show the portfolio's forecast.");
    const [userPrompt, setUserPrompt] = useState<string>('');
    // Response message
    const [botResponse, setBotResponse] = useState<string>("Sure thing, here's a forecast of the portfolio");
    // Loading state
    const [loading, setLoading] = useState<boolean>(false);

    const promptTags: any = {
        "Show me more stats about my account.": "account_stats",
        "How long has there been activity on my address?": "age_of_wallet",
        "How many failed transactions did I have this year?": "number_failed_transactions",
        "What can you observe about my last 10 DEX trades?": "dex_trades",
    };

    // API Key
    // const [apiKey, setApiKey] = useState<string>(apiKeyApp);
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');
    const inputColor = useColorModeValue('navy.700', 'white');
    const iconColor = useColorModeValue('brand.500', 'white');
    const bgIcon = useColorModeValue(
        'linear-gradient(180deg, #FBFBFF 0%, #CACAFF 100%)',
        'whiteAlpha.200',
    );
    const brandColor = useColorModeValue('brand.500', 'white');
    const buttonBg = useColorModeValue('white', 'whiteAlpha.100');
    const gray = useColorModeValue('gray.500', 'white');
    const buttonShadow = useColorModeValue(
        '14px 27px 45px rgba(112, 144, 176, 0.2)',
        'none',
    );
    const textColor = useColorModeValue('navy.700', 'white');
    const placeholderColor = useColorModeValue(
        { color: 'gray.500' },
        { color: 'whiteAlpha.600' },
    );

    const toast = useToast({position: "top-right"});

    const { address, connector, isConnected } = useAccount();
    // console.log({ address, connector, isConnected });

    const handleSubmit = async (prompt: string) => {
        toast({
            title: 'Pre-order PRO',
            description: 'Not allowed',
            status: 'error',
            duration: 3000,
            isClosable: true,
        });
    };

    const handleChange = (Event: any) => {

        toast({
            title: 'PRO only.',
            description: 'Not allowed',
            status: 'error',
            duration: 3000,
            isClosable: true,
        });
    };

    return (
        <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
            <Text mt='25px' mb='36px' color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                Limited Preview
            </Text>
            <Text mb='36px' color={textColor} fontSize='l' ms='24px' fontWeight='700'>
                Pre-order PRO to get discounted early access to more features
            </Text>
            <Flex
                w="100%"
                // pt={{ base: '70px', md: '0px' }}
                direction="column"
                position="relative"
            >
                <Flex
                    direction="column"
                    mx="auto"
                    w={{ base: '100%', md: '100%', xl: '100%' }}
                    minH={{ base: '75vh', '2xl': '85vh' }}
                    maxW="1000px"
                >

                    {/* Sample Prompt Picker */}
                    <Flex
                        direction={'column'}
                        w="100%"
                        mb={botResponse ? '20px' : 'auto'}
                    >
                        <SimpleGrid
                            // columns={3}
                            columns={{ base: 1, md: 2, lg: 2 }}
                            spacing={2}
                            // minChildWidth='120px'
                            // display={outputCode ? 'none' : 'flex'}
                            justifyItems={'space-between'}
                            mx="auto"
                            zIndex="2"
                            w="max-content"
                            mb="20px"
                            borderRadius="60px"
                        >
                            <Flex
                                cursor={'pointer'}
                                transition="0.3s"
                                justify={'center'}
                                align="center"
                                bg={buttonBg}
                                // w="174px"
                                // h="70px"
                                boxShadow={buttonShadow}
                                borderRadius="14px"
                                color={useColorModeValue("", "secondaryGray.500")}
                                // fontSize="14px"
                                fontWeight={'700'}
                                onClick={() => handleSubmit('')}
                            >
                                {"Show the portfolio's forecast."}
                            </Flex>
                            <Flex
                                cursor={'pointer'}
                                transition="0.3s"
                                justify={'center'}
                                align="center"
                                bg={buttonBg}
                                // w="174px"
                                // h="70px"
                                boxShadow={buttonShadow}
                                borderRadius="14px"
                                color={textColor}
                                // fontSize="14px"
                                fontWeight={'700'}
                                onClick={() => handleSubmit("")}
                            >
                                What can you observe about my last 10 DEX trades?
                            </Flex>
                        </SimpleGrid>
                    </Flex>

                    {/* Main Box */}
                    <Flex
                        direction="column"
                        w="100%"
                        mx="auto"
                        // display={botResponse ? 'flex' : 'none'}
                        mb={'auto'}
                    >
                        {/* user prompt */}
                        <Flex w="100%" align={'center'} mb="10px">
                            <Flex
                                borderRadius="full"
                                justify="center"
                                align="center"
                                bg={'transparent'}
                                border="1px solid"
                                borderColor={borderColor}
                                me="20px"
                                h="40px"
                                minH="40px"
                                minW="40px"
                            >
                                <Icon
                                    as={MdPerson}
                                    width="20px"
                                    height="20px"
                                    color={brandColor}
                                />
                            </Flex>
                            <Flex
                                p="22px"
                                border="1px solid"
                                borderColor={borderColor}
                                borderRadius="14px"
                                w="100%"
                                zIndex={'2'}
                            >
                                <Text
                                    color={textColor}
                                    fontWeight="600"
                                    fontSize={{ base: 'sm', md: 'md' }}
                                    lineHeight={{ base: '24px', md: '26px' }}
                                >
                                    {inputOnSubmit}
                                </Text>
                                {/*<Icon*/}
                                {/*    cursor="pointer"*/}
                                {/*    as={MdEdit}*/}
                                {/*    ms="auto"*/}
                                {/*    width="20px"*/}
                                {/*    height="20px"*/}
                                {/*    color={gray}*/}
                                {/*/>*/}
                            </Flex>
                        </Flex>

                        {/* bot response */}
                        <Flex w="100%">
                            <Flex
                                borderRadius="full"
                                justify="center"
                                align="center"
                                bg={'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)'}
                                me="20px"
                                h="40px"
                                minH="40px"
                                minW="40px"
                            >
                                <Icon
                                    as={MdAutoAwesome}
                                    width="20px"
                                    height="20px"
                                    color="white"
                                />
                            </Flex>
                            {/* text response */}
                            <MessageBoxChat output={botResponse} />

                            {/* code response */}
                            {/* graph response */}
                            {/* image response */}
                        </Flex>
                    </Flex>

                    {/* Chat Input */}
                    <Flex
                        ms={{ base: '0px', xl: '60px' }}
                        mt="20px"
                        justifySelf={'center'}
                    >
                        <Input
                            minH="54px"
                            h="100%"
                            border="1px solid"
                            borderColor={borderColor}
                            borderRadius="45px"
                            p="15px 20px"
                            me="10px"
                            fontSize="sm"
                            fontWeight="500"
                            _focus={{ borderColor: 'none' }}
                            color={inputColor}
                            _placeholder={placeholderColor}
                            placeholder="Enter prompt..."
                            value={userPrompt}
                            onChange={handleChange}
                            disabled
                        />
                        <Button
                            variant="darkBrand"
                            py="20px"
                            px="16px"
                            fontSize="sm"
                            borderRadius="45px"
                            ms="auto"
                            w={{ base: '160px', md: '210px' }}
                            h="54px"
                            _hover={{
                                boxShadow:
                                    '0px 21px 27px -10px rgba(96, 60, 255, 0.48) !important',
                                bg:
                                    'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%) !important',
                                _disabled: {
                                    bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
                                },
                            }}
                            onClick={() => handleSubmit('')}
                            isLoading={loading ? true : false}
                            disabled
                        >
                            Submit
                        </Button>
                    </Flex>

                    {/*<Flex*/}
                    {/*    justify="center"*/}
                    {/*    mt="20px"*/}
                    {/*    direction={{ base: 'column', md: 'row' }}*/}
                    {/*    alignItems="center"*/}
                    {/*>*/}
                    {/*    <Text fontSize="xs" textAlign="center" color={gray}>*/}
                    {/*        Assistants are currently experimental and may make mistakes.*/}
                    {/*    </Text>*/}
                    {/*</Flex>*/}
                </Flex>
            </Flex>
        </Box>
    );
}
