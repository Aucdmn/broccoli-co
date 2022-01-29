import styled from 'styled-components'
import Color from './Colors'

const Input = styled.input`
  transition: 0.3s;
	box-sizing: border-box;
  margin: 5px 0;
  border: 2px solid ${Color.Border};
  border-radius: 0;
  width: 27vw;
  max-width: 315px;
  min-width: 250px;
  height: 35px;
  padding: 5px;
  outline: none;
  font-family: "Trebuchet MS", Verdana, sans-serif;
  background-color: white;

  &.error {
    border-color: ${Color.Error};
    box-shadow: ${Color.Error};
  }

  &:hover, :focus {
    border-color: ${Color.Border};
    background-color: rgba(1, 1, 1, 0.05);
  }
`

export default Input