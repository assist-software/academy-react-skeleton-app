import styled from 'styled-components'
import { SelectButton, SelectButtonProps } from 'primereact/selectbutton'

export const GenericSelectButton = (props: SelectButtonProps) => {
  return <StyledSelectButton {...props} />
}

const StyledSelectButton = styled(SelectButton)`
  .p-button {
    border: 1px solid #767676;
    border-radius: 8px;
    color: #111;
    font-size: 20px;
    height: 95px;
    margin: 5px 10px 5px 0;
    width: 170px;

    &:last-of-type {
      margin-right: 0;
    }

    &:not(:last-child) {
      border: 1px solid #767676;
    }

    &:not(:first-of-type):not(:last-of-type) {
      border-radius: 8px;
    }

    &:first-of-type,
    &:last-of-type {
      border-radius: 8px;
    }

    &.p-highlight {
      background-color: #fff;
      border: 2px solid #38aabb;
      color: #38aabb;
    }
  }

  &.p-invalid {
    .p-button {
      border-color: #e24c4c;
    }
  }
`
