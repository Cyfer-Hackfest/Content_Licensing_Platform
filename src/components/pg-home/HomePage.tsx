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
import { ContentCard, ContentCardModal } from '../ContentCard';
import { Content, ContentsResponse } from '../../types';
import { CreateModal } from '../CreateModal';
import metadata from '../../metadata/usage_license_contract/usage_license_contract.json'

type ContentsResult = Array<ContentsResponse>

export const HomePage: React.FC = () => {
  const { network } = useAppSelector(state => state.app_state)
  const dispatch = useAppDispatch()
  const { addNotification } = useNotifications();
  const { account } = useWallet();
  
  const contract = useContract(network.contract_address, metadata, network.chain_id);
  const call = useCall<ContentsResult>(contract, 'getnumber');

  const [contentData, setContentData] = useState<ContentsResponse>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [contentToShow, setContentToShow] = useState<Content | null>(null)

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

  console.log(contract);
  
  if (!contract?.contract) {
    return (
      <div className='justify-center h-screen flex items-center w-full'>
        <h1 className='text-3xl font-bold'>Loading contract...</h1>
      </div>
    );
  }

  return (
    <section className='w-full mx-auto'>
      <Notifications />
      
      <CreateModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />

      <button className='bg-green-400 px-5 py-2 rounded-xl ml-10 mt-5' onClick={() => setIsCreateModalOpen(true)}>Create Content</button>

      {contentToShow && (
        <ContentCardModal content={contentToShow} onClose={() => setContentToShow(null)}/>
      )}

      <ContentGrid >
        <ContentCard 
        content={{
          author: '0x1232...3213',
          name: 'abbc',
          avt: 'QmbdEf5kx53QvkYpaJu3t9pA83ragJybyCUQcyysUV7pgE',
          description: 'nothing',
          media: "QmZhwctgtktzUCQRRbQPPZofuKo2FAKmi32y36XSrePX7j",
          payment: {}
        }} 
        isAuthor={false} 
        onBuyClick={function (contentId: string): void {
          throw new Error('Function not implemented.');
        }} 
        setContentToShow={() => setContentToShow({
          author: '0x1232...3213',
          name: 'abbc',
          avt: 'QmbdEf5kx53QvkYpaJu3t9pA83ragJybyCUQcyysUV7pgE',
          description: 'nothing',
          payment: {},
          media: "QmZhwctgtktzUCQRRbQPPZofuKo2FAKmi32y36XSrePX7j",
        })} />
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
