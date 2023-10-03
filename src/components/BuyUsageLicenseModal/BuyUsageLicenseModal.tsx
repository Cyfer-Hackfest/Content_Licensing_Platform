import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { TokenMetadata } from "../../types";
import { useTx, useWallet } from "useink";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../context";
import { CreateContentRequest } from "../../types/request";

const NEXT_PUBLIC_PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT

interface BuyUsageLicenseModalProps {
    isOpen: boolean;
    onClose: () => void;
    action: 'update' | "create",
    data?: TokenMetadata
}

const BuyUsageLicenseModal: React.FC<BuyUsageLicenseModalProps> = ({
    isOpen,
    onClose,
    action,
    data
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

    const tx = useTx<CreateContentRequest>(contract, '');


    useEffect(() => {
      if (data) {
        setMetadata(data)
      }
    }, [])
    
    useEffect(() => {
        if (account) {
            setReceiverId(account.toString());
        }
    }, [account]);


    const handleReceiverIdChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setReceiverId(event.target.value);
    };

    const handleSubmit = async () => {
        tx.signAndSend([])
        
        onClose();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <ModalOverlay>
            <ModalContent>
                <Title>Work Of Art</Title>
                <Input
                    type="text"
                    placeholder="Author"
                    value={receiverId}
                    onChange={handleReceiverIdChange}
                />
                
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
                        Confirm
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

export default BuyUsageLicenseModal;

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
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
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
  font-size: 30px;
`;
