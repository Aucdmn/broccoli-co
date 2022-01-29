import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Modal from '../utils/Modal'
import Input from '../utils/Input'
import Button from '../utils/Button'
import Color from '../utils/Colors'

const SendButton = styled(Button)`
  margin-top: 35px;
  width: 27vw;
  max-width: 315px;
  min-width: 250px;
  height: 35px;
  padding: 5px;
  font-weight: bolder;

  &.disable {
    color: grey;
  }

  @media screen and ( max-height: 400px ) {
    margin-top: 15px;
  }
`

const NameError = styled.p`
  display: ${props => props.visible ? 'none' : ''};
  margin-top: 2px;
  margin-bottom: 4px;
  font-size: 6px;
  font-family: "Trebuchet MS", Verdana, sans-serif;
  font-weight: bolder;
  color: ${Color.Error};
  transition: 0.5s ease-in-out;
`

const EmailError = styled.p`
  display: ${props => props.visible ? 'none' : ''};
  margin-top: 2px;
  margin-bottom: 4px;
  font-size: 6px;
  font-family: "Trebuchet MS", Verdana, sans-serif;
  font-weight: bolder;
  color: ${Color.Error};
  transition: 0.5s ease-in-out;
`

const ErrorMessage = styled.p`
  visibility: ${props => props.visible ? 'hidden' : 'visible'};
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 13px;
  font-family: "Trebuchet MS", Verdana, sans-serif;
  font-weight: bolder;
  color: ${Color.Error};
  transition: 0.5s ease-in-out;
`

class InviteModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      fullName: '',
      email: '',
      confirmEmail: '',

      nameErrorMessage: 'FULL NAME needs to be at least 3 characters long!', // PRD要求原文
      nameErrorDisabled: true,

      emailErrorMessage: 'EMAIL needs to be in validation email format!', // PRD要求原文
      emailErrorDiasbled: true,

      confirmEmailErrorMessage: 'CONFIRM EMAIL needs to match the EMAIL!', // PRD要求原文
      confirmEmailErrorDisabled: true,

      fullNameValid: true,
      emailValid: true,
      confirmEmailValid: true,

      sendButtonDisabled: false,

      errorMessage: 'Error message from server',
      errorDisabled: true
    }
    this.handleFocus = this.handleFocus.bind(this)
    this.handleSend = this.handleSend.bind(this)
  }

  handleFocus(e) {
    this.setState({
      [e.target.name + 'Valid']: true,
      errorDisabled: true
    })
  }

  handleNameChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      nameErrorDisabled: true
    })
  }

  handleEmailChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      emailErrorDiasbled: true
    })
  }

  handleConfirmEmailChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      confirmEmailErrorDisabled: true
    })
  }

  handleSend() {
    this.setState(
      Object.assign(this.state, {
        fullName: this.state.fullName.trim(),
        email: this.state.email.trim(),
        confirmEmail: this.state.confirmEmail.trim(),
        errorDisabled: true,
        nameErrorDisabled: true,
        emailErrorDiasbled: true,
        confirmEmailErrorDisabled: true
      })
    )
    if (this.state.fullName.length < 3) {
      this.setState(
        Object.assign(this.state, {
          fullNameValid: false,
          nameErrorDisabled: false
        })
      )
    }
    const emailRegex = new RegExp(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/) // 名称允许汉字、字母、数字，域名只允许英文域名
    if (this.state.email=== '' || !emailRegex.test(this.state.email)) {
      this.setState(
        Object.assign(this.state, {
          emailValid: false,
          emailErrorDiasbled: false
        })
      )
    }
    if (this.state.confirmEmail === '' || this.state.confirmEmail !== this.state.email) {
      this.setState(
        Object.assign(this.state, {
          confirmEmailValid: false,
          confirmEmailErrorDisabled: false
        })
      )
    }
    if (this.state.fullNameValid && this.state.emailValid && this.state.confirmEmailValid) {
      this.setState({
        sendButtonDisabled: true
      })
      axios({
        url: 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth',
        data: {
          name: this.state.fullName,
          email: this.state.email
        },
        method:'post'
      }).then(res => { // 请求成功，所有输入项清空，打开 SuccessModal
          this.setState({
            fullName: '',
            email: '',
            confirmEmail: '',
            sendButtonDisabled: false
          })
          this.props.dismissModal()
          this.props.showSuccessModal()
        }).catch(err => { // 请求失败，所有输入项保留（便于之后选择返回后，再进行操作），打开 ErrorModal，并展示后端返回错误信息
            this.setState({
              sendButtonDisabled: false,
              errorMessage: err.response.data.errorMessage,
              errorDisabled: false
            })
            this.props.showErrorModal()
          })
    }
  }

  render() {
    return (
      <Modal visible={this.props.visible} 
        dismissModal={this.props.dismissModal} 
        title='Request an invite'
      >
        <Input name='fullName'
          className={this.state.fullNameValid ? null : 'error'}
          value={this.state.fullName}
          onChange={(e) => this.handleNameChange(e)}
          onFocus={this.handleFocus}
          placeholder='Full name'
        />
        <NameError visible={this.state.nameErrorDisabled}>
          {this.state.nameErrorMessage}
        </NameError>

        <Input name='email'
          className={this.state.emailValid ? null : 'error'}
          value={this.state.email}
          onChange={(e) => this.handleEmailChange(e)}
          onFocus={this.handleFocus}
          placeholder='Email'
        />
        <EmailError visible={this.state.emailErrorDiasbled}>
          {this.state.emailErrorMessage}
        </EmailError>

        <Input name='confirmEmail'
          className={this.state.confirmEmailValid ? null : 'error'}
          value={this.state.confirmEmail}
          onChange={(e) => this.handleConfirmEmailChange(e)}
          onFocus={this.handleFocus}
          placeholder='Confirm Email'
        />
        <EmailError visible={this.state.confirmEmailErrorDisabled}>
          {this.state.confirmEmailErrorMessage}
        </EmailError>

        <SendButton onClick={this.handleSend}
          className={this.state.sendButtonDisabled ? 'disable' : null}
          disabled={this.state.sendButtonDisabled}
        >
          {this.state.sendButtonDisabled ? 'Sending, please wait...' : 'Send'}
        </SendButton>
        <ErrorMessage visible={this.state.errorDisabled}>
          {this.state.errorMessage}
        </ErrorMessage>
      </Modal>
    )
  }
}

export default InviteModal