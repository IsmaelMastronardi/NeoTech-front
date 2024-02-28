import { useState } from 'react';
import ItemList from '../components/items/itemList';
import FilterMenu from '../components/filters';

const Home = () => {
  const [sorter, setSorter] = useState('all');

  const chooseOrder = (val) => {
    setSorter(val);
  };

  const orderComparator = (a, b) => {
    if (sorter === 'Lower Price') {
      return (a.price - b.price);
    }
    if (sorter === 'Higher Price') {
      return (b.price - a.price);
    }
    return 0;
  };

  return (
    <section className="relative">
      <div className="mt-14">
        <div className="flex flex-row">
          <FilterMenu chooseOrder={chooseOrder} />
        </div>
        <div>
          <ItemList orderComparator={orderComparator} sorter={sorter} />
        </div>
      </div>
    </section>
  );
};

export default Home;
