import { useState } from 'react';
import { useBalance, useInstalledWallets, useUninstalledWallets, useWallet } from 'useink';
import { ChainId } from 'useink/chains';
import { planckToDecimalFormatted } from 'useink/utils';
import { shorttenAddress } from '../../utils';
import { SUPPORTED_NETWORKS } from '../../constants';

const chain: ChainId = 'phala-testnet'

export const SwitchNetwork = () => {
  const { account } = useWallet();
    const [showNetworkSwitch, setShowNetworkSwitch] = useState(false);
    const balance = useBalance(account, chain);

    return (
        <div className="relative group bg-blue-300 px-8 py-2 rounded-3xl"
            onMouseEnter={() => setShowNetworkSwitch(true)}
            onMouseLeave={() => setShowNetworkSwitch(false)}
        >
            <div className="text-white cursor-pointer flex flex-row justify-start items-center"
            >
                <img src={SUPPORTED_NETWORKS[0].logo_url} alt="" width={30} height={30} className='mr-3' />
                <div>
                    <p>
                        {SUPPORTED_NETWORKS[0].name}
                    </p>
                    <p>{planckToDecimalFormatted(balance?.freeBalance, {
                      decimals: 12
                    })} {SUPPORTED_NETWORKS[0].currency}</p>
                </div>
            </div>

            {showNetworkSwitch && (
                <div className="absolute bg-black p-2 space-y-2 shadow-md right-0 top-16 text-white w-60"
                    onMouseEnter={() => setShowNetworkSwitch(true)}
                    onMouseLeave={() => setShowNetworkSwitch(false)}
                >
                    <p>There are 4 chains supported</p>
                    {SUPPORTED_NETWORKS.map(net => (
                        <div key={net.chain_id} className='rounded-2xl text-white p-2 bg-blue-500 hover:bg-blue-600 transition duration-75 flex-col justify-start items-start'>
                            <p>{net.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
