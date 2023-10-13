import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { Content, ContentId, License } from "../../types";
import { useRouter } from "next/router";
import { milisecondsToDate, shorttenAddress, stringToNumber } from "../../utils";

interface ContentCardProps {
  license: License;
  // setLicenseToShow: (license: License) => void;
}

const LicenseCard: React.FC<ContentCardProps> = ({
  license,
  // setLicenseToShow,
}) => {

  return (
    <CardContainer 
    // onClick={() => setLicenseToShow(license)}
    >

      <Title className="mb-2 text-center">Usage License</Title>
      <p className="my-2">by @{shorttenAddress(license.user, 6, 4)}</p>
      <p className="my-2">Start day: {milisecondsToDate(stringToNumber(license.startDate) ?? 0)}</p>
      <p className="my-2">Expired day: {milisecondsToDate(stringToNumber(license.endDate) ?? 0)}</p>
      <Description className="my-2">{license.review?.detail}</Description>
    
    </CardContainer>
  );
};

export default LicenseCard;

const CardContainer = styled.div`
  position: relative;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0.5em;
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
