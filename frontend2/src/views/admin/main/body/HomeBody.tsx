// Chakra imports
import {
    Flex,
    Icon,
    IconButton,
    Input,
    Text,
    useToast,
    useColorModeValue, UnorderedList, ListItem,
} from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';

import {IoLogoFacebook, IoLogoLinkedin, IoLogoTwitter} from 'react-icons/io';
// Assets
import { IoLogoDiscord } from 'react-icons/io5';
import { FaXTwitter } from "react-icons/fa6";


export default function HomeBody(props: {
    referralCode: string;
    fbLink: string;
    twtLink: string;
    [x: string]: any;
}) {
    const { referralCode, fbLink, twtLink, ...rest } = props;
    const toast = useToast();

    // Chakra Color Mode
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const iconColor = useColorModeValue('brand.500', 'white');
    const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

    return (
        <Card px="26px" py="30px" w="100%" my={"5"} {...rest}>
            {/*<Text color={textColor} fontSize="2xl" fontWeight="700" mb="10px">*/}
            {/*    About*/}
            {/*</Text>*/}
            {/*<Text color="secondaryGray.600" fontSize="md" fontWeight="400" mb="30px">*/}
            {/*    todo*/}
            {/*</Text>*/}
            {/*<UnorderedList>*/}
            {/*    <ListItem color="secondaryGray.600" fontSize="md" fontWeight="400">*/}
            {/*        Lorem ipsum dolor sit amet*/}
            {/*    </ListItem>*/}
            {/*    <ListItem color="secondaryGray.600" fontSize="md" fontWeight="400">*/}
            {/*        Consectetur adipiscing elit*/}
            {/*    </ListItem>*/}
            {/*    <ListItem color="secondaryGray.600" fontSize="md" fontWeight="400">*/}
            {/*        Integer molestie lorem at massa*/}
            {/*    </ListItem>*/}
            {/*    <ListItem color="secondaryGray.600" fontSize="md" fontWeight="400" mb="30px">*/}
            {/*        Facilisis in pretium nisl aliquet*/}
            {/*    </ListItem>*/}
            {/*</UnorderedList>*/}

            <Text color={textColor} fontSize="2xl" fontWeight="700" mb="10px">
                Let's connect!
            </Text>
            <Text color="secondaryGray.600" fontSize="md" fontWeight="400" mb="30px">
                Remember to use <b>#web3wrapped</b> when you post.
            </Text>
            <Flex>
                <IconButton
                    aria-label="twitter for web3wrapped"
                    bg={boxBg}
                    borderRadius="50%"
                    mr={"1"}
                    as={"a"}
                    href={"https://twitter.com/web3wrapped"}
                    target={"_blank"}
                >
                    <Icon w="18px" h="18px" as={FaXTwitter} color={iconColor} />
                </IconButton>
                <IconButton
                    aria-label="discord"
                    bg={boxBg}
                    borderRadius="50%"
                    mr={"1"}
                    as={"a"}
                    href={"https://discord.gg/UyR6j3zBsX"}
                    target={"_blank"}
                >
                    <Icon w="18px" h="18px" as={IoLogoDiscord} color={iconColor} />
                </IconButton>
                <IconButton
                    aria-label="twitter for tuvana labs"
                    bg={boxBg}
                    borderRadius="50%"
                    mr={"1"}
                    as={"a"}
                    href={"https://twitter.com/tuvanalabs"}
                    target={"_blank"}
                >
                    <Icon w="18px" h="18px" as={FaXTwitter} color={iconColor} />
                </IconButton>
                <IconButton
                    aria-label="linkedin"
                    me="6px"
                    bg={boxBg}
                    borderRadius="50%"
                    mr={"1"}
                    as={"a"}
                    href={"https://linkedin.com/company/tuvana-labs"}
                    target={"_blank"}
                >
                    <Icon w="22px" h="22px" as={IoLogoLinkedin} color={iconColor} />
                </IconButton>
            </Flex>
        </Card>
    );
}
