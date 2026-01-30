import styled from 'styled-components';

export const DailyLayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  background: white;
  position: relative;
  overflow: hidden;
`;

export const MainArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, rgba(0, 82, 255, 0.05) 0%, #FFFFFF 30%);
  padding: 40px;
  overflow-y: auto;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

export const Title = styled.h1`
  font-size: 2.25rem;
  color: ${({ theme }) => theme.colors.kairosCharcoal};
  font-weight: 700;
  margin: 0;
  
  span {
    color: ${({ theme }) => theme.colors.kairosAzul};
  }
`;

export const DateDisplay = styled.div`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.kairosSlateGray};
  font-weight: 500;
`;

export const BigThreeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 48px;
`;

export const OtherTasksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`;

export const SectionTitle = styled.h3`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 24px;
  text-align: center;
  font-weight: 500;
`;
