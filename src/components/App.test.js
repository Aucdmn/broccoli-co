import React from 'react'
import { cleanup, render } from '@testing-library/react'
import App from './App'

afterEach(cleanup);

// 测试：Header 部分文字是否正常渲染
test('Header is rendered', () => {
  const { getByText } = render(<App />)
  getByText(/BROCCOLI & CO./)
});

// 测试：Body 部分文字是否正常渲染
test('Body is rendered', () => {
  const { getByText } = render(<App />)
  getByText(/A better way/)
  getByText(/to enjoy every day./)
  getByText(/Be the first to know when we launch./)
  getByText(/Request an invite now/); // Should have multiple matches - 应该有多个匹配
});

// 测试：Footer 部分文字是否正常渲染
test('Footer is rendered', () => {
  const { getByText } = render(<App />)
  getByText(/All rights reserved./)
});