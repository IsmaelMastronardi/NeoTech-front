/* eslint-disable no-unused-vars */
import { useState } from 'react';
import ItemList from '../components/itemList';
import FilterMenu from '../components/filters';

const Home = () => {
  const [order, setOrder] = useState('all');

  const chooseOrder = (val) => {
    setOrder(val);
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

  return (
    <section>
      <div className="mt-14 bg-black-1">
        <div className="flex flex-row">
          <FilterMenu chooseOrder={chooseOrder} />
        </div>
        <div>
          <ItemList orderComparator={orderComparator} order={order} />
        </div>
      </div>

    </section>
  );
};

export default Home;
