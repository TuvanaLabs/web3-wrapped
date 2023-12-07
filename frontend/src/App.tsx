import * as React from 'react';
import {ChakraProvider, Box, VStack, Heading, SimpleGrid, HStack} from '@chakra-ui/react';
import SearchBar from './components/SearchBar';
import StatisticCard from './components/StatisticCard';

// type Stat = {
//     title: string
//     value: string
// };

const App = () => {
    // const [address, setAddress] = React.useState('');
    const [statistics, setStatistics] = React.useState<{ [key: string]: string }>({});

    const handleSearch = async (address: string) => {
        // setAddress(address);
        // Replace '/api/statistics' with the actual endpoint you need to hit
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
                    <HStack>
                        <Heading>Web3 Wrapped</Heading>
                        <SearchBar onSearch={handleSearch} />
                    </HStack>
                    <SimpleGrid columns={[1, 2, 3]} spacing={10}>
                        {Object.entries(statistics).map(([key, value], index) => (
                            <StatisticCard key={index} title={key} value={String(value)} />
                        ))}
                    </SimpleGrid>
                </VStack>
            </Box>
        </ChakraProvider>
    );
};

export default App;
