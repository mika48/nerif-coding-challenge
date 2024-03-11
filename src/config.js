import { polygonMumbai } from '@wagmi/core/chains';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';

export const chains = [ polygonMumbai ];
export const projectId = process.env.REACT_APP_PROJECT_ID;
export const contractAddress = '0x4c91065597eE71D9711F998bcaf8BefB0b0E9392';

export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata: {
    name: 'My Website',
    description: 'My Website description',
    url: 'https://mywebsite.com',
    icons: ['https://avatars.mywebsite.com/']
  }
});