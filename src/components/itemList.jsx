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
    return 0;
  };

  if (loading) {
    return (
      <p>loading ...</p>
    );
  }

  const itemsArrCopy = [...itemsArr];
  if (order !== 'all') {
    itemsArrCopy.sort(orderComparator);
  }
  return (
    <div>
      <div className="relative w-full p-4">
        <div className="flex flex-col p-2 pl-4 border-2 text-verdigris border-oxford-blue">
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
      <div className="w-full p-4 md:px-10">
        <ul className="flex flex-col items-center justify-center w-full gap-2 md:flex-row md:flex-wrap md:gap-10">
          {itemsArrCopy.map((item) => (
            <Item item={item} key={item + item.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ItemList;
