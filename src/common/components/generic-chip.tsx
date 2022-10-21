import styled from 'styled-components'
import { Chip, ChipProps } from 'primereact/chip'

export const GenericChip = (props: ChipProps) => {
  return <StyledChip {...props} />
}

const StyledChip = styled(Chip)`
  background-color: #fff;
  border: 1px solid #aaa;
  border-radius: 20px;
  color: #000;
  font-size: 14px;
  padding: 5px 10px;

  .p-chip-text {
    margin-bottom: 0;
    margin-top: 0;
  }

  .p-chip-remove-icon {
    color: #b5b5b5;
    font-size: 14px;

    &::before {
      content: '✕';
    }
  }
`
