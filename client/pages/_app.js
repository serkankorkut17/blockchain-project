import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react';
import { Sepolia } from '@thirdweb-dev/chains';
import { CrowdFundingProvider } from '../context/CrowdFunding';
import { AuthProvider } from '../context/Auth';
import '../styles/globals.css';
import Layout from '../components/Layout';

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
//const activeChain = ChainId.Goerli;
const clientId = '9ee5bdfcea8ea4e85299b0f25aeb06a6';

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider activeChain={Sepolia} clientId={clientId}>
      <AuthProvider>
        <CrowdFundingProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CrowdFundingProvider>
      </AuthProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
