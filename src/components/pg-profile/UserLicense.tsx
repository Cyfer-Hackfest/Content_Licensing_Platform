import styled from 'styled-components';

export const UserLicense: React.FC = () => {
  return (
    <section className='w-full mx-auto'>
      
      <LicenseGrid >
        
      </LicenseGrid>
    </section>
  );
};

const LicenseGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: row;
`;
