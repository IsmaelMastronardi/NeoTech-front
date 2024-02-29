import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import { fetchCategoryItems, fetchTopTenItems } from '../redux/slices/itemsSlice';
import { fetchCategories } from '../redux/slices/categoriesSlice';

const FilterMenu = ({ chooseOrder }) => {
  const dispatch = useDispatch();
  const { categoriesArr, categoriesLoading } = useSelector((store) => store.categories);
  const [categoriesMenuOpen, setCategoriesMenuOpen] = useState(false);
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

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
              {!categoriesLoading && (
                categoriesArr.map((category) => (
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
                ))
              )}
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

FilterMenu.propTypes = {
  chooseOrder: PropTypes.func.isRequired,
};

export default FilterMenu;
