import styled from 'styled-components';

interface ButtonProps {
    $variant?: 'primary' | 'secondary' | 'outline';
    $fullWidth?: boolean;
}

export const KairosButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: ${({ theme }) => theme.typography.sizes.base};
  cursor: pointer;
  transition: all 0.2s ease;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  
  /* Primary Variant */
  background-color: ${({ theme, $variant }) =>
        $variant === 'outline' ? 'transparent' :
            $variant === 'secondary' ? theme.colors.kairosSlateGray :
                theme.colors.kairosAzul
    };
  
  color: ${({ theme, $variant }) =>
        $variant === 'outline' ? theme.colors.kairosAzul : 'white'
    };

  border: ${({ theme, $variant }) =>
        $variant === 'outline' ? `1px solid ${theme.colors.kairosAzul}` : 'none'
    };

  &:hover {
    background-color: ${({ theme, $variant }) =>
        $variant === 'outline' ? 'rgba(0, 82, 255, 0.05)' :
            $variant === 'secondary' ? theme.colors.text :
                '#0043D9' // Darker shade of Azul Kairos
    };
    transform: translateY(-1px);
    box-shadow: ${({ theme, $variant }) =>
        $variant === 'outline' ? 'none' : theme.shadows.md
    };
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;
