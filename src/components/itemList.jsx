/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopTenItems } from '../redux/slices/itemsSlice';
import Item from './item';

const ItemList = () => {
  const {
    loading,
    itemsArr,
  } = useSelector((store) => store.items);

  const [orderMenuOpen, setOrderMenuOpen] = useState(false);
  const [order, setOrder] = useState('all');
  const dispatch = useDispatch();
  const orderByArr = ['all', 'Higher Price', 'Lower Price'];
  useEffect(() => {
    dispatch(fetchTopTenItems());
  }, []);

  const chooseOrder = (val) => {
    setOrder(val);
  };

  const toggleOrderMenu = () => {
    setOrderMenuOpen(!orderMenuOpen);
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
            {itemsArrCopy.map((item, index) => (
              <Item item={item} key={item + item.id} />
            ))}
          </ul>
        </div>

      </>
    );
  }
};

export default ItemList;
