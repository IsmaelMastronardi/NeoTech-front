/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  addAndRemoveItems, addItemToOrder, deleteItemFromOrder,
} from '../redux/slices/orderSlice';
import cartIcon from '../images/cart_icon.svg';
import xIcon from '../images/x_icon.png';

const ItemDetails = ({ item, closeMenu }) => {
  const dispatch = useDispatch();
  const {
    orderItems, orderLoading,
  } = useSelector((store) => store.order);

  const addToCart = (item) => {
    dispatch(addItemToOrder(item))
      .unwrap()
      .then(() => {
        dispatch(addAndRemoveItems(item, 'addItem'));
      })
      .catch();
  };

  const removeFromCart = (item) => {
    dispatch(deleteItemFromOrder(item))
      .unwrap()
      .then(() => {
        dispatch(addAndRemoveItems(item, 'removeItem'));
      })
      .catch();
  };

  const showCartItemQuantity = (item) => {
    if (!orderLoading && orderItems[item.id] && orderItems[item.id].quantity > 0) {
      return (
        <NavLink to="/cart" className="relative h-8">
          <img src={cartIcon} alt="cart link" className="h-full" />
          <span className="absolute top-0 px-1 text-xs font-bold rounded-full bg-custom-red left-5">{orderItems[item.id].quantity}</span>
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
              {orderLoading && (
              <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              )}
              {showCartItemQuantity(item)}
              {orderItems[item.id] && orderItems[item.id].quantity > 0 && (
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
