/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import cartIcon from '../images/cart_icon.svg';
import { addNewItemAndSave } from '../redux/slices/orderSlice';

const Item = ({ item, toggleMenu, showItemDetails }) => {
  const dispatch = useDispatch();
  const addToCart = (item) => {
    dispatch(addNewItemAndSave(item, 'addItem'));
  };
  const {
    orderItems,
  } = useSelector((store) => store.order);
  const showCartItemQuantity = (item) => {
    if (orderItems[item.name] && orderItems[item.name].quantity > 0) {
      return (
        <span className="absolute top-0 px-1 text-xs font-bold rounded-full right-7 bg-custom-red">{orderItems[item.name].quantity}</span>
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
          onClick={() => addToCart(item)}
        >
          Add To Cart
          <img src={cartIcon} alt="cart" className="w-6 h-6" />
          {showCartItemQuantity(item)}
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
};

export default Item;
