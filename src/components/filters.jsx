/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { fetchCategoryitems } from '../redux/slices/itemsSlice';

const FilterMenu = ({ chooseOrder }) => {
  const categories = [
    { name: 'Notebooks', id: 9 },
    { name: 'Desktop', id: 10 },
    { name: 'Processors', id: 12 },
    { name: 'Motherboards', id: 12 },
    { name: 'Graphics Cards', id: 13 },
    { name: 'Memory', id: 14 },
    { name: 'Storage', id: 15 },
    { name: 'Power Supplies', id: 16 },
    { name: 'Cases', id: 17 },
    { name: 'Cooling', id: 18 },
    { name: 'Accessories', id: 19 },
  ];
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const [orderMenuOpen, setOrderMenuOpen] = useState(false);
  const orderByArr = ['all', 'Higher Price', 'Lower Price'];
  const toggleOrderMenu = () => {
    setOrderMenuOpen(!orderMenuOpen);
  };

  return (
    <div className="flex justify-around w-full items-center mt-10 mb-10">
      <div className="relative">
        <button
          type="button"
          className="filterButton"
          onClick={toggleMenu}
        >
          Categories
        </button>
        {menuOpen && (
          <div className="absolute z-10 bg-white left-4 right-4 top-14">
            <ul className="flex flex-col gap-2">
              {categories.map((category) => (
                <li key={category.name} className="p-2">
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(fetchCategoryitems(category.id));
                      toggleMenu();
                    }}
                    className="text-black"
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="relative">
        <button
          type="button"
          className="filterButton"
          onClick={() => toggleOrderMenu()}
        >
          Order By
        </button>
        <div className="absolute bg-white left-4 right-4 top-14 z-10">
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
  );
};

export default FilterMenu;
