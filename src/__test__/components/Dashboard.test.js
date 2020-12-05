import ReactDOM from 'react-dom'
import { render, screen } from '@testing-library/react'
import { productsList } from '../../utils/Constant.utils';
const { default: Dashboard } = require("../../components/Dashboard");

describe('test dashboard', () => {

  test('dashboard render success', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Dashboard />, div)
  });

  test('dashboard render product card', () => {
    render(<Dashboard />)
    const element = screen.getAllByTestId('product-card')
    expect(element.length).toBe(productsList.length)
  });

  test('dashboard render product card image', () => {
    render(<Dashboard />)
    const element = screen.getAllByTestId('product-card-image')
    expect(element.length).toBe(productsList.length)
  });

});