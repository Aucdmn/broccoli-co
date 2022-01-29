import React from 'react'
import styled from 'styled-components'
import Button from '../utils/Button'
import InviteModal from './InviteModal'
import SuccessModal from './SuccessModal'
import ErrorModal from './ErrorModal'
import Color from '../utils/Colors'

const Container = styled.div`
  flex: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100vw;
`

const Heading = styled.h1`
  max-width: 90vw;
  font-size: 3rem;
  font-family: "Trebuchet MS", Verdana, sans-serif;
  font-weight: bolder;
  text-align: center;
  color: ${Color.Emphasize};
`

const Text = styled.p`
  margin: 2rem;
  max-width: 90vw;
  font-size: 1rem;
  font-family: "Trebuchet MS", Verdana, sans-serif;
  letter-spacing: 3px;
  text-align: center;
  color: ${Color.Secondary};
`

const InviteButton = styled(Button)`
  padding: 15px;
  font-size: 1rem;
`

class Body extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      inviteModalVisible: false,
      successModalVisible: false,
      errorModalVisible: false
    }
    this.showInviteModal = this.showInviteModal.bind(this)
    this.showSuccessModal = this.showSuccessModal.bind(this)
    this.showErrorModal = this.showErrorModal.bind(this)
    this.dismissInviteModal = this.dismissInviteModal.bind(this)
    this.dismissSuccessModal = this.dismissSuccessModal.bind(this)
    this.dismissErrorModal = this.dismissErrorModal.bind(this)
  }

  // 以下三个函数控制展示 InviteModal、SuccessModal、ErrorModal 展示与否
  showInviteModal() {
    this.setState({
      inviteModalVisible: true
    })
  }

  showSuccessModal() {
    this.setState({
      successModalVisible: true
    })
  }

  showErrorModal() {
    this.setState({
      errorModalVisible: true
    })
  }

  // 以下三个函数控制关闭 InviteModal、SuccessModal、ErrorModal
  dismissInviteModal() {
    this.setState({
      inviteModalVisible: false
    })
  }

  dismissSuccessModal() {
    this.setState({
      successModalVisible: false
    })
  }

  dismissErrorModal() {
    this.setState({
      errorModalVisible: false
    })
  }

  render() {
    return (
      <Container>
        <Heading>A better way</Heading>
        <Heading>to enjoy every day.</Heading>
        <Text>Be the first to know when we launch.</Text>
        <InviteButton onClick={this.showInviteModal}>Request an invite now</InviteButton>
        
        <InviteModal
          visible={this.state.inviteModalVisible}
          dismissModal={this.dismissInviteModal}
          showSuccessModal={this.showSuccessModal}
          showErrorModal={this.showErrorModal}
        />
        <SuccessModal
          visible={this.state.successModalVisible}
          dismissModal={this.dismissSuccessModal}
        />
        <ErrorModal
          visible={this.state.errorModalVisible}
          dismissModal={this.dismissErrorModal}
        />
      </Container>
    )
  }
}

export default Body