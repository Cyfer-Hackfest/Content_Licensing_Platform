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

export const HomePage: React.FC = () => {
  const { network } = useAppSelector(state => state.app_state)
  const dispatch = useAppDispatch()
  const { addNotification } = useNotifications();
  const { account } = useWallet();

  const contract = useContract(network.contract_address, metadata, network.chain_id);

  const call = useCall<any>(contract, 'contentCore::getContents');

  const [contentData, setContentData] = useState<Array<Content>>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [contentToShow, setContentToShow] = useState<Content | null>(null)

  useEffect(() => {
    getContents();

    return () => {
      getContents();
    }
  }, [contract?.contract])

  useEffect(() => {
    account &&
      addNotification({
        type: 'WalletConnected',
        message: `Connected to ${account.name || account.address}`,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const getContents = async () => {
    if (contract?.contract) {
      console.log(call);
      
      await call.send([], { defaultCaller: true });

      if (call.result?.ok) {
        setContentData(call.result.value.decoded?.Ok)
      }
    } else {
      setContentData([])
    }
  }
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

      <CreateModal contract={contract} isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />

      <button className='bg-green-400 px-5 py-2 rounded-xl ml-10 mt-5' onClick={() => setIsCreateModalOpen(true)}>Create Content</button>

      {contentToShow && (
        <ContentCardModal contract={contract} content={contentToShow} onClose={() => setContentToShow(null)} />
      )}

      {contentData.length ? <ContentGrid >
        {contentData.map((content, index) => (
          <ContentCard
            key={index}
            content={content}
            isAuthor={false}
            onBuyClick={function (contentId: string): void {
              throw new Error('Function not implemented.');
            }}
            setContentToShow={() => setContentToShow(content)} />
        ))}

      </ContentGrid> : (
        <div>No content found</div>
      )}

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
