import styled from 'styled-components';

export const KairosInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.kairosOffWhite};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.2s ease-in-out;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.kairosAzul};
    background-color: white;
    box-shadow: 0 0 0 3px rgba(0, 82, 255, 0.1);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`;

export const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  margin-top: 4px;
`;
