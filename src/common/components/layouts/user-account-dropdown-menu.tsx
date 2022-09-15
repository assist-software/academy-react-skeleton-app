import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Avatar } from 'primereact/avatar'

import { getAuthUserData } from 'common/services/auth.service'
import { OnboardingSignOutWrapper } from 'features/onboarding/components/onboarding-sign-out-wrapper'

export const UserAccountDropdownMenu = () => {
  const [optionsCollapsed, setOptionsCollapsed] = useState(true)

  const toggleOptionsCollapsedHandler = (): void => {
    setOptionsCollapsed(!optionsCollapsed)
  }

  const userData = getAuthUserData()
  const userNameFirstLetter = userData ? userData.name[0] : ''

  return (
    <StyledDiv className='relative'>
      <div
        className='flex align-items-center cursor-pointer'
        onClick={toggleOptionsCollapsedHandler}>
        <Avatar label={userNameFirstLetter} shape='circle' />

        <div
          className={`user-account-dropdown-menu__button-arrow ${
            optionsCollapsed
              ? 'user-account-dropdown-menu__button--arrow-down'
              : 'user-account-dropdown-menu__button--arrow-up'
          }`}
        />
      </div>

      <div className={`user-account-dropdown-menu__options ${optionsCollapsed ? 'hidden' : ''}`}>
        <ul>
          <li>
            <Link to='/settings'>Settings</Link>
          </li>

          <li>
            <OnboardingSignOutWrapper>
              <p>Sign out</p>
            </OnboardingSignOutWrapper>
          </li>
        </ul>
      </div>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  .p-avatar {
    background-color: #fff;
    color: #313131;
  }

  .user-account-dropdown-menu__button-arrow {
    border-color: #d9d9d9;
    border-style: solid;
    border-width: 0 1px 1px 0;
    margin-left: 10px;
    padding: 3.5px;
    transition: transform 0.3s;

    &.user-account-dropdown-menu__button--arrow-down {
      transform: rotate(45deg);
    }

    &.user-account-dropdown-menu__button--arrow-up {
      transform: rotate(-135deg);
    }
  }

  .user-account-dropdown-menu__options {
    background-color: #fff;
    border: 2px solid #eee;
    border-radius: 6px;
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.05);
    color: #111111;
    height: 100px;
    right: -10px;
    padding: 20px;
    position: absolute;
    top: 40px;
    width: 195px;
    z-index: 1;

    ul {
      list-style-type: none;

      li {
        padding-bottom: 10px;

        a {
          color: #111111;
        }
      }
    }
  }
`
