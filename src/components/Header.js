import React from 'react'
import styled from 'styled-components'
import Color from '../utils/Colors'
import broccoliIcon from '../assets/img/broccoli.png'

const Container = styled.div`
  width: 100%;
  height: 12vh;
  position: absolute;
  top: 0;
  flex-direction: row;
  align-items: center;
  display: flex;
  border-bottom: 2px solid ${Color.Border};
`

const Icon = styled.img`
  margin-left: 5vw;
  width: 3vh;
  height: 3vh;
`

const Home = styled.a`
  margin-left: 1vw;
  text-decoration: none;
  font-size: 3vh;
  font-family: "Trebuchet MS", Verdana, sans-serif;
  font-weight: bolder;
  color: ${Color.Emphasize};
`

class Header extends React.Component {
  render() {
    return (
      <Container>
        <a href='/'>
          <Icon src={broccoliIcon} />
        </a>
        <Home href='/'>BROCCOLI &amp; CO.</Home>
      </Container>
    )
  }
}

export default Header