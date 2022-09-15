import styled from 'styled-components'

import { ChildrenNode } from 'common/types/props.types'
import { UserAccountDropdownMenu } from './user-account-dropdown-menu'
import pankoLogo from 'assets/images/panko-logo-reversed.png'

export const MainLayout = ({ children }: ChildrenNode) => {
  return (
    <StyledDiv className='fixed h-screen w-screen top-0 left-0 overflow-auto'>
      <div className='flex justify-content-between py-3 px-4'>
        <img src={pankoLogo} alt='Panko logo' />
        <UserAccountDropdownMenu />
      </div>
      <div className='p-5'>{children}</div>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  background-color: #f5f5f5;

  & > div:first-of-type {
    background-color: #234b44;
  }

  h1 {
    color: #234b44;
  }
`
