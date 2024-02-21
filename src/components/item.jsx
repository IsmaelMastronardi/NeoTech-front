/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import cartIcon from '../images/cart_icon.svg';
import { addNewItemAndSave } from '../redux/slices/orderSlice';

const Item = ({ item, toggleMenu, showItemDetails }) => {
  const dispatch = useDispatch();
  const addToCart = (item) => {
    dispatch(addNewItemAndSave(item, 'addItem'));
  };

  return (
    <div className="itemContainer">
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
        <div className="flex flex-col w-full items-start">
          <p className="text-md">{item.name}</p>
          <p className="text-sm">
            Price: $
            {item.price}
          </p>
        </div>
        <button
          type="button"
          className="addButton"
          onClick={() => addToCart(item)}
        >
          Add To Cart
          <img src={cartIcon} alt="cart" className="w-6 h-6" />
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
