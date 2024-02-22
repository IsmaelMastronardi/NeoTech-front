/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopTenItems } from '../redux/slices/itemsSlice';
import Item from './item';
import ItemDetails from '../pages/ItemDetails';

const ItemList = ({ orderComparator, order }) => {
  const dispatch = useDispatch();
  const {
    loading,
    itemsArr,
  } = useSelector((store) => store.items);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTopTenItems());
  }, []);

  const [itemDetails, setItemDetails] = useState();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const showItemDetails = (item) => {
    setItemDetails(item);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
    <div className="relative">
      <div className="flex justify-center w-full p-4 md:px-10">
        <ul className="flex flex-col items-center justify-center w-full gap-2 md:flex-row md:flex-wrap md:gap-10 2xl:w-10/12">
          {itemsArrCopy.map((item) => (
            <div
              key={item + item.id}
            >
              <Item item={item} toggleMenu={toggleMenu} showItemDetails={showItemDetails} />
            </div>
          ))}
        </ul>
      </div>
      {menuOpen && (
        <ItemDetails item={itemDetails} closeMenu={closeMenu} />
      )}
    </div>
  );
};

export default ItemList;
