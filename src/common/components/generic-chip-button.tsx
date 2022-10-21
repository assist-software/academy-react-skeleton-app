import styled from 'styled-components'
import classNames from 'classnames'
import { Button, ButtonProps } from 'primereact/button'

export const GenericChipButton = (props: ButtonProps) => {
  return <StyledButton {...props} className={classNames('p-button-outlined', props.className)} />
}

const StyledButton = styled(Button)`
  font-size: 14px;
  padding: 5px 10px;

  &.p-button-outlined {
    background-color: #fff;
    border: 1px solid #aaa;
  }

  .p-button-label {
    font-weight: 400;
  }

  .p-button-icon {
    font-size: 11px;
    font-weight: 700;
  }
`
