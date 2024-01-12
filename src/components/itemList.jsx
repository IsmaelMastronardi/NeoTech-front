/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchTopTenItems } from '../redux/slices/itemsSlice';
import { addNewItem } from '../redux/slices/userSlice';
import cart from '../images/cart.png';

const ItemList = () => {
  const {
    loading,
    itemsArr,
  } = useSelector((store) => store.items);
  const {
    oldCartItems,
    newCartItems,
  } = useSelector((store) => store.user);
  const [orderMenuOpen, setOrderMenuOpen] = useState(false);
  const [order, setOrder] = useState('all');
  const dispatch = useDispatch();
  const orderByArr = ['all', 'Higher Price', 'Lower Price'];
  const fullCartArr = [...oldCartItems, ...newCartItems];
  useEffect(() => {
    dispatch(fetchTopTenItems());
  }, []);

  const chooseOrder = (val) => {
    setOrder(val);
  };

  const toggleOrderMenu = () => {
    setOrderMenuOpen(!orderMenuOpen);
  };

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
        <NavLink to="/cart" className="h-10 relative">
          <img src={cart} alt="cart link" className="h-full" />
          <span className="font-bold bg-red-400 absolute top-5 text-xs px-1 rounded-full left-7">{result}</span>
        </NavLink>
      );
    }
  };

  const orderComparator = (a, b) => {
    if (order === 'Lower Price') {
      return (a.price - b.price);
    }
    if (order === 'Higher Price') {
      return (b.price - a.price);
    }
  };

  if (loading) {
    return (
      <p>loading ...</p>
    );
  }

  if (!loading) {
    const itemsArrCopy = [...itemsArr];
    if (order !== 'all') {
      itemsArrCopy.sort(orderComparator);
    }
    return (
      <>
        <div className="relative w-full p-4">
          <div className="flex flex-col p-2 bg-white rounded-xl">
            <button
              type="button"
              className="w-full text-start"
              onClick={() => toggleOrderMenu()}
            >
              Order By
            </button>
            <div className="absolute bg-white left-4 right-4 top-14">
              {orderMenuOpen && (
              <ul className="z-10 flex flex-col gap-2">
                {orderByArr.map((order) => (
                  <li key={order} className="p-2">
                    <button
                      type="button"
                      onClick={() => {
                        chooseOrder(order);
                        toggleOrderMenu();
                      }}
                    >
                      {order}
                    </button>
                  </li>
                ))}
              </ul>
              )}
            </div>
          </div>
        </div>
        <div className="w-full p-4 ">
          <ul className="flex flex-col content-center justify-center w-full bg-white rounded-xl">
            {itemsArrCopy.map((item) => (
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
            ))}
          </ul>
        </div>

      </>
    );
  }
};

export default ItemList;
