/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addNewItemAndSave } from '../redux/slices/orderSlice';
import cartIcon from '../images/cart_icon.svg';
import xIcon from '../images/x_icon.png';

const ItemDetails = ({ item, closeMenu }) => {
  const dispatch = useDispatch();
  const {
    orderItems,
  } = useSelector((store) => store.order);

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

  return (
    <div className="fixed bg-white left-0 right-0 top-0 bottom-0 bg-opacity-40 overflow-scroll">
      <div className="flex justify-center text-white">
        <div className="flex flex-col items-center w-9/12 mt-20 mb-10 rounded-md lg:flex-row lg:items-start lg:mt-40 bg-light-black">
          <div className="flex flex-col justify-center w-full h-full relative">
            <button className="absolute right-2 top-2" type="button" onClick={closeMenu}>
              <img src={xIcon} alt="close" className="w-8 h-8" />
            </button>
            <img src={item.image} alt={item.name} className="w-full rounded-t-md lg:rounded-md" />
            <hr className="w-11/12 h-1 mx-auto mt-2 mb-2 bg-gray-400 border-0 rounded dark:bg-gray-700" />
          </div>
          <div className="flex flex-col w-full gap-2 text-center rounded-md items-center">
            <hr className="hidden mt-2 shortHR lg:flex" />
            <h1 className="text-xl">{item.name}</h1>
            <hr className="shortHR" />
            <p className="text-sm w-3/4">{item.description}</p>
            <hr className="shortHR" />
            <p className="text-md">
              Price : $
              {item.price}
            </p>
            <hr className="shortHR" />
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
      </div>
    </div>
  );
};

export default ItemDetails;
