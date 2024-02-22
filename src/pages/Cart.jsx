import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import React from 'react';
import {
  addItemToOrder, completeOrder, deleteItemFromOrder, fetchOrder,
} from '../redux/slices/orderSlice';
import trashIcon from '../images/trash_icon.png';
import minusIcon from '../images/minus_icon.png';
import plusIcon from '../images/plus_icon.png';

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

  const addToCart = (item) => {
    dispatch(addItemToOrder(item)).then(() => {
      dispatch(fetchOrder());
    });
  };

  const removeFromCart = (item) => {
    dispatch(deleteItemFromOrder(item)).then(() => {
      dispatch(fetchOrder());
    });
  };

  const handleCompleteOrder = (order) => {
    dispatch(completeOrder(order));
  };

  if (loading) {
    return (
      <p>loading....</p>
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
          const { product } = orderItem;
          const { quantity } = orderItem;
          console.log(orderItem);
          return (
            <React.Fragment key={product.id}>
              <li className="itemContainer listItem">
                <div className="w-full">
                  <NavLink to={`/${product.id}`} className="flex flex-col items-center justify-center w-full">
                    <div className="flex justify-between w-full px-1 my-2 text-center border-b border-verdigris">
                      <p className="py-2 text-2xl text-center truncate">{product.name}</p>
                      <button
                        type="button"
                        className=""
                        onClick={() => removeFromCart(product)}
                      >
                        <img
                          src={trashIcon}
                          alt="trash icon"
                          className="h-10 pointer-events-none"
                        />
                      </button>
                    </div>
                    <div className="flex flex-col items-center w-full gap-2">
                      <div className="w-9/12">
                        <img src={product.image} alt={`${product.name}`} className="rounded-md " />
                      </div>
                      <div className="flex justify-center w-full min-w-0">
                        <p className="py-2 text-2xl truncate">{product.description}</p>
                      </div>
                      <div>
                        <p className="text-3xl">
                          $
                          {product.price}
                        </p>
                      </div>
                    </div>
                  </NavLink>
                  <div className="flex flex-row justify-around py-4">
                    <div className="flex flex-row items-center justify-center gap-2 border rounded-sm">
                      <button
                        type="button"
                        className={`text-4xl ${quantity === 1 ? 'text-gray-100' : ''}`}
                        onClick={() => removeFromCart(product, quantity)}
                      >
                        <img src={minusIcon} alt="minus icon" className="h-12" />
                      </button>
                      <p className="text-4xl text-center">{quantity}</p>
                      <button
                        type="button"
                        className=""
                        onClick={() => addToCart(product)}
                      >
                        <img src={plusIcon} alt="plus icon" className="h-12" />
                      </button>
                    </div>
                  </div>
                </div>

              </li>
            </React.Fragment>
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
