import React from 'react'
import styled from 'styled-components'
import Modal from '../utils/Modal'
import Button from '../utils/Button'
import Color from '../utils/Colors'


const PromptMessage = styled.p`
  margin: 0px 25px 15px 25px;
  width: 27vw;
  max-width: 315px;
  min-width: 250px;
  font-size: 13px;
  font-family: "Trebuchet MS", Verdana, sans-serif;
  text-align: center;
  color: ${Color.Error};

  @media screen and ( max-width: 400px ) {
    margin: 0px 5px 15px 5px;
  }
`

const BackButton = styled(Button)`
  width: 27vw;
  height: 35px;
  padding: 5px;
  margin-top: 40px;
  margin-bottom: 25px;
  max-width: 315px;
  min-width: 250px;
`

export default class ErrorModal extends React.Component {
  constructor(props){
    super(props)
    this.handleBack = this.handleBack.bind(this)
  }

  handleBack() {
    this.props.dismissModal()
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        title='Error ❌'
      >
        <PromptMessage>😥 Oops! The server responds an Error.</PromptMessage>
        <BackButton onClick={this.handleBack}>Back</BackButton>
      </Modal>
    )
  }
}
