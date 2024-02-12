import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/slices/categoriesSlice';
import { fetchCategoryitems } from '../redux/slices/itemsSlice';

const CategoriesMenu = () => {
  const { loading, fetched, categoriesArr } = useSelector((store) => store.categories);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!fetched) {
      dispatch(fetchCategories());
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (loading) {
    return (
      <div className="relative w-full p-4">
        <div className="flex flex-col p-2 text-verdigris">
          <button
            type="button"
            className="w-full text-start"
          >
            Loading...
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full p-4">
      <div className="flex flex-col p-2 pl-4 border-2 text-verdigris border-oxford-blue">
        <button
          type="button"
          className="w-full text-start"
          onClick={toggleMenu}
        >
          Categories
        </button>
        {menuOpen && (
        <div className="absolute z-10 bg-white left-4 right-4 top-14">
          <ul className="flex flex-col gap-2">
            {categoriesArr.map((category) => (
              <li key={category.name} className="p-2">
                <button
                  type="button"
                  onClick={() => {
                    dispatch(fetchCategoryitems(category.id));
                    toggleMenu();
                  }}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesMenu;
