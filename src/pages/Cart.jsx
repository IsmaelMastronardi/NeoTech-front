/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createGuestUser, fetchUser } from '../redux/slices/userSlice';

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

  // const itemsArr = [...oldCartItems, ...newCartItems];
  const itemsArr = oldCartItems;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createGuestUser());
  }, []);

  if (loading) {
    return (
      <p>loading....</p>
    );
  }
  if (itemsArr.length === 0) {
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
    <section className="flex flex-row justify-center">
      <ul className="flex flex-col w-10/12 gap-16 py-10">
        {itemsArr.map((item) => (
          <li key={item.id} className="border rounded-2xl">
            <div className="py-2 text-center">
              <p className="text-2xl">{item.name}</p>
            </div>
            <div className="flex flex-row gap-2">
              <div className="w-1/2">
                <img src={item.image} alt={`${item.name}`} />
              </div>
              <div className="flex flex-col justify-between text-center">
                <div className="">
                  <p>{item.description}</p>
                </div>
                <div className="flex justify-around">
                  <button type="button" className="px-3 py-1 bg-red-400 rounded-full"> Delete</button>
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-around py-4">
              <div className="flex flex-row justify-center">
                <button type="button" className="text-4xl border-s border-y ">-</button>
                <p className="">1</p>
                <button type="button" className="">+</button>
              </div>
              <p>{item.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Cart;
