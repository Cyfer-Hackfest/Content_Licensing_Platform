import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { TokenMetadata } from "../../types";
import { useTx, useWallet } from "useink";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../context";
import { CreateContentRequest } from "../../types/request";

const NEXT_PUBLIC_PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT

interface CreateModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateModal: React.FC<CreateModalProps> = ({
    isOpen,
    onClose,
}) => {
    const { account } = useWallet()
    const {contract} = useAppSelector(state => state.app_state);
    const [receiverId, setReceiverId] = useState<string | undefined>(undefined);
    const [metadata, setMetadata] = useState<TokenMetadata>({
        title: "",
        description: "",
        avt: "",
        media: ""
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const tx = useTx<CreateContentRequest>(contract, '');
    
    useEffect(() => {
        if (account) {
            setReceiverId(account.address.toString());
        }
    }, [account]);


    const handleReceiverIdChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setReceiverId(event.target.value);
    };

    const handleMetadataChange = (field: keyof TokenMetadata, value: string) => {
        setMetadata((prevMetadata) => ({ ...prevMetadata, [field]: value }));
    };

    const handleSubmit = async () => {
        tx.signAndSend([])
        
        onClose();
    };

    const handleMediaUpload = async (
        event: React.ChangeEvent<HTMLInputElement>,
        field: keyof TokenMetadata
    ) => {
        const file = event?.target.files[0]; // Get the selected file
        if (!file) return;

        setIsLoading(true);
        const formData = new FormData();

        formData.append("file", file);

        const options = JSON.stringify({
            cidVersion: 0,
        });
        formData.append("pinataOptions", options);

        try {
            const res = await axios.post(
                "https://api.pinata.cloud/pinning/pinFileToIPFS",
                formData,
                {
                    maxBodyLength: "Infinity",
                    headers: {
                        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                        Authorization: `Bearer ${NEXT_PUBLIC_PINATA_JWT}`,
                    },
                }
            );
            handleMetadataChange(field, res.data.IpfsHash);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <Title>New Content</Title>

                <p>Author</p>
                <Input
                    type="text"
                    placeholder="Enter Author here"
                    value={receiverId}
                    onChange={handleReceiverIdChange}
                />

                <p>Title</p>
                {/* Input fields for metadata */}
                <Input
                    type="text"
                    placeholder="Enter Title here"
                    value={metadata.title || ""}
                    onChange={(e) => handleMetadataChange("title", e.target.value)}
                />

                <p>Description</p>
                <Input
                    type="text"
                    placeholder="Enter Description here"
                    value={metadata.description || ""}
                    onChange={(e) => handleMetadataChange("description", e.target.value)}
                />

                <p>Avatar</p>
                <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleMediaUpload(e, "avt")}
                    placeholder="AVT"
                />
                {metadata.avt && (
                    <img
                        src={`https://gateway.pinata.cloud/ipfs/${metadata.avt}`}
                        width={50}
                        height={50}
                        style={{
                            margin: 5,
                        }}
                    />
                )}

                <p>Media</p>
                <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleMediaUpload(e, "media")}
                    placeholder="Media"
                />
                {metadata.media && (
                    <img
                        src={`https://gateway.pinata.cloud/ipfs/${metadata.media}`}
                        width={50}
                        height={50}
                        style={{
                            margin: 5,
                        }}
                    />
                )}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                    }}>
                    <Button
                        onClick={handleSubmit}
                        style={{
                            backgroundColor: "blue",
                        }}>
                        POST
                    </Button>
                    <Button
                        onClick={onClose}
                        style={{
                            backgroundColor: "red",
                        }}>
                        Cancel
                    </Button>
                </div>
            </ModalContent>
        </ModalOverlay>
    );
};

export default CreateModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  z-index: 20;
  color: black;
`;

const Input = styled.input`
  padding: 10px;
  margin: 5px;
  width: 100%;
  border: solid thin blue;
`;

const Button = styled.button`
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 12px;
  cursor: pointer;
  margin: 5px;

  :hover {
    background-color: blue;
  }
`;

const Title = styled.h1`
  color: black;
  font-size: 30px;
`;
