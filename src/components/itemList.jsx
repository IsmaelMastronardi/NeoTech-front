/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopTenItems } from '../redux/slices/itemsSlice';

const ItemList = () => {
  const { loading, itemsArr } = useSelector((store) => store.items);
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
        <div className="m-4">
          <button
            type="button"
            onClick={() => toggleOrderMenu()}
          >
            Order By
          </button>
          <div>
            {orderMenuOpen && (
            <ul>
              {orderByArr.map((order) => (
                <li key={order}>
                  <button
                    type="button"
                    onClick={() => chooseOrder(order)}
                  >
                    {order}
                  </button>
                </li>
              ))}
            </ul>
            )}
          </div>
        </div>
        <div className="">
          <ul className="flex flex-row flex-wrap gap-4">
            {itemsArrCopy.map((item) => (
              <li key={item.name} className="w-1/5 border-2">
                <p>{item.name}</p>
                <img src={item.image} alt={item.name} className="h-10" />
                <p>{item.price}</p>
              </li>
            ))}
          </ul>
        </div>

      </>
    );
  }
};

export default ItemList;
