/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../redux/slices/userSlice';

const Cart = () => {
  const { loading, user, cart } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  if (loading) {
    return (
      <p>loading....</p>
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
