import styled from 'styled-components';

export const UserContent: React.FC = () => {
  return (
    <section className='w-full mx-auto'>
      
      <ContentGrid >
        
      </ContentGrid>
    </section>
  );
};

const ContentGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: row;
`;
