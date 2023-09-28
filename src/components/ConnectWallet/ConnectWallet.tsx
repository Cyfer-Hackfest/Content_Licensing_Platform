import { useState } from 'react';
import { useBalance, useInstalledWallets, useUninstalledWallets, useWallet } from 'useink';
import { ChainId } from 'useink/chains';
import { planckToDecimalFormatted } from 'useink/utils';
import { shorttenAddress } from '../../utils';

const chain: ChainId = 'phala-testnet'

export const ConnectWallet = () => {
  const { account, connect, setAccount, accounts, disconnect } = useWallet();
  const installedWallets = useInstalledWallets();
  const uninstalledWallets = useUninstalledWallets();
  const balance = useBalance(account, chain);

  const [showUserSwitch, setShowUserSwitch] = useState(false);
  const [showWalletToConnect, setShowWalletToConnect] = useState(false);


  if (installedWallets.length === 0) {
    return (
      <h2 className='text-xl font-bold'>
        You don&apos;t have any wallets installed...
      </h2>
    );
  }

  return (
    <>
      {!account ? (
        <div className="relative group bg-blue-300 px-8 py-4 rounded-3xl"
          onMouseEnter={() => setShowWalletToConnect(true)}
          onMouseLeave={() => setShowWalletToConnect(false)}
        >
          <h2 className='text-2xl font-bold'>Connect a Wallet</h2>

          {showWalletToConnect && (
            <div className="absolute bg-black p-2 space-y-2 shadow-md right-0 top-16 text-white"
              onMouseEnter={() => setShowWalletToConnect(true)}
              onMouseLeave={() => setShowWalletToConnect(false)}
            >
              {/* Add user switch options here */}
              {installedWallets.length > 0 ? (
                <>
                  <h3 className='text-md'>Installed Wallets</h3>
                  {installedWallets.map((w) => (
                    <div key={w.title}>
                      <button
                        type='button'
                        onClick={() => connect(w.extensionName)}
                        className='flex items-center w-full rounded-2xl text-white px-6 py-4 bg-blue-500 hover:bg-blue-600 transition duration-75'
                      >
                        <img
                          className='w-12 mr-2'
                          src={w.logo.src}
                          alt={w.logo.alt}
                        />
                        Connect to {w.title}
                      </button>
                    </div>
                  ))}
                </>
              ) : (
                <h2 className='text-xl font-bold'>
                  You don&apos;t have any wallets installed...
                </h2>
              )}

              {uninstalledWallets.length > 0 && (
                <>
                  <h3 className='text-md'>Uninstalled Wallets</h3>

                  {uninstalledWallets.map((w) => (
                    <div key={w.title}>
                      <a
                        href={w.installUrl}
                        rel='noreferrer'
                        target='_blank'
                        className='flex items-center w-full rounded-2xl text-white px-6 py-4 bg-blue-500 hover:bg-blue-600 transition duration-75'
                      >
                        <img
                          className='w-12 mr-2'
                          src={w.logo.src}
                          alt={w.logo.alt}
                        />
                        Install {w.title}
                      </a>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="relative group  bg-blue-300 px-5 py-5 rounded-3xl"
          onMouseEnter={() => setShowUserSwitch(true)}
          onMouseLeave={() => setShowUserSwitch(false)}
        >
          <div>
            <span className='dark:bg-slate-900 mr-2 bg-slate-200 rounded-3xl py-2 px-3'>
              {account?.name}
            </span>
            <span>{shorttenAddress(account?.address, 4, 4)}</span>
          </div>

          {showUserSwitch && (
            <div className="absolute bg-black p-2 space-y-2 shadow-md right-0 top-16 text-white w-52"
              onMouseEnter={() => setShowUserSwitch(true)}
              onMouseLeave={() => setShowUserSwitch(false)}
            >
              {accounts?.map(
                (acc) =>
                  account !== acc && (
                    <div key={acc.address} className='rounded-2xl text-white p-2 bg-blue-500 hover:bg-blue-600 transition duration-75 flex flex-row justify-between items-center'
                      onClick={() => setAccount(acc)}
                    >
                      <div className='mr-5'>

                      <span className='dark:bg-slate-900 bg-slate-200 rounded-3xl py-2 px-3 my-1 text-sm'>
                        {acc?.name}
                      </span>
                      <p className='ml-2 text-xs mt-1'>{shorttenAddress(acc?.address, 4, 4)}</p>
                      </div>
                      <div>switch</div>
                    </div>
                  ),
              )}
              <div>
                <button
                  type='button'
                  onClick={disconnect}
                  className='rounded-2xl text-white px-6 py-4 bg-yellow-400 hover:bg-yellow-600 transition duration-75'
                >
                  Disconnect
                </button>
              </div>
            </div>
          )}


          {/* <li>
                  <b>Your Free Balance:</b>
                  <span className='ml-4 dark:bg-slate-600 bg-slate-200 rounded-lg py-2 px-2'>
                    {planckToDecimalFormatted(balance?.freeBalance, {
                      decimals: 12
                    })}
                  </span>
                </li> */}
        </div>
      )}
    </>
  );
};
