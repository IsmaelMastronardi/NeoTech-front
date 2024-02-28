import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { addItemToOrder } from '../../redux/slices/orderSlice';
import CartItem from './cartItem';

jest.mock('../../redux/slices/orderSlice', () => ({
  ...jest.requireActual('../../redux/slices/orderSlice'),
  addItemToOrder: jest.fn(),
}));

describe('CartItem', () => {
  const product = {
    name: 'Sample Product',
    price: 10,
    description: 'Sample Description',
    image: 'sample_image.jpg',
    id: 1,
  };

  const quantity = 2;

  it('calls addToCart when plus button is clicked', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <CartItem product={product} quantity={quantity} />
      </Provider>,
    );

    // Mock the async thunk to return a resolved promise
    addItemToOrder.mockResolvedValueOnce({ data: 'mocked data' });

    fireEvent.click(getByTestId('plus-button'));

    // Wait for the asynchronous operations to complete
    await waitFor(() => {
      // Add your assertions based on the expected behavior after clicking the plus button
      // You might want to assert on the state or UI changes after the async operation
    });

    // Ensure the async thunk was called with the correct arguments
    expect(addItemToOrder).toHaveBeenCalledWith(product);

    // Reset the mock to ensure it doesn't affect other tests
    jest.clearAllMocks();
  });

  // Add more test cases as needed for other functionalities in the component
});
