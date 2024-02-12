/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { fetchItem } from '../redux/slices/itemsSlice';
import { addNewItemAndSave } from '../redux/slices/orderSlice';
import cartIcon from '../images/cart_icon.svg';

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { itemLoading, item } = useSelector((store) => store.items);
  const {
    orderItems,
  } = useSelector((store) => store.order);
  useEffect(() => {
    dispatch(fetchItem(id));
  }, []);

  const addToCart = (item) => {
    dispatch(addNewItemAndSave(item, 'addItem'));
  };

  const removeFromCart = (item) => {
    dispatch(addNewItemAndSave(item, 'removeItem'));
  };

  const showCartItemQuantity = (item) => {
    if (orderItems[item.name] && orderItems[item.name].quantity > 0) {
      return (
        <NavLink to="/cart" className="relative h-8">
          <img src={cartIcon} alt="cart link" className="h-full" />
          <span className="absolute top-0 px-1 text-xs font-bold rounded-full bg-custom-red left-5">{orderItems[item.name].quantity}</span>
        </NavLink>
      );
    }
    return null;
  };

  if (itemLoading) {
    return (
      <section className="h-screen pt-14 bg-ym-blue">
        <h1>Loading...</h1>
      </section>
    );
  }
  return (
    <section className="flex justify-center bg-ym-blue text-fluorescent-cyan">
      <div className="flex flex-col items-center w-9/12 mt-20 mb-10 rounded-md bg-space-cadet">
        <img src={item.image} alt={item.name} className="w-full rounded-t-md" />
        <div className="flex flex-col w-full gap-5 text-center rounded-md bg-space-cadet">
          <hr className="w-11/12 h-1 mx-auto mt-2 mb-2 bg-gray-400 border-0 rounded md:my-10 dark:bg-gray-700" />
          <h1 className="text-3xl">{item.name}</h1>
          <hr className="w-48 h-1 mx-auto bg-gray-700 border-0 rounded md:my-10 dark:bg-gray-700" />
          <p className="text-2xl">{item.description}</p>
          <hr className="w-48 h-1 mx-auto bg-gray-700 border-0 rounded md:my-10 dark:bg-gray-700" />
          <p className="text-2xl text-verdigris">Price</p>
          <p className="text-4xl">
            $
            {item.price}
          </p>
          <hr className="w-48 h-1 mx-auto bg-gray-700 border-0 rounded md:my-10 dark:bg-gray-700" />
          <div className="flex justify-around mb-4">
            <button
              type="button"
              className="addButton"
              onClick={() => addToCart(item)}
            >
              Add To cart
            </button>
            {showCartItemQuantity(item)}
            {orderItems[item.name] && orderItems[item.name].quantity > 0 && (
              <button
                type="button"
                className="removeButton"
                onClick={() => removeFromCart(item)}
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemDetails;
