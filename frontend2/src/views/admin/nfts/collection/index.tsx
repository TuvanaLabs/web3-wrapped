/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   ____  ____   ___
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| |  _ \|  _ \ / _ \
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |  | |_) | |_) | | | |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |  |  __/|  _ <| |_| |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___| |_|   |_| \_\\___/

=========================================================
* Horizon UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.horizon-ui.com/pro/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
	Box,
	Button,
	Flex,
	Icon,
	Text,
	useColorModeValue,
	SimpleGrid,
	Select,
	useToast, Skeleton
} from '@chakra-ui/react';
import {
	useAccount,
} from 'wagmi'

// Custom components
import NFT from 'components/card/NFT';
import { SearchBar } from 'views/admin/nfts/collection/components/Search';

// Assets
import bgMastercard from 'assets/img/dashboards/Debit.png';
import Nft1 from 'assets/img/nfts/Nft1.png';
import Nft3 from 'assets/img/nfts/Nft3.png';
import Nft4 from 'assets/img/nfts/Nft4.png';
import Nft5 from 'assets/img/nfts/Nft5.png';
import Nft6 from 'assets/img/nfts/Nft6.png';
import NftLarge1 from 'assets/img/nfts/NftLarge1.png';
import NftBanner1 from 'assets/img/nfts/NftBanner1.png';
import Avatar1 from 'assets/img/avatars/avatar1.png';
import Avatar2 from 'assets/img/avatars/avatar2.png';
import Avatar3 from 'assets/img/avatars/avatar3.png';
import Avatar4 from 'assets/img/avatars/avatar4.png';

import { MdDashboard, MdApps } from 'react-icons/md';
import TopAccounts from "./components/stats/charts/TopAccounts";
import TransactionActivity from "./components/stats/charts/TransactionActivity";
import ParticipatedBlocks from "./components/stats/SimpleStat";
import SimpleStat from "./components/stats/SimpleStat";
import LargestTransactionsTable from "./components/stats/tables/LargestTransactions";
import Sample from "./components/stats/charts/Sample";
import {useEffect, useState} from "react";
import MonthlyActivity from "./components/stats/charts/MonthlyActivity";


import ReactGA from "react-ga4";


const serverURL = process.env.REACT_APP_WEB3_WRAPPED_SERVER_URL;

export default function Collection() {
	const gaMeasurementID = process.env.REACT_APP_GA_MEASUREMENT_ID;
	// console.log(gaMeasurementID)
	ReactGA.initialize(gaMeasurementID);

	ReactGA.send({ hitType: "pageview", page: "/wrapped", title: "2023 Wrapped" });

	const textColor = useColorModeValue('secondaryGray.900', 'white');

	const toast = useToast({position: "top-right"});
	const [stats, setStats] = useState<any>({});
	const [isLoaded, setIsLoaded] = useState(false);
	const { address, connector, isConnected } = useAccount();
	// console.log({ address, connector, isConnected });


	const getStats = async (blockchain_address: string): Promise<any> => {
		if(Object.keys(stats).length === 0 ) {
			// console.log(`fetching stats for ${blockchain_address}`);
			const response = await fetch(`${serverURL}/stats/${blockchain_address}`);
			// const response = await fetch(`${serverURL}/mocks/stats`);
			const data = await response.json();
			// console.log(data["monthly_transactions_sent"]["EVM"]["Transactions"])

			if(response.status !== 200) {
				throw new Error(`request failed with ${data['detail']}`);
			}

			// console.log(`retrieved stats for ${blockchain_address}`);
			return data;
		}
	};

	useEffect(() => {
		if(isConnected && address !== undefined && address.length === 42) {
			// setStats(localStats)
			getStats(address)
				.then(r => {
					// console.log(r)
					setStats(r);
					setIsLoaded(true);

					ReactGA.event({
						action: "Loaded Stats",
						category: "Wrapped",
						label: "Button",
						nonInteraction: true,
						// transport: undefined,
						// value: 0
					});
				})
				.catch(err => {
					if(err.toString().includes("request limit reached")) {
						toast({
							// title: 'Account created.',
							description: 'Too many requests. Please try again later.',
							status: 'error',
							duration: 3000,
							isClosable: true,
						});
					}
					else {
						toast({
							// title: 'Account created.',
							description: 'Failed to get stats. Please try again later.',
							status: 'error',
							duration: 3000,
							isClosable: true,
						});
					}
					// console.error(err);
					setStats({});


					ReactGA.event({
						action: "Failed To Load Stats",
						category: "Wrapped",
						label: "Error",
						nonInteraction: true,
						// transport: undefined,
						// value: 0
					});
				});
		}
	}, [address]);

	// Chakra Color Mode
	return (
		<Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
			{
				address !== undefined && address.length === 42 ?
				<>
					<Text mt='25px' color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
						Your year in web3
					</Text>
					<Text mb='36px' color={textColor} fontSize='l' ms='24px' fontWeight='700'>
						More chains coming soon
					</Text>
					{stats &&
						<Skeleton isLoaded={isLoaded}>
							<SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap='20px'>
								<TopAccounts data={stats["top_accounts_sent_to"]} type="sent"/>
								<TopAccounts data={stats["top_accounts_received_from"]} type="received"/>
								<MonthlyActivity data={{
									"monthly_transactions_sent": stats["monthly_transactions_sent"],
									"monthly_transactions_received": stats["monthly_transactions_received"]
								}} />
								{/*<TransactionActivity />*/}

								<SimpleStat
									data={stats["blocks_included_in"]}
									type="blocks_included_in"
									title={"You transactions were included in"}
									focusTextUnit={"Blocks"}
									backgroundImage={bgMastercard}
								/>
								<SimpleStat
									data={stats["num_transactions"]}
									type="num_transactions"
									title={"You sent a total of"}
									focusTextUnit={"Transactions"}
									backgroundImage={Nft1}
								/>
								<SimpleStat
									data={stats["largest_fee_paid"]}
									type="largest_fee_paid"
									title={"Your highest transaction fee was"}
									focusTextUnit={"ETH"}
									backgroundImage={NftBanner1}
								/>

								{/*<LargestTransactionsTable*/}
								{/*	txnType="sent"*/}
								{/*	tableData={[*/}
								{/*		{*/}
								{/*			hash: '0xb6ac7b57ac9c43ba5237a781dbb0a8fe62fedbb241b472acfe2266b111ddcaf3',*/}
								{/*			recipient: "0xbbdfc40fdee73cb6b60d9c88f25641bf111ab8e0",*/}
								{/*			amount: "1.101219953608982636",*/}
								{/*		},*/}
								{/*		{*/}
								{/*			hash: '0x6d6aa964cd1344ed0f2c4f5245f27398f629d46829e7fa8dafbe8c7acd0bc1d8',*/}
								{/*			recipient: "0xe66b31678d6c16e9ebf358268a790b763c133750",*/}
								{/*			amount: "0.920335241523553573",*/}
								{/*		},*/}
								{/*		{*/}
								{/*			hash: '0xabae6494c6396fd9d79e702a4054e6dc0be7201aee5d58419e1c1b94cfac2562',*/}
								{/*			recipient: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",*/}
								{/*			amount: "0.142204479699664130",*/}
								{/*		}*/}
								{/*	]}*/}
								{/*/>*/}
								{/*<LargestTransactionsTable*/}
								{/*	txnType="received"*/}
								{/*	tableData={[*/}
								{/*		{*/}
								{/*			hash: '0x6d6aa964cd1344ed0f2c4f5245f27398f629d46829e7fa8dafbe8c7acd0bc1d8',*/}
								{/*			sender: "0xe66b31678d6c16e9ebf358268a790b763c133750",*/}
								{/*			amount: "1.101219953608982636",*/}
								{/*		},*/}
								{/*		{*/}
								{/*			hash: '0xabae6494c6396fd9d79e702a4054e6dc0be7201aee5d58419e1c1b94cfac2562',*/}
								{/*			sender: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",*/}
								{/*			amount: "0.142204479699664130",*/}
								{/*		},*/}
								{/*		{*/}
								{/*			hash: '0xaa1c4bfc29dea053b7a23e897e877abd5a5465b0e9192fbf93bd63fcaff2afd2',*/}
								{/*			sender: "0xe66b31678d6c16e9ebf358268a790b763c133750",*/}
								{/*			amount: "0.094803703664689830",*/}
								{/*		}*/}
								{/*	]}*/}
								{/*/>*/}
								{/*<SimpleStat*/}
								{/*	data={stats["tokens_minted"]}*/}
								{/*	type="tokens_minted"*/}
								{/*	title={"Tokens you minted"}*/}
								{/*	focusTextUnit={""}*/}
								{/*	backgroundImage={Nft3}*/}
								{/*/>*/}
								{/*<MonthlyActivity data={{*/}
								{/*	"monthly_transactions_sent": stats["monthly_transactions_sent"],*/}
								{/*	"monthly_transactions_received": stats["monthly_transactions_received"]*/}
								{/*}} />*/}

								<SimpleStat
									data={stats["tokens_burnt"]}
									type="tokens_burnt"
									title={"Tokens you burnt"}
									focusTextUnit={""}
									backgroundImage={Nft4}
								/>
								<SimpleStat
									data={stats["nfts_minted"]}
									type="nfts_minted"
									title={"NFTs you minted"}
									focusTextUnit={""}
									backgroundImage={Nft5}
								/>
								<SimpleStat
									data={stats["nfts_burnt"]}
									type="nfts_burnt"
									title={"NFTs you burnt"}
									focusTextUnit={""}
									backgroundImage={Nft6}
								/>
							</SimpleGrid>
						</Skeleton>
					}
				</>
				:
				<>
					<Text mb='36px' ms='24px'>Please connect your wallet to get started.</Text>
					<Sample />
				</>
			}
		</Box>
	);
}
