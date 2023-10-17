import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { Content, ContentId, License, Payment } from "../../types";
import { useRouter } from "next/router";
import { milisecondsToDate, shorttenAddress, stringToNumber } from "../../utils";
import BuyPayment from "../ContentCard/BuyPayment";
import { PaymentOptionRequest } from "../../types/request";
import { ChainContract, useTx } from "useink";
import { useNotifications, useTxNotifications } from "useink/notifications";

interface ContentCardProps {
  license: License;
  isOwner: boolean;
  payment?: Payment;
  contract?: ChainContract
}

const LicenseCard: React.FC<ContentCardProps> = ({
  license,
  isOwner,
  payment,
  contract
}) => {
  const { addNotification } = useNotifications();

  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const tx = useTx(contract, 'licenseCore::extendUsageTime');
  useTxNotifications(tx);


  const handleExtend = async (op: PaymentOptionRequest) => {
    const { option1, option2, option3 } = payment;
        if (parseFloat(license.endDate) < new Date().getTime()) {
          addNotification({
            type: 'error',
            message: 'Your license is expired!'
          })
          return;
        }
        
        const opString: string = op == PaymentOptionRequest.Option1 ? "Option1" : op == PaymentOptionRequest.Option2 ? 'Option2' : 'Option3';
        
        let transfering_value: number | string | undefined = opString == 'Option1' ? option1?.price : opString == 'Option2' ? option2?.price : option3?.price;

        if (typeof transfering_value == 'string') {
            transfering_value = stringToNumber(transfering_value) ?? undefined;
        }
        if (transfering_value == undefined) return;
        
        tx.signAndSend([license.licenseId, opString], {
            value: transfering_value
        })
  }

  return (
    <CardContainer 
    >
      {isUpdating ? (
        <div>
          <BuyPayment onBuy={handleExtend} payment={payment} isExtending={true}/>
        </div>
      ) : (
        <>
          {isOwner && <IsAuthor><OwnerTitle onClick={() => setIsUpdating(true)}/></IsAuthor>}
          <Title className="my-2 text-center">Usage License</Title>
          <p className="my-2">by @{shorttenAddress(license.user, 6, 4)}</p>
          <p className="my-2">Start day: {milisecondsToDate(stringToNumber(license.startDate) ?? 0)}</p>
          <p className="my-2">Expired day: {milisecondsToDate(stringToNumber(license.endDate) ?? 0)}</p>
          <Description className="my-2">{license.review?.detail}</Description>
        </>
      )}
    </CardContainer>
  );
};

export default LicenseCard;

const CardContainer = styled.div`
  position: relative;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1em;
  margin: 0.5em;
  width: 300px;
  background-color: green;
`;

const Title = styled.h2`
  margin-top: 8px;
  font-size: 25px;
`;

const Description = styled.h4`
  margin-top: 8px;
`;

const IsAuthor = styled.div`
  background-color: blue;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 0;
`;

const OwnerTitle = styled.p`
  padding: 6px 8px;
  font-weight: bold;
  font-size: 0.8rem;
  &:before {
    content: 'Owned by you';
  }
  &:hover::before {
    content: 'Extend';
  }
`;