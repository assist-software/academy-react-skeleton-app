import { useRef } from 'react'
import { MenuItem } from 'primereact/menuitem'
import { Menu } from 'primereact/menu'
import { ButtonProps } from 'primereact/button'

import { ActionButton } from './action-button'

interface MoreActionsButtonProps {
  buttonProps?: ButtonProps
  menuModel: MenuItem[]
}

export const MoreActionsButton = ({ buttonProps = {}, menuModel }: MoreActionsButtonProps) => {
  const menuRef = useRef<Menu>(null)

  return (
    <>
      <Menu model={menuModel} ref={menuRef} popup className='more-actions-button__menu' />

      <ActionButton
        icon='pi pi-ellipsis-h'
        {...buttonProps}
        onClick={(event) => {
          if (menuRef && menuRef.current) {
            menuRef.current.toggle(event)
          }
        }}
      />
    </>
  )
}
