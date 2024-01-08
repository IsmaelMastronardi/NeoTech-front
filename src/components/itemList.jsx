/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopTenItems } from '../redux/slices/itemsSlice';

const ItemList = () => {
  const { loading, itemsArr } = useSelector((store) => store.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTopTenItems());
  }, []);

  if (loading) {
    return (
      <p>loading ...</p>
    );
  }

  return (
    <>
      <div>
        <ul>
          {itemsArr.map((item) => (
            <li key={item.name}>
              <p>{item.name}</p>
              <img src={item.image} alt={item.name} className="h-10" />
            </li>
          ))}
        </ul>
      </div>

    </>
  );
};

export default ItemList;
