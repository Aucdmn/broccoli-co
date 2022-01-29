import React from 'react'
import { cleanup, render, fireEvent, screen } from '@testing-library/react'
import axiosMock from '../../__mocks__/axios'
import App from './App'

function setInputValue(input, value) {
  fireEvent.change(input, {
    target: { value: value }
  })
}

afterEach(() => {
  cleanup()
  axiosMock.post.mockClear()
})

// 测试：点击 'Request an invite'时，应该弹出 Modal 模态框
test('Request invite modal should be opened when button is clicked', () => {
  const { getByText, getByPlaceholderText } = render(<App />)

  fireEvent.click(getByText('Request an invite'))

  getByPlaceholderText('Full name')
  getByPlaceholderText('Email')
  getByPlaceholderText('Confirm Email')
  getByText('Send')
})

// 测试：当 输入有错误（不匹配对应规则）时，应该有错误校验提醒
test('Input error messages should be displayed', () => {
  const { getByText, getByPlaceholderText } = render(<App />)

  fireEvent.click(getByText('Request an invite'))

  setInputValue(getByPlaceholderText('Full name'), 'du')
  setInputValue(getByPlaceholderText('Email'), 'dumaohanicloud.com')
  setInputValue(getByPlaceholderText('Confirm Email'), 'dumaohan@icloud.com')

  fireEvent.click(getByText('Send'))

  getByText(':( The FULL NAME needs to be at least 3 characters long!')
  getByText(':( The EMAIL needs to be in validation email format!')
  getByText(':( The CONFIRM EMAIL needs to match the EMAIL!')
})

// 测试：当输入（三个输入框）均校验成功且请求成功时，应该弹出 'All done ✔️' 的成功状态 Modal模态框
test('When Validation passed, and request successfully', async () => {
  const { getByText, getByPlaceholderText } = render(<App />)

  fireEvent.click(getByText('Request an invite'))

  setInputValue(getByPlaceholderText('Full name'), '杜茂涵')
  setInputValue(getByPlaceholderText('Email'), 'audmhltd@gmail.com')
  setInputValue(getByPlaceholderText('Confirm Email'), 'audmhltd@gmail.com')

  axiosMock.post.mockResolvedValueOnce({ status: 200 })

  const sendButton = getByText('Send')

  fireEvent.click(sendButton)

  getByText('Sending, please wait...')

  await screen.findByText('All done ✔️')

  await screen.findByText('OK')
})

// 测试：当输入（三个输入框）均校验成功但请求失败时（请求PRD中所述的测试邮箱：usedemail@airwallex.com时），应该弹出 'Error ❌' 的失败状态 Modal模态框且在原表单页面显示后台返回的错误信息
test('When Validation passed, but request wrongly', async () => {
  const { getByText, getByPlaceholderText, queryByText } = render(<App />)

  fireEvent.click(getByText('Request an invite'))

  setInputValue(getByPlaceholderText('Full name'), '杜茂涵')
  setInputValue(getByPlaceholderText('Email'), 'usedemail@airwallex.com')
  setInputValue(getByPlaceholderText('Confirm Email'), 'usedemail@airwallex.com')

  axiosMock.post.mockResolvedValueOnce({
    status: 400,
    data: {
      errorMessage: 'Real bad request'
    }
  })

  const sendButton = getByText('Send')

  fireEvent.click(sendButton)

  await screen.findByText('Error ❌')

  screen.findByText('Real bad request')
})
