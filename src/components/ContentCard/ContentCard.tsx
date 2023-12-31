import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { Content, ContentId } from "../../types";
import { useRouter } from "next/router";
import { shorttenAddress } from "../../utils";

interface ContentCardProps {
  content: Content;
  setContentToShow: (content: Content) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({
  content,
  setContentToShow,
}) => {
  
  return (
    <CardContainer onClick={() => setContentToShow(content)}>

      <Image
        src={`https://gateway.pinata.cloud/ipfs/${content.avt}`}
        alt={content.name}
      />
      <p>by @{shorttenAddress(content.author, 6, 4)}</p>
      <Title>{content.name}</Title>
      <Description>{content.description}</Description>
      {/* <Price>{content.royalty} *</Price> */}
    </CardContainer>
  );
};

export default ContentCard;

const CardContainer = styled.div`
  position: relative;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 2em;
  margin: 2em;
  width: 400px
`;

const Image = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

const Title = styled.h2`
  margin-top: 8px;
  font-size: 25px;
`;

const Description = styled.h4`
  margin-top: 8px;
`;
