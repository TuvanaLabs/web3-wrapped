import {Box, Flex, Grid, Icon} from '@chakra-ui/react';
import {
    MdSmartToy,
    MdChat,
    MdHandyman,
    MdQueryStats,
    MdCandlestickChart
} from 'react-icons/md';
// https://react-icons.github.io/react-icons/search/#q=robot
import { BsRobot } from "react-icons/bs";
import { GiMeshNetwork } from "react-icons/gi";
import { RiHome2Fill } from "react-icons/ri";
import { RiChatSmileFill } from "react-icons/ri";
import { TbRobotFace } from "react-icons/tb";
import { BiSolidNetworkChart } from "react-icons/bi";
import { IoIosGift } from "react-icons/io";




import NFTCollection from 'views/admin/nfts/collection';

import Messages from 'views/admin/main/others/messages';
import {
  ClockIcon,
  DashboardLogo,
  Fingerprint,
  GlobeIcon,
  HomeIcon,
  StatsIcon,
} from "./components/icons/Icons";
import Chatbot from "./components/chat/Chatbot";
import TopBanner from "./views/admin/nfts/marketplace/components/TopBanner";
import DAOAssistant from "./views/admin/assistants/DAOAssistant";
import HomeBody from "./views/admin/main/body/HomeBody";
import BottomBanner from "./views/admin/nfts/marketplace/components/BottomBanner";


const routes = [
  {
    name: 'Welcome',
    layout: '',
    path: '/home',
    icon: <Icon as={RiHome2Fill} width="20px" height="20px" color="inherit" />,
    component: (
        <Box pt={{base: '180px', md: '80px', xl: '80px'}} overflowX={"hidden"}>
          <Flex flexDirection='column'>
            <TopBanner/>
            <HomeBody referralCode={""} fbLink={""} twtLink={""}/>
            <BottomBanner/>
          </Flex>
        </Box>
    ),
    secondary: false,
  },
  {
    name: '2023 Wrapped',
    layout: '',
    path: '/wrapped',
    icon: <Icon as={StatsIcon} width="20px" height="20px" color="inherit" />,
    component: <NFTCollection />,
    secondary: true,
  },
  {
    name: 'Web3 Assistant',
    layout: '',
    path: '/chat',
    icon: <Icon as={RiChatSmileFill} width="20px" height="20px" color="inherit" />,
    exact: false,
    component: <Chatbot />,
    pro: true,
    // demo: true,
  },
  // {
  //   name: 'Builder Assistant',
  //   layout: '',
  //   path: '/builder-assistant',
  //   icon: <Icon as={MdHandyman} width="20px" height="20px" color="inherit" />,
  //   exact: false,
  //   component: <Messages />,
  //   pro: true,
  //   disabled: true,
  // },
  // {
  //   name: 'Investor Assistant',
  //   layout: '',
  //   path: '/investor-assistant',
  //   icon: <Icon as={MdCandlestickChart} width="20px" height="20px" color="inherit" />,
  //   exact: false,
  //   component: <Messages />,
  //   pro: true,
  //   disabled: true,
  // },
  // {
  //   name: 'dApp User Insights',
  //   layout: '',
  //   path: '/product-assistant',
  //   icon: <Icon as={MdQueryStats} width="20px" height="20px" color="inherit" />,
  //   exact: false,
  //   component: <Messages />,
  //   pro: true,
  //   disabled: true,
  // },
  // {
  //   name: 'DAO Treasury Agent',
  //   layout: '',
  //   path: '/dao-assistant',
  //   icon: <Icon as={BiSolidNetworkChart} width="20px" height="20px" color="inherit" />,
  //   exact: false,
  //   component: <DAOAssistant />,
  //   pro: true,
  //   disabled: true,
  // },
];

export default routes;
