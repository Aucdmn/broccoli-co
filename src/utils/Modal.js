import React from 'react'
import styled from 'styled-components'
import Color from './Colors'

const Mask = styled.div`
  position: absolute;
  justify-content: center;
  align-items: center;
  display: flex;
  opacity: ${props => props.visible ? 1 : 0};
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  transition: 0.3s ease-in-out;
  width: 100%;
  height: 100%;
  background-color: rgba(135, 135, 135, 0.4);
`

const Popup = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  opacity: ${props => props.visible ? 1 : 0};
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  transition: 0.3s ease-in-out;
  border: 2px solid ${Color.Border};
  padding: 25px 25px 20px 25px;
  background-color: white;

  @media screen and ( max-height: 400px ) {
    padding: 0 35px;
  }

  @media screen and ( max-width: 400px ) {
    padding: 0 25px;
  }
`

const Title = styled.p`
  margin-top: 25px;
  font-size: 16px;
  font-family: "Trebuchet MS", Verdana, sans-serif;
  font-weight: bolder;
  color: ${Color.Emphasize};
`

const Line = styled.hr`
  margin-top: 15px;
  margin-bottom: 40px;
  width: 30px;
  height: 1px;
  border: none;
  background-color: ${Color.Border};

  @media screen and ( max-height: 400px ) {
    margin-bottom: 15px;
  }
`

class Modal extends React.Component {
  constructor(props){
    super(props)
    this.dismissModal = this.dismissModal.bind(this)
  }

  dismissModal(e) {
    if (e.target === e.currentTarget) {
      this.props.dismissModal()
    }
  }

  render() {
    return (
      <Mask visible={this.props.visible} onClick={this.dismissModal}>
        <Popup visible={this.props.visible}>
          <Title>{this.props.title}</Title>
          <Line />
          {this.props.children}
        </Popup>
      </Mask>
    )
  }
}

export default Modal