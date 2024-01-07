/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import DropdownMenu from '../components/dropdownMenu';
import { fetchTopTenItems } from '../redux/slices/itemsSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { loading, itemsArr } = useSelector((store) => store.items);

  useEffect(() => {
    dispatch(fetchTopTenItems());
  }, []);

  return (
    <>
      <DropdownMenu />
      {!loading && (
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
      )}
    </>
  );
};

export default Home;
