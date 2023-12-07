import { Box, Input, Button } from '@chakra-ui/react';
import * as React from 'react';

interface SearchBarProps {
    onSearch: (address: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [input, setInput] = React.useState('');

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            onSearch(input);
        }
    };

    return (
        <Box display="flex" justifyContent="center">
            <Input
                placeholder="Enter ETH Address"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <Button
                onClick={() => onSearch(input)}
                colorScheme="blue"
                ml={2}
            >
                Search
            </Button>
        </Box>
    );
};

export default SearchBar;
