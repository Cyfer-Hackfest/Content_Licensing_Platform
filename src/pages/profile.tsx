import Head from 'next/head';
import { Notifications } from '../components/Notifications';
import { useEffect, useState } from 'react';
import {
  useCall,
  useContract,
  useWallet,
} from 'useink';
import { ChainId } from 'useink/chains';
import { useNotifications } from 'useink/notifications';
import { useAppDispatch, useAppSelector } from '../context';
import { ContentsResponse } from '../types';
import { UserContent, UserLicense } from '../components/pg-profile';
import { LicensesResponse } from '../types/response';

import metadata from "../metadata/usage_license_contract/usage_license_contract.json";

type ContentsResult = Array<ContentsResponse>
type LicensesResult = Array<LicensesResponse>

export default function Profile() {
  const { network } = useAppSelector(state => state.app_state)
  const dispatch = useAppDispatch()
  const { addNotification } = useNotifications();
  const { account } = useWallet();
  const [contentData, setContentData] = useState<ContentsResult>([])
  const [licenseData, setLicenseData] = useState<LicensesResult>([])

  const contract = useContract(network.contract_address, metadata, network.chain_id);
  const contentCall = useCall<ContentsResult>(contract, '');
  const licenseCall = useCall<ContentsResult>(contract, '');

  useEffect(() => {
    contentCall.send([]);

    if (contentCall.result?.ok) {
      setContentData(contentCall.result.value.decoded)
    }

    licenseCall.send([]);

    if (licenseCall.result?.ok) {
      setLicenseData(licenseCall.result.value.decoded)
    }
  }, [])


  useEffect(() => {
    account &&
      addNotification({
        type: 'WalletConnected',
        message: `Connected to ${account.name || account.address}`,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  if (contract?.contract) {
    return (
      <div className='justify-center h-screen flex items-center w-full'>
        <h1 className='text-3xl font-bold'>Loading contract...</h1>
      </div>
    );
  }
  return (
    <>
      <Notifications />

      <UserContent />

      <UserLicense />
    </>
  );
}
