import { Box, Text } from '@chakra-ui/react';
import * as React from 'react';

interface StatisticCardProps {
    title: string;
    value: string;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ title, value }) => {
    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
            <Text fontWeight="bold">{title}</Text>
            <Text>{value}</Text>
        </Box>
    );
};

export default StatisticCard;
