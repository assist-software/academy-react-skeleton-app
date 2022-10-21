import styled from 'styled-components'
import { InputText, InputTextProps } from 'primereact/inputtext'

export const GenericChipInputText = (props: InputTextProps) => {
  return <StyledInputText {...props} />
}

const StyledInputText = styled(InputText)`
  border: 1px solid #aaa;
  border-radius: 20px;
  font-size: 14px;
  padding: 5px 10px;
`
