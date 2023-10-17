import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Payment, PaymentOption, TokenMetadata } from "../../types";
import { ChainContract, useTx, useWallet } from "useink";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../context";
import { CreateContentRequest } from "../../types/request";
import PaymentInputOption from "./PaymentInputOption";
import { useTxNotifications } from "useink/notifications";

const NEXT_PUBLIC_PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT

interface CreateModalProps {
    isOpen: boolean;
    onClose: () => void;
    contract: ChainContract
}

const CreateModal: React.FC<CreateModalProps> = ({
    isOpen,
    onClose,
    contract
}) => {
    const { account } = useWallet()
    const [receiverId, setReceiverId] = useState<string | undefined>(undefined);
    const [metadata, setMetadata] = useState<TokenMetadata>({
        name: "",
        description: "",
        avt: "",
        media: "",
    });
    const [payment, setPayment] = useState<Payment>({
        option1: {
            days: undefined,
            price: undefined
        },
        option2: {
            days: undefined,
            price: undefined
        },
        option3: {
            days: undefined,
            price: undefined
        },
    })
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const tx = useTx<CreateContentRequest>(contract, 'contentCore::createContent');
    useTxNotifications(tx);

    useEffect(() => {
        if (account) {
            setReceiverId(account.address.toString());
        }

    }, [account]);

    const handleOptionChange = (optionName: keyof typeof payment, newOption: PaymentOption) => {
        setPayment({ ...payment, [optionName]: newOption });
    };

    const handleReceiverIdChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setReceiverId(event.target.value);
    };

    const handleMetadataChange = (field: keyof TokenMetadata, value: string) => {
        setMetadata((prevMetadata) => ({ ...prevMetadata, [field]: value }));
    };

    const handleSubmit = async () => {
        const { name, avt, description, media } = metadata;
        const { option1, option2, option3 } = payment;
        console.log(payment);


        const op1 = option1.days && option1.price ? option1 : null;
        const op2 = option2.days && option2.price ? option2 : null;
        const op3 = option3.days && option3.price ? option3 : null;

        tx.signAndSend([name, avt, description, media, [op1, op2, op3]])

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

                <p>name</p>
                {/* Input fields for metadata */}
                <Input
                    type="text"
                    placeholder="Enter name here"
                    value={metadata.name || ""}
                    onChange={(e) => handleMetadataChange("name", e.target.value)}
                />

                <p>description</p>
                <Input
                    type="text"
                    placeholder="Enter description here"
                    value={metadata.description || ""}
                    onChange={(e) => handleMetadataChange("description", e.target.value)}
                />

                <p>Avatar {metadata.avt && "(uploaded)"}</p>
                <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleMediaUpload(e, "avt")}
                    placeholder="AVT"
                />

                <p>Media {metadata.media && "(uploaded)"}</p>
                <Input
                    type="file"
                    onChange={(e) => handleMediaUpload(e, "media")}
                    placeholder="Media"
                />


                <h2>Option 1:</h2>
                <PaymentInputOption option={payment.option1} onChange={(newOption) => handleOptionChange('option1', newOption)} placeHolder={{
                    day: '30',
                    price: '1'
                }} />

                <h2>Option 2:</h2>
                <PaymentInputOption option={payment.option2} onChange={(newOption) => handleOptionChange('option2', newOption)} placeHolder={{
                    day: '60',
                    price: '2'
                }} />

                <h2>Option 3:</h2>
                <PaymentInputOption option={payment.option3} onChange={(newOption) => handleOptionChange('option3', newOption)} placeHolder={{
                    day: '180',
                    price: '5'
                }} />



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
