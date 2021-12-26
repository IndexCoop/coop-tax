import { render, screen } from '@testing-library/react'
import App from './App'

test('renders Connect to a wallet', () => {
  render(<App />)
  const text = screen.getByText(/Connect to a wallet/i)
  expect(text).toBeInTheDocument()
})
