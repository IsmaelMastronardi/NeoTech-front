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
    <div className="fixed top-0 bottom-0 left-0 right-0 overflow-scroll bg-white bg-opacity-40">
      <div className="flex justify-center text-white">
        <div className="relative flex flex-col items-center w-9/12 mt-20 mb-10 rounded-md lg:flex-row lg:items-start lg:mt-40 bg-light-black">
          <button className="z-40 right-2 top-2 hiddden md:absolute" type="button" onClick={closeMenu}>
            <img src={xIcon} alt="close" className="hidden w-8 h-8 md:block" />
          </button>
          <div className="relative flex flex-col justify-center w-full h-full">
            <button className="absolute right-2 top-2 md:hidden" type="button" onClick={closeMenu}>
              <img src={xIcon} alt="close" className="w-8 h-8" />
            </button>
            <img src={item.image} alt={item.name} className="w-full rounded-t-md lg:rounded-md" />
            <hr className="w-11/12 h-1 mx-auto mt-2 mb-2 bg-gray-400 border-0 rounded dark:bg-gray-700 lg:hidden" />
          </div>
          <div className="flex flex-col items-center w-full h-full gap-2 text-center lg:justify-center md:gap-4 xl:gap-8 2xl:gap-8">
            <hr className="hidden mt-2 shortHR lg:hidden" />
            <h1 className="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">{item.name}</h1>
            <hr className="shortHR" />
            <p className="w-3/4 text-sm md:text-md 2xl:text-xl">{item.description}</p>
            <hr className="shortHR" />
            <p className="text-md 2xl:text-2xl">
              Price : $
              {item.price}
            </p>
            <hr className="shortHR lg:hidden" />
            <div className="flex justify-around w-full mb-4">
              <button
                type="button"
                className="addButtonSmall"
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
