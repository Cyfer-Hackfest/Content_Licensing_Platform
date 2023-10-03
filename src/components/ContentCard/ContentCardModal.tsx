import * as React from "react";
import { useRouter } from "next/router";
import styled from 'styled-components';
import { Content } from "../../types";
import { useWallet } from "useink";

interface ContentCardModalProps {
    content: Content;
    onClose: () => void;
}

const ContentCardModal: React.FC<ContentCardModalProps> = ({ content, onClose }) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [updatedPrice, setUpdatedPrice] = React.useState<string>('');
    const { account } = useWallet();


    const handleShowModal = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleBuyClick = async () => {

    };

    const handleRemoveClick = () => {

    };

    const handleUpdatePrice = () => {

    };

    return (
        <ContainerOverlay onClick={onClose}>
            <Container onClick={(e) => e.stopPropagation()}>
                <ArtImage
                    src={`https://gateway.pinata.cloud/ipfs/${content.avt}`}
                    alt={content.name}
                />
                <ArtTitle>{content.name}</ArtTitle>
                <p>By {content.author}</p>
                <ArtDescription>{content.description}</ArtDescription>
                <ButtonContainer>
                    {account?.address === content.author ? (
                        <>
                            <Button color="red" onClick={handleRemoveClick}>
                                Remove
                            </Button>
                            <Button
                                color="blue"
                                onClick={() => {
                                    handleShowModal();
                                }}>
                                Update
                            </Button>
                        </>
                    ) : (
                        <Button color="#28a745" onClick={handleBuyClick}>
                            Buy
                        </Button>
                    )}
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
`;

const Container = styled.div`
  border: 1px solid #ccc;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 600px;
  margin: 0 auto;
`;

const ArtImage = styled.img`
  height: 300px;
  width: auto;
  margin-bottom: 10px;
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