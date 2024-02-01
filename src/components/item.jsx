/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import cart from '../images/cart.png';
import { addNewItemAndSave } from '../redux/slices/userSlice';

const Item = ({ item }) => {
  const dispatch = useDispatch();
  const {
    orderItems,
  } = useSelector((store) => store.user);

  const addToCart = (item) => {
    dispatch(addNewItemAndSave(item));
  };

  const findItem = (item) => {
    if (orderItems[item.name] > 0) {
      return (
        <NavLink to="/cart" className="relative h-10">
          <img src={cart} alt="cart link" className="h-full" />
          <span className="absolute px-1 text-xs font-bold bg-red-400 rounded-full top-5 left-7">{orderItems[item.name]}</span>
        </NavLink>
      );
    }
  };

  return (
    <li key={item.name} className="flex flex-row content-center justify-between p-2 text-center border-1 ">
      <div className="w-1/3 h-full"><img src={item.image} alt={item.name} className="" /></div>
      <div className="w-2/3">
        <p>{item.name}</p>
        <p>{item.price}</p>
        <div className="flex justify-around">
          <button
            type="button"
            className="p-2 px-6 text-white bg-green-400 rounded-2xl"
            onClick={() => addToCart(item)}
          >
            Add To cart
          </button>
          {findItem(item)}
        </div>
      </div>
    </li>
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
