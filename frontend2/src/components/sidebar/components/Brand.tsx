// Chakra imports
import { Flex, Image, Text, useColorModeValue } from '@chakra-ui/react';

// Custom components
import {HorizonLogo, Web3WrappedLogo} from 'components/icons/Icons';
import { HSeparator } from 'components/separator/Separator';

import logoNoBackground from "assets/svg/Color logo - no background.svg";
import logoWithBackground from "assets/svg/Color logo with background.svg";


export function SidebarBrand(props: { mini: boolean; hovered: boolean }) {
  const { mini, hovered } = props;
  //   Chakra color mode
  let logoColor = useColorModeValue('navy.700', 'white');

  return (
    <Flex alignItems="center" flexDirection="column">
      <Image
          src={logoNoBackground}
        // h="26px"
        w="175px"
        my="32px"
        // color={logoColor}
      />
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
