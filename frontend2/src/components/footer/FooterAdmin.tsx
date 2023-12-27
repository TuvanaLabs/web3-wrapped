/*eslint-disable*/

import {
  Flex,
  Link,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import ReactGA from "react-ga4";

export default function Footer() {
  const textColor = useColorModeValue('gray.400', 'white');

    const gaMeasurementID = process.env.REACT_APP_GA_MEASUREMENT_ID;
    ReactGA.initialize(gaMeasurementID);

    const handleClickFooterLink = (social: string) => {
        ReactGA.event({
            action: `Clicked ${social} Link`,
            category: "Brand",
            label: "Footer",
            nonInteraction: false,
            // transport: undefined,
            // value: 0
        });
        // console.log("sent to GA");
    }

  return (
    <Flex
      zIndex="3"
      flexDirection={{
        base: 'column',
        xl: 'row',
      }}
      alignItems={{
        base: 'center',
        xl: 'start',
      }}
      justifyContent="space-between"
      px={{ base: '30px', md: '50px' }}
      pb="30px"
    >
      <Text
        color={textColor}
        textAlign={{
          base: 'center',
          xl: 'start',
        }}
        mb={{ base: '20px', xl: '0px' }}
      >
        {' '}
        &copy; {new Date().getFullYear()}
        <Text as="span" fontWeight="500" ms="4px">
          Tuvana Labs Inc. All Rights Reserved.
        </Text>
      </Text>

      <List display="flex">
        <ListItem
            me={{
              base: '20px',
              md: '44px',
            }}
        >
          <Link
              fontWeight="500"
              color={textColor}
              target={"_blank"}
              href="https://www.tuvanalabs.com/"
              onClick={() => handleClickFooterLink("Tuvana Labs Website")}
          >
            About Tuvana Labs
          </Link>
        </ListItem>

          <ListItem>
              <Link
                  fontWeight="500"
                  color={textColor}
                  target={"_blank"}
                  href="https://www.twitter.com/web3wrapped"
                  onClick={() => handleClickFooterLink("Web3Wrapped Twitter")}
              >
                  Twitter
              </Link>
          </ListItem>

        {/*<ListItem*/}
        {/*  me={{*/}
        {/*    base: '20px',*/}
        {/*    md: '44px',*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <Link*/}
        {/*    fontWeight="500"*/}
        {/*    color={textColor}*/}
        {/*    href="mailto:info@tuvanalabs.com"*/}
        {/*  >*/}
        {/*    Support*/}
        {/*  </Link>*/}
        {/*</ListItem>*/}

      {/*<ListItem>*/}
      {/*  <Link*/}
      {/*    fontWeight="500"*/}
      {/*    color={textColor}*/}
      {/*    href="https://www.tuvanalabs.com/blog"*/}
      {/*  >*/}
      {/*    Blog*/}
      {/*  </Link>*/}
      {/*</ListItem>*/}

      </List>
    </Flex>
  );
}
