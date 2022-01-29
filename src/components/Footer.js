import React from 'react'
import styled from 'styled-components'
import Color from '../utils/Colors'

const Container = styled.div`
  width: 100%;
  height: 12vh;
  position: absolute;
  bottom: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  border-top: 2px solid ${Color.Border};
`

const Text = styled.p`
  margin: 2px;
  font-size: 0.8rem;
  font-family: "Trebuchet MS", Verdana, sans-serif;
  color: ${Color.Emphasize};
`

class Footer extends React.Component {
  render() {
    return (
      <Container>
        <Text>Made with ♥ in Melbourne.</Text>
        <Text>© 2022 Broccoli &amp; Co. All rights reserved.</Text>
        <Text> Made by Aucdmn(Du Maohan) 😊 </Text>
      </Container>
    )
  }
}

export default Footer