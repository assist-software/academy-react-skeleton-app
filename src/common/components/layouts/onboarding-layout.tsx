import styled from 'styled-components'

import { ChildrenNode } from 'common/types/props.types'
import pankoLogo from 'assets/images/panko-logo.png'

interface OnboardingLayoutProps extends ChildrenNode {
  asideElement?: JSX.Element
}

export const OnboardingLayout = ({ children, asideElement }: OnboardingLayoutProps) => {
  return (
    <StyledDiv className='fixed h-screen w-screen top-0 left-0 overflow-auto p-3'>
      <div className='text-center mt-3 mb-7'>
        <img src={pankoLogo} alt='Panko logo' />
      </div>

      <div className='grid grid-nogutter'>
        <div className='col-12 md:col-6 md:col-offset-3 lg:col-4 lg:col-offset-4 pt-5 px-6 pb-6'>
          {children}
        </div>
        <div className='col-12 md:col-6 md:col-offset-3 lg:col-4 lg:col-offset-4 mt-5'>
          {asideElement}
        </div>
      </div>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  background-color: #e0edef;

  .grid {
    & > div:first-of-type {
      background-color: #fcfcfd;
      border: 1px solid #dcdfe5;
      border-radius: 8px;
      box-shadow: 0px 4px 6px rgba(15, 15, 77, 0.04);

      h1 {
        color: #111111;
      }

      label {
        color: #0e082b;
        font-size: 16px;
      }

      .p-inputtext {
        font-size: 16px;
      }
    }
    & > div:last-of-type {
      font-size: 13.75px;
    }
  }
`
