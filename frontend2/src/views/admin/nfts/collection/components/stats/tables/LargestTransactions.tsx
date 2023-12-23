/* eslint-disable */

import { Box, Flex, Button, Icon, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable
} from '@tanstack/react-table';
import { MdOutlineCalendarToday } from 'react-icons/md';
// Custom components
import Card from 'components/card/Card';
import * as React from 'react';
// Assets

type RowObj = {
    hash: string;
    recipient?: string;
    sender?: string;
    amount: string;
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function LargestTransactionsTable(props: { txnType: string, tableData: any }) {
    const { txnType, tableData } = props;
    const [ sorting, setSorting ] = React.useState<SortingState>([]);
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const textColorSecondary = useColorModeValue('secondaryGray.600', 'white');
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
    const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
    let defaultData = tableData;

    const columns = [
        columnHelper.accessor('amount', {
            id: 'amount',
            header: () => (
                <Text
                    justifyContent='space-between'
                    align='center'
                    fontSize={{ sm: '10px', lg: '12px' }}
                    color='gray.400'>
                    AMOUNT (ETH)
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize='sm' fontWeight='700'>
                    {info.getValue()}
                </Text>
            )
        }),
        columnHelper.accessor(txnType === "sent" ? 'recipient' : "sender", {
            id: txnType === "sent" ? 'recipient' : "sender",
            header: () => (
                <Text
                    justifyContent='space-between'
                    align='center'
                    fontSize={{ sm: '10px', lg: '12px' }}
                    color='gray.400'>
                    {txnType === "sent" ? "RECIPIENT" : "SENDER"}
                </Text>
            ),
            cell: (info) => (
                <Text color={textColor} fontSize='sm' fontWeight='600'>
                    {info.getValue()}
                </Text>
            )
        }),
        columnHelper.accessor('hash', {
            id: 'hash',
            header: () => (
                <Text
                    justifyContent='space-between'
                    align='center'
                    fontSize={{ sm: '10px', lg: '12px' }}
                    color='gray.400'>
                    TXN HASH
                </Text>
            ),
            cell: (info: any) => (
                <Text color={textColor} fontSize='sm' fontWeight='600'>
                    {info.getValue()}
                </Text>
            )
        }),
    ];
    const [ data, setData ] = React.useState(() => [ ...defaultData ]);
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: true
    });
    return (
        <Card flexDirection='column' w='100%' px='0px' overflowX='scroll'>
            <Flex align='center' justify='space-between' w='100%' px='10px' mb='20px'>
                <Text color={textColor} fontSize='lg' fontWeight='700' lineHeight='100%'>
                    {txnType === "sent" ? "Largest Transactions Received" : "Largest Transactions Sent"}
                </Text>
            </Flex>
            <Box>
                <Table variant='striped' color='gray.500'  mt="12px">
                    <Thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <Th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            pe='10px'
                                            borderColor={borderColor}
                                            cursor='pointer'
                                            onClick={header.column.getToggleSortingHandler()}>
                                            <Flex
                                                justifyContent='space-between'
                                                align='center'
                                                fontSize={{ sm: '10px', lg: '12px' }}
                                                color='gray.400'>
                                                {flexRender(header.column.columnDef.header, header.getContext())}{{
                                                asc: '',
                                                desc: '',
                                            }[header.column.getIsSorted() as string] ?? null}
                                            </Flex>
                                        </Th>
                                    );
                                })}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {table.getRowModel().rows.slice(0, 11).map((row) => {
                            return (
                                <Tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <Td
                                                key={cell.id}
                                                fontSize={{ sm: '14px' }}
                                                minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                                                borderColor='transparent'>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </Td>
                                        );
                                    })}
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </Box>
        </Card>
    );
}
