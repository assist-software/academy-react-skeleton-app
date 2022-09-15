import { HTMLAttributes } from 'react'
import styled from 'styled-components'
import { MenuItem } from 'primereact/menuitem'

import { removeObjectKeys } from 'common/services/utils.service'
import { MoreActionsButton } from './more-actions-button'

interface GenericChipProps extends HTMLAttributes<HTMLElement> {
  label: string
  menuModel: MenuItem[]
}

export const GenericChip = (props: GenericChipProps) => {
  const htmlProps = removeObjectKeys(props, ['label', 'menuModel'])

  return (
    <StyledDiv {...htmlProps}>
      <span className='mr-2'>{props.label}</span>
      <MoreActionsButton menuModel={props.menuModel} />
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  align-items: center;
  border: 1px solid #aaa;
  border-radius: 20px;
  color: #000;
  display: inline-flex;
  font-size: 14px;
  padding: 5px 10px;

  .p-button.p-button-icon-only.p-button-rounded {
    height: 14px;
    padding: 0;
    width: 14px;

    .pi {
      font-size: 9px;
    }
  }
`
