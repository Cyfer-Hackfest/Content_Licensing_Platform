import { useState } from "react";
import { useRouter } from "next/router";
import styled from 'styled-components';
import { Content, License, Star } from "../../types";
import { useWallet } from "useink";
import ReactPlayer from "react-player";
import { LicenseCard } from "../LicenseCard";
import { useNotifications } from "useink/notifications";

interface ContentCardModalProps {
    content: Content;
    onClose: () => void;
}

const ContentCardModal: React.FC<ContentCardModalProps> = ({ content, onClose }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatedPrice, setUpdatedPrice] = useState<string>('');
    const [showBuyOption, setShowBuyOption] = useState<boolean>(false);
    const [showUpdatePriceOption, setShowUpdatePriceOption] = useState<boolean>(false)
    const { account } = useWallet();
    const { addNotification } = useNotifications();


    const handleShowModal = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleBuyClick = async () => {
        if (!account) {
            onClose()
            addNotification({
                type: "Errored",
                message: "Please Connect your wallet first"
            })
            return;
        }
        if (!showBuyOption) {
            setShowBuyOption(true)
            return;
        } 
    };

    const handleRemoveClick = () => {
        
    };

    const handleUpdatePrice = () => {
        if (!showUpdatePriceOption) {
            setShowUpdatePriceOption(true)
        }
    };

    return (
        <ContainerOverlay onClick={onClose}>
            <Container onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-row justify-center items-start">
                    <div>
                        <ReactPlayer
                            url={`https://gateway.pinata.cloud/ipfs/${content.media}`} controls
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
                        <p>By {content.author}</p>
                        <ArtDescription>{content.description}</ArtDescription>
                        <ButtonContainer>
                            
                        
                                <div className="flex flex-col items-start w-full">
                                    {account?.address != content.author ?
                                        <>
                                            {showBuyOption && <div className="flex flex-row w-full justify-center items-center my-2">
                                                <div className={`flex flex-col items-center justify-start p-3 border-blue-400 border rounded-xl hover:bg-green-400`} onClick={() => { }}>
                                                    <p>100 days</p>
                                                    <p>99 PHA</p>
                                                </div>
                                            </div>}

                                            <Button color="#28a745" onClick={handleBuyClick}>
                                                Buy
                                            </Button>
                                        </>
                                        : (
                                            <>
                                            {showUpdatePriceOption && (
                                                <div className="flex flex-col w-full justify-center items-start my-2">
                                                <div className={`flex flex-row items-center justify-start p-3 border-blue-400 border rounded-xl hover:bg-blue-300`} onClick={() => { }}>
                                                    <div className="flex flex-row justify-start items-center">
                                                        <p>Day: </p>
                                                        <input type="number" name="" id="" value={100} className="w-full mx-1 my-0.5 p-0.5 text-center rounded-xl"/>
                                                    </div>
                                                    <div className="flex flex-row justify-start items-center">
                                                        <p>Price: </p>
                                                        <input type="number" name="" id="" value={99} className="w-full mx-1 my-0.5 p-0.5 text-center rounded-xl"/>
                                                    </div>
                                                </div>
                                            </div>
                                            )}
                                                <Button color="#28a745" onClick={handleUpdatePrice}>
                                                Update Price
                                            </Button>
                                            </>
                                        )
                                    }
                                </div>
                       
                        </ButtonContainer>

                        {/* modal */}
                        {isModalOpen && (
                            <ModalOverlay onClick={handleModalClose}>
                                <ModalContent onClick={(e) => e.stopPropagation()}>
                                    <p>Price:</p>
                                    <input
                                        style={{
                                            width: "100%",
                                            marginBottom: 5,
                                            marginTop: 5,
                                            height: 50,
                                            border: "solid thin black",
                                            padding: 5,
                                        }}
                                        type="text"
                                        value={updatedPrice}
                                        onChange={(e) => setUpdatedPrice(e.target.value)}
                                    />

                                    <Button color="#28a745" onClick={handleUpdatePrice}>
                                        Confirm
                                    </Button>

                                </ModalContent>
                            </ModalOverlay>
                        )}
                    </div>
                </div>
                <div className="flex flex-wrap flex-row items-center justify-center overflow-auto" style={{
                    width: 1000,
                    maxHeight: 400
                }}>
                    <LicenseCard
                        license={{
                            contentId: 99991123,
                            user: "0x12321421321lk3lk12j3123123123213123213213123123",
                            startDate: 12312321323130,
                            endDate: 12319321323130,
                            review: {
                                detail: "good",
                                star: Star.One
                            }
                        }}
                        setLicenseToShow={function (license: License): void {
                            throw new Error("Function not implemented.");
                        }} />

                    <LicenseCard
                        license={{
                            contentId: 99991123,
                            user: "0x12321421321lk3lk12j3123123123213123213213123123",
                            startDate: 12312321323130,
                            endDate: 12319321323130,
                            review: {
                                detail: "good",
                                star: Star.One
                            }
                        }}
                        setLicenseToShow={function (license: License): void {
                            throw new Error("Function not implemented.");
                        }} />

                    <LicenseCard
                        license={{
                            contentId: 99991123,
                            user: "0x12321421321lk3lk12j3123123123213123213213123123",
                            startDate: 12312321323130,
                            endDate: 12319321323130,
                            review: {
                                detail: "good",
                                star: Star.One
                            }
                        }}
                        setLicenseToShow={function (license: License): void {
                            throw new Error("Function not implemented.");
                        }} />

                    <LicenseCard
                        license={{
                            contentId: 99991123,
                            user: "0x12321421321lk3lk12j3123123123213123213213123123",
                            startDate: 12312321323130,
                            endDate: 12319321323130,
                            review: {
                                detail: "good",
                                star: Star.One
                            }
                        }}
                        setLicenseToShow={function (license: License): void {
                            throw new Error("Function not implemented.");
                        }} />

                    <LicenseCard
                        license={{
                            contentId: 99991123,
                            user: "0x12321421321lk3lk12j3123123123213123213213123123",
                            startDate: 12312321323130,
                            endDate: 12319321323130,
                            review: {
                                detail: "good",
                                star: Star.One
                            }
                        }}
                        setLicenseToShow={function (license: License): void {
                            throw new Error("Function not implemented.");
                        }} />

                    <LicenseCard
                        license={{
                            contentId: 99991123,
                            user: "0x12321421321lk3lk12j3123123123213123213213123123",
                            startDate: 12312321323130,
                            endDate: 12319321323130,
                            review: {
                                detail: "good",
                                star: Star.One
                            }
                        }}
                        setLicenseToShow={function (license: License): void {
                            throw new Error("Function not implemented.");
                        }} />

                    <LicenseCard
                        license={{
                            contentId: 99991123,
                            user: "0x12321421321lk3lk12j3123123123213123213213123123",
                            startDate: 12312321323130,
                            endDate: 12319321323130,
                            review: {
                                detail: "good",
                                star: Star.One
                            }
                        }}
                        setLicenseToShow={function (license: License): void {
                            throw new Error("Function not implemented.");
                        }} />
                </div>
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