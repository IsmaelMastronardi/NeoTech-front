import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import cartIcon from '../images/cart_icon.svg';
import { addAndRemoveItems, addItemToOrder } from '../redux/slices/orderSlice';

const Item = ({ item, toggleMenu, showItemDetails }) => {
  const {
    orderItems, orderLoading,
  } = useSelector((store) => store.order);

  const dispatch = useDispatch();

  const [itemLoading, setItemLoading] = useState(false);

  const switchItemLoading = () => {
    setItemLoading(!itemLoading);
  };

  const addToCart = (item) => {
    switchItemLoading();
    dispatch(addItemToOrder(item))
      .unwrap()
      .then(() => {
        dispatch(addAndRemoveItems(item, 'addItem'));
        switchItemLoading();
      })
      .catch()
      .finally(() => {
        setItemLoading(false);
      });
  };

  const showCartItemQuantity = (item) => {
    if (!itemLoading && orderItems[item.id] && orderItems[item.id].quantity > 0) {
      return (
        <span className="absolute top-0 px-1 text-xs font-bold rounded-full right-7 bg-custom-red">
          {orderItems[item.id].quantity}
        </span>
      );
    }
    return null;
  };

  return (
    <div className="itemContainer itemBorder">
      <li key={item.name} className="listItem">
        <button
          className="w-2/3 h-full"
          type="button"
          onClick={() => {
            toggleMenu();
            showItemDetails(item);
          }}
        >
          <img src={item.image} alt={item.name} className="rounded-md" />
        </button>
        <div className="flex flex-col items-start w-full">
          <p className="text-md">{item.name}</p>
          <p className="text-sm">
            Price: $
            {item.price}
          </p>
        </div>
        <button
          type="button"
          className="relative addButton"
          onClick={() => {
            if (!orderLoading) {
              addToCart(item);
            }
          }}
        >
          Add To Cart
          {!itemLoading && (
          <img src={cartIcon} alt="cart" className="w-6 h-6" />
          )}
          {showCartItemQuantity(item)}
          {itemLoading && (
          <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          )}
        </button>
      </li>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  toggleMenu: PropTypes.func.isRequired,
  showItemDetails: PropTypes.func.isRequired,
};

export default Item;
