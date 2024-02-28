/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { fetchCategoryItems, fetchTopTenItems } from '../redux/slices/itemsSlice';

const FilterMenu = ({ chooseOrder }) => {
  const dispatch = useDispatch();
  const categories = [
    { name: 'All', id: 0 },
    { name: 'Cases', id: 1 },
    { name: 'Mousepads', id: 2 },
    { name: 'Motherboards', id: 3 },
    { name: 'Monitors', id: 4 },
    { name: 'power Supplies', id: 5 },
    { name: 'Mice', id: 6 },
    { name: 'Laptops', id: 7 },
    { name: 'Keyboards', id: 8 },
    { name: 'Headphones', id: 9 },
    { name: 'Graphic Cards', id: 10 },
    { name: 'Chairs', id: 11 },
  ];

  const [categoriesMenuOpen, setCategoriesMenuOpen] = useState(false);

  const toggleMenu = () => {
    setCategoriesMenuOpen(!categoriesMenuOpen);
  };
  const [orderMenuOpen, setOrderMenuOpen] = useState(false);
  const orderByArr = ['all', 'Higher Price', 'Lower Price'];
  const toggleOrderMenu = () => {
    setOrderMenuOpen(!orderMenuOpen);
  };

  const changeCategory = (category, id) => {
    if (category === 'All') {
      dispatch(fetchTopTenItems());
      toggleMenu();
    } else {
      dispatch(fetchCategoryItems(id));
      toggleMenu();
    }
  };

  return (
    <div className="flex items-center justify-around w-full mt-10 mb-10 md:justify-center md:gap-40">
      <div className="relative">
        <button
          type="button"
          className="filterButton"
          onClick={toggleMenu}
        >
          <p className="">Categories</p>
        </button>
        <CSSTransition
          in={categoriesMenuOpen}
          timeout={300}
          classNames="menu"
          unmountOnExit
        >
          <div className="absolute left-0 right-0 z-10 bg-white top-14">
            <ul className="flex flex-col gap-2">
              {categories.map((category) => (
                <li key={category.name} className="p-2 border-b border-black-1">
                  <button
                    type="button"
                    onClick={() => {
                      changeCategory(category.name, category.id);
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
        </CSSTransition>
      </div>
      <div className="relative">
        <button
          type="button"
          className="filterButton"
          onClick={toggleOrderMenu}
        >
          <p className="px-2">Order By</p>
        </button>
        <CSSTransition
          in={orderMenuOpen}
          timeout={300}
          classNames="menu"
          unmountOnExit
        >
          <div className="absolute left-0 right-0 z-10 bg-white top-14">
            <ul className="z-10 flex flex-col gap-2">
              {orderByArr.map((order) => (
                <li key={order} className="p-2 border-b border-black-1">
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
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default FilterMenu;
