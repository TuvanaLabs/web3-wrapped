import './assets/css/App.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiConfig } from 'wagmi'
import { mainnet } from 'viem/chains'

const projectId = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID;
// console.log(projectId)

const metadata = {
    name: 'Web3Wrapped',
    description: 'Web3Wrapped',
    url: 'https://web3wrapped.xyz',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({ wagmiConfig, projectId, chains, themeMode: 'dark' })

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <WagmiConfig config={wagmiConfig}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WagmiConfig>
);
