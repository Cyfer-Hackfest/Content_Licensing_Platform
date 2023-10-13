import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from 'styled-components';
import { Content, License, Payment, Star } from "../../types";
import { ChainContract, useCall, useTx, useWallet } from "useink";
import ReactPlayer from "react-player";
import { LicenseCard } from "../LicenseCard";
import { useNotifications } from "useink/notifications";
import { type } from "os";
import { useAppSelector } from "../../context";
import UpdatePayment from "./UpdatePayment";
import { shorttenAddress, stringToNumber } from "../../utils";
import BuyPayment from "./BuyPayment";
import { PaymentOptionRequest } from "../../types/request";

interface ContentCardModalProps {
    content: Content;
    onClose: () => void;
    contract: ChainContract
}

const ContentCardModal: React.FC<ContentCardModalProps> = ({ content, onClose, contract }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatedPrice, setUpdatedPrice] = useState<string>('');
    const { account } = useWallet();
    const { network } = useAppSelector(state => state.app_state);
    const { addNotification } = useNotifications();
    
    const [licenses, setLicenses] = useState<Array<License>>([])
    
    const buyTx = useTx<any>(contract, 'licenseCore::buyUsageLicense');
    const call = useCall<any>(contract, 'licenseCore::getLicenses')
    const updateTx = useTx<any>(contract, 'contentCore::updatePayment');

    useEffect(() => {
        const getLicenses = async () => {
            if (contract) {
                await call.send([content.contentId], { defaultCaller: true })
                // console.log(call.result);
                if (call.result?.ok) {
                    setLicenses(call.result.value.decoded.Ok)
                }
            }
        }

        getLicenses();

        return () => {
            getLicenses()
        }
    }, [network.chain_id, contract?.contract, content.contentId, call.result?.ok])

    const handleRemoveClick = () => {

    };

    const handleUpdatePrice = (payment: Payment) => {
        const { option1, option2, option3 } = payment;

        const op1 = option1?.days && option1?.price ? option1 : null;
        const op2 = option2?.days && option2?.price ? option2 : null;
        const op3 = option3?.days && option3?.price ? option3 : null;

        updateTx.signAndSend([content.contentId, [op1, op2, op3]])
    };

    const handleBuyContent = (op: PaymentOptionRequest) => {
        const { option1, option2, option3 } = content.payment;
        
        const opString: string = op == PaymentOptionRequest.Option1 ? "Option1" : op == PaymentOptionRequest.Option2 ? 'Option2' : 'Option3';
        
        let transfering_value: number | string | undefined = opString == 'Option1' ? option1?.price : opString == 'Option2' ? option2?.price : option3?.price;

        if (typeof transfering_value == 'string') {
            transfering_value = stringToNumber(transfering_value) ?? undefined;
        }
        if (transfering_value == undefined) return;
        
        buyTx.signAndSend([content.contentId, opString], {
            value: transfering_value
        })
    }

    return (
        <ContainerOverlay onClick={onClose}>
            <Container onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-row justify-center items-start">
                    <div>
                        <ReactPlayer
                            // url={`https://gateway.pinata.cloud/ipfs/QmZhwctgtktzUCQRRbQPPZofuKo2FAKmi32y36XSrePX7j`}
                            url={`https://gateway.pinata.cloud/ipfs/${content.media}`}
                            controls
                        />
                    </div>
                    <div className="w-80 ml-8">
                        <div className="flex flex-row justify-start items-center">
                            <ArtImage
                                className="rounded-full mr-1 mb-3"
                                src={`https://gateway.pinata.cloud/ipfs/${content.avt}`}
                                alt={content.name}
                            />
                            <ArtTitle>{content.name}</ArtTitle>
                        </div>
                        <p>By {shorttenAddress(content.author, 6, 4)}</p>
                        <ArtDescription>{content.description}</ArtDescription>
                        <ButtonContainer>
                            <div className="flex flex-col items-start w-full">
                                {account?.address != content.author ?
                                    <>
                                        <BuyPayment onBuy={handleBuyContent} payment={content.payment}/>
                                    </>
                                    : (
                                        <>
                                            <UpdatePayment payment={content.payment} onUpdate={handleUpdatePrice} />
                                        </>
                                    )
                                }
                            </div>
                        </ButtonContainer>
                    </div>
                </div>
                {licenses.length ? <div className="flex flex-wrap flex-row items-center justify-center overflow-auto" style={{
                    width: 1000,
                    maxHeight: 400
                }}>
                    {licenses.map((license, i) => (
                        <LicenseCard
                            key={i}
                            license={license}
                            setLicenseToShow={function (license: License): void {
                                throw new Error("Function not implemented.");
                            }} />
                    ))}
                </div> : (
                    <div>No license found</div>
                )}
            </Container>
        </ContainerOverlay>
    );
}

export default ContentCardModal;

const ContainerOverlay = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  color: black;
`;

const Container = styled.div`
  border: 1px solid #ccc;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: fit-content;
  margin: 0 auto;
  margin-top: 20px;
`;

const ArtImage = styled.img`
  height: 50px;
  width: 50px;

`;

const ArtTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
`;

const ArtDescription = styled.p`
  color: #666;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  width: 100%;
  padding: 8px 15px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  text-align: center;
  background-color: ${(props) => props.color || "#007bff"};
  color: white;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

export { Button }