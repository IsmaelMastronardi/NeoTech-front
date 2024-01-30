/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addNewItem } from '../redux/slices/userSlice';
import cart from '../images/cart.png';

const Item = ({ item }) => {
  const dispatch = useDispatch();
  const {
    oldCartItems,
    newCartItems,
  } = useSelector((store) => store.user);
  const fullCartArr = [...oldCartItems, ...newCartItems];

  const addToCart = (item) => {
    dispatch(addNewItem(item));
    // let result = 0;
    // for (let i = 0; i < newCartItems.length; i += 1) {
    //   if (newCartItems[i].id === item.id) {
    //     result += 1;
    //   }
    // }
    // for (let i = 0; i < oldCartItems.length; i += 1) {
    //   if (oldCartItems[i].id === item.id) {
    //     result += 1;
    //   }
    // }
  };

  const findItem = (item) => {
    let result = 0;
    for (let i = 0; i < fullCartArr.length; i += 1) {
      if (fullCartArr[i].id === item.id) {
        result += 1;
      }
    }
    if (result >= 1) {
      return (
        <NavLink to="/cart" className="relative h-10">
          <img src={cart} alt="cart link" className="h-full" />
          <span className="absolute px-1 text-xs font-bold bg-red-400 rounded-full top-5 left-7">{result}</span>
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
