import { useState } from 'react';
import { useBalance, useInstalledWallets, useUninstalledWallets, useWallet } from 'useink';
import { ChainId } from 'useink/chains';
import { planckToDecimalFormatted } from 'useink/utils';
import { shorttenAddress } from '../../utils';
import { SUPPORTED_NETWORKS } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../context';
import { NetWork } from '../../types';
import { setNetworkAsync } from '../../context/appState';

export const SwitchNetwork = () => {
    const { account } = useWallet();
    const [showNetworkSwitch, setShowNetworkSwitch] = useState(false);
    const {network} = useAppSelector(state => state.app_state)

    const balance = useBalance(account, network.chain_id);

    const dispatch = useAppDispatch()

    const switchNetwork = (network: NetWork) => {
        dispatch(setNetworkAsync(network))
    }

    return (
        <div className="relative group bg-blue-300 px-8 py-2 rounded-3xl"
            onMouseEnter={() => setShowNetworkSwitch(true)}
            onMouseLeave={() => setShowNetworkSwitch(false)}
        >
            <div className="text-white cursor-pointer flex flex-row justify-start items-center"
            >
                <img src={network.logo_url} alt="" width={30} height={30} className='mr-3' />
                <div>
                    <p>
                        {network.name}
                    </p>
                    <p>{planckToDecimalFormatted(balance?.freeBalance, {
                      decimals: network.decimals
                    })} {network.currency}</p>
                </div>
            </div>

            {showNetworkSwitch && (
                <div className="absolute bg-black p-2 space-y-2 shadow-md right-0 top-16 text-white w-60"
                    onMouseEnter={() => setShowNetworkSwitch(true)}
                    onMouseLeave={() => setShowNetworkSwitch(false)}
                >
                    <p>There are {SUPPORTED_NETWORKS.length} chains supported</p>
                    {SUPPORTED_NETWORKS.map(net => (
                        <div key={net.chain_id} className='rounded-2xl text-white p-2 bg-blue-500 hover:bg-blue-600 transition duration-75 flex-col justify-start items-start' onClick={()=> switchNetwork(net)}>
                            <p>{net.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
