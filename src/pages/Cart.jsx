/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchUser } from '../redux/slices/userSlice';

const Cart = () => {
  const {
    loading,
    user,
    cart,
    cartItems,
  } = useSelector((store) => store.user);
  const {
    oldCartItems,
    newCartItems,
  } = useSelector((store) => store.user);
  const itemsAmount = [...oldCartItems, ...newCartItems].length;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  if (loading) {
    return (
      <p>loading....</p>
    );
  }
  if (itemsAmount.length === 0) {
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
    <>
      <p>{user.name}</p>
      <p>{cart.total_price}</p>
    </>
  );
};

export default Cart;
