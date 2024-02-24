import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { completeOrder } from '../redux/slices/orderSlice';
import CartItem from '../components/cartItem';

const Cart = () => {
  const dispatch = useDispatch();
  const totalPrice = useSelector((store) => store.order.totalPrice);
  const {
    loading,
  } = useSelector((store) => store.user);

  const {
    orderItems,
    itemsCount,
  } = useSelector((store) => store.order);

  const handleCompleteOrder = (order) => {
    dispatch(completeOrder(order));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full gap-8 pt-60">
        <p className="text-3xl text-white lg:text-4xl 2xl:text-5xl">Loading...</p>
        <svg aria-hidden="true" className="text-gray-200 2xl:h-10 2xl:w-10 lg:w-8 lg:h-8 w-7 h-7 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
      </div>
    );
  }

  if (itemsCount === 0) {
    return (
      <section className="flex flex-col gap-8 pt-8 text-center">
        <p>Your cart Is empty</p>
        <div>
          <NavLink to="/">
            <button type="button" className="p-3 text-white bg-blue-400 rounded-2xl">Continue Shopping</button>
          </NavLink>
        </div>
      </section>
    );
  }
  return (
    <section className="flex flex-col items-center justify-center pt-20 text-fluorescent-cyan">
      <div className="flex flex-col items-center justify-center gap-8 py-10">
        <h1 className="text-2xl underline text-custom-orange">
          YOUR CART
        </h1>
        <p className="text-xl">
          Total price:
          {' '}
          $
          {totalPrice}
        </p>
      </div>
      <ul className="flex flex-col items-center justify-center w-full gap-2 md:flex-row md:flex-wrap md:gap-10 2xl:w-10/12">
        {Object.values(orderItems).map((orderItem) => {
          const { product, quantity } = orderItem;
          return (
            <CartItem
              key={product.id}
              product={product}
              quantity={quantity}
            />
          );
        })}
      </ul>
      <button
        type="button"
        className="mt-20 addButton"
        onClick={() => handleCompleteOrder(orderItems)}
      >
        Complete Order
      </button>
    </section>
  );
};

export default Cart;
