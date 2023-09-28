import metadata from '../../metadata/usage_license_contract/usage_license_contract.json';
import { Notifications } from '../Notifications';
import { useEffect, useState } from 'react';
/* eslint-disable @next/next/no-img-element */
import {
  useBalance,
  useContract,
  useInstalledWallets,
  useUninstalledWallets,
  useWallet,
} from 'useink';
import { ChainId } from 'useink/chains';
import { useNotifications } from 'useink/notifications';
import {
  planckToDecimalFormatted,
} from 'useink/utils';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { Snackbar } from '../Snackbar';
import { SelectList, SelectOption } from '../SelectList';
import { FileDropper } from '../FileDropper';
import { ConnectWallet } from '../ConnectWallet';
import { useAppDispatch, useAppSelector } from '../../hook';

const CONTRACT_ADDRESS =
  '5G31GiBqWPFCm8S9cknY7UWAPA8SwNJJdoG4RrmtVDQyrk7Y';

const chain: ChainId = 'phala-testnet'

export const HomePage: React.FC = () => {
  const { } = useAppSelector(state => state.app_state)
  const dispatch = useAppDispatch()
  const { addNotification } = useNotifications();
  const { account, accounts, setAccount, connect, disconnect } = useWallet();
  // const licenseContract = useContract(CONTRACT_ADDRESS, metadata);
  const licenseContract = null;

  useEffect(() => {
    account &&
      addNotification({
        type: 'WalletConnected',
        message: `Connected to ${account.name || account.address}`,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);  

  if (licenseContract?.contract) {
    return (
      <div className='justify-center h-screen flex items-center w-full'>
        <h1 className='text-3xl font-bold'>Loading contract...</h1>
      </div>
    );
  }

  return (
    <section className='w-full mx-auto'>
      <Notifications />
      
      {/* <ToggleSwitch enabled={false} onChange={() => {}} /> */}
      {/* <Snackbar show={true} message={'1234213123'} type={'success'} onClick={() => {}} /> */}
      {/* <SelectList onChange={function (value: SelectOption | null): void {
        throw new Error('Function not implemented.');
      } } options={[]} value={null} /> */}
      {/* <FileDropper onDrop={undefined} cta={'drop a file here'} /> */}
      {/* <ConnectWallet /> */}
    </section>
  );
};
