import React, { useState, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { Plus } from 'lucide-react';

interface QuickAddInputProps {
  onAdd: (title: string) => void;
  placeholder?: string;
}

const Container = styled.div`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows.quickAdd};
  transition: all ${({ theme }) => theme.transitions.base};
  border: 2px solid transparent;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 4px 12px 0 rgba(0, 82, 255, 0.15);
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 20px;
  color: ${({ theme }) => theme.colors.textTertiary};
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 16px 20px;
  padding-left: 12px;
  border: none;
  background: transparent;
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
  }
`;

export const QuickAddInput: React.FC<QuickAddInputProps> = ({
  onAdd,
  placeholder = 'Add a new task...',
}) => {
  const [value, setValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim()) {
      onAdd(value.trim());
      setValue('');
    }
  };

  return (
    <Container>
      <InputWrapper>
        <IconContainer>
          <Plus size={20} />
        </IconContainer>
        <StyledInput
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus
        />
      </InputWrapper>
    </Container>
  );
};
