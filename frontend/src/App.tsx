import * as React from 'react';
import {
    ChakraProvider,
    Box,
    VStack,
    Heading,
    SimpleGrid,
    HStack,
    TabPanel,
    TabPanels,
    Tab,
    Tabs, TabList
} from '@chakra-ui/react';
import SearchBar from './components/SearchBar';
import StatisticCard from './components/StatisticCard';
import Chat from "./components/Chat";

// type Stat = {
//     title: string
//     value: string
// };

const App = () => {
    // const [address, setAddress] = React.useState('');
    const [statistics, setStatistics] = React.useState<{ [key: string]: string }>({});

    const handleSearch = async (address: string) => {
        // setAddress(address);
        try {
            const response = await fetch(`http://localhost:8000/stats/${address}`);
            const data = await response.json();
            console.log(data)
            setStatistics(data["ethereum"]["addressStats"][0]["address"]);
        } catch (error) {
            console.error('Error fetching data:', error);
            setStatistics({});
        }
    };

    return (
        <ChakraProvider>
            <Box textAlign="center" fontSize="xl">
                <VStack spacing={8}>
                    <HStack spacing={12}>
                        <Heading>Web3 Wrapped</Heading>
                        <SearchBar onSearch={handleSearch} />
                    </HStack>
                    <Tabs isFitted variant="enclosed">
                        <TabList mb="1em">
                            <Tab>Statistics</Tab>
                            <Tab>Chat</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <SimpleGrid columns={[1, 2, 3]} spacing={10}>
                                    {Object.entries(statistics).map(([key, value], index) => (
                                        <StatisticCard key={index} title={key} value={String(value)} />
                                    ))}
                                </SimpleGrid>
                            </TabPanel>
                            <TabPanel>
                                <Chat />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </VStack>
            </Box>
        </ChakraProvider>
    );
};

export default App;
