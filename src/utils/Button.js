import styled from 'styled-components'
import Color from './Colors'

const Button = styled.button`
  transition: 0.3s;
  border: none;
  font-family: "Trebuchet MS", Verdana, sans-serif;
  text-align: center;
  background-color: ${Color.Primary};
  color: white;

  &:hover {
    opacity: 0.8;
    transform: scale(1.1)
  }

  &:click {
    background-color: ${Color.primary};
    color: white;
  }
`

export default Button