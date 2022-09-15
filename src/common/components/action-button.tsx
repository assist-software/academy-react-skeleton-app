import styled from 'styled-components'
import classNames from 'classnames'
import { Button, ButtonProps } from 'primereact/button'

export const ActionButton = (props: ButtonProps) => {
  return <StyledButton {...props} className={classNames('p-button-rounded', props.className)} />
}

const StyledButton = styled(Button)`
  &.p-button-icon-only.p-button-rounded {
    background-color: #f3f4f5;
    border: 0;
    color: #aaa;
    height: 24px;
    width: 24px;

    :hover {
      background: rgba(56, 170, 187, 0.16);
      color: #38aabb;
    }
  }
`
