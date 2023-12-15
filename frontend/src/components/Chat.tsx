import React, { useState } from 'react';
import { Box, VStack, Input, Button } from '@chakra-ui/react';

interface Message {
    text: string;
    sender: 'user' | 'bot';
}

interface ChatProps {
    address: string
}

const Chat: React.FC<ChatProps> = ({address}) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');

    const handleSendMessage = async () => {
        if (inputText.trim() !== '') {
            let newMessages: Message[] = [...messages, { text: inputText, sender: 'user' }];
            setMessages(newMessages);

            try {
                const response = await fetch(`http://localhost:8000/chat`, {
                    headers: {
                      "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({
                        "blockchain_address": address,
                        "prompt": inputText,
                        "tag": "number_failed_transactions"
                    })
                });
                const data = await response.json();
                console.log(data)
                newMessages = [...messages, { text: JSON.stringify(data), sender: 'bot' }];
                setMessages(newMessages);
            } catch (error) {
                console.error('Error fetching data:', error);
                newMessages = [...messages, { text: "Sorry I am not able to find an answer to the question", sender: 'bot' }];
                setMessages(newMessages);
            }

            setInputText('');
            // Here you might call an API to get the response from the chatbot
        }
    };

    return (
        <VStack spacing={4} align="stretch">
            <Box p={4} bg="blue.50" borderRadius="lg" w="100%">
                {messages.map((message, index) => (
                    <Box key={index} alignSelf={message.sender === 'user' ? 'flex-end' : 'flex-start'} mb={2}>
                        <Box p={2} bg="white" borderRadius="md">
                            {message.text}
                        </Box>
                    </Box>
                ))}
            </Box>
            <Box display="flex">
                <Input
                    placeholder="Type your message"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    flex={1}
                />
                <Button onClick={handleSendMessage} ml={2}>Send</Button>
            </Box>
        </VStack>
    );
};

export default Chat;
