import { useEffect, useState } from 'react';
import {
  useCall,
  useContract,
  useWallet,
} from 'useink';
import { ChainId } from 'useink/chains';
import { useNotifications } from 'useink/notifications';

import { Notifications } from '../Notifications';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { Snackbar } from '../Snackbar';
import { SelectList, SelectOption } from '../SelectList';
import { FileDropper } from '../FileDropper';
import { ConnectWallet } from '../ConnectWallet';
import { useAppDispatch, useAppSelector } from '../../context';
import styled from 'styled-components';
import { ContentCard } from '../ContentCard';
import { Content, ContentsResponse } from '../../types';

type ContentsResult = Array<ContentsResponse>

export const HomePage: React.FC = () => {
  const { network, contract } = useAppSelector(state => state.app_state)
  const dispatch = useAppDispatch()
  const { addNotification } = useNotifications();
  const { account } = useWallet();
  const [contentData, setContentData] = useState<ContentsResult>([])
  const call = useCall<ContentsResult>(contract, '');

  useEffect(() => {
    call.send([]);

    if (call.result?.ok) {
      setContentData(call.result.value.decoded)
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
    <section className='w-full mx-auto'>
      <Notifications />
      
      <ContentGrid >
        <ContentCard content={{
          author: '0x1232...3213',
          name: 'abbc',
          avt: 'QmddhSuxm11RFcKt7vbtDhfh7hAbaybaF3FaoSm3SjDK32',
          description: 'nothing',
          payment: {}
        }} isAuthor={false} onBuyClick={function (contentId: string): void {
          throw new Error('Function not implemented.');
        } } setContentToShow={function (content: Content): void {
          throw new Error('Function not implemented.');
        } } /><ContentCard content={{
          author: '0x1232...3213',
          name: 'abbc',
          avt: 'QmddhSuxm11RFcKt7vbtDhfh7hAbaybaF3FaoSm3SjDK32',
          description: 'nothing',
          payment: {}
        }} isAuthor={false} onBuyClick={function (contentId: string): void {
          throw new Error('Function not implemented.');
        } } setContentToShow={function (content: Content): void {
          throw new Error('Function not implemented.');
        } } /><ContentCard content={{
          author: '0x1232...3213',
          name: 'abbc',
          avt: 'QmddhSuxm11RFcKt7vbtDhfh7hAbaybaF3FaoSm3SjDK32',
          description: 'nothing',
          payment: {}
        }} isAuthor={false} onBuyClick={function (contentId: string): void {
          throw new Error('Function not implemented.');
        } } setContentToShow={function (content: Content): void {
          throw new Error('Function not implemented.');
        } } /><ContentCard content={{
          author: '0x1232...3213',
          name: 'abbc',
          avt: 'QmddhSuxm11RFcKt7vbtDhfh7hAbaybaF3FaoSm3SjDK32',
          description: 'nothing',
          payment: {}
        }} isAuthor={false} onBuyClick={function (contentId: string): void {
          throw new Error('Function not implemented.');
        } } setContentToShow={function (content: Content): void {
          throw new Error('Function not implemented.');
        } } />
      </ContentGrid>
      
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

const ContentGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: row;
`;
