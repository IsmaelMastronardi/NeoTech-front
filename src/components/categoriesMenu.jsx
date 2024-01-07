import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/slices/categoriesSlice';

const CategoriesMenu = () => {
  const { loading, categoriesArr } = useSelector((store) => store.categories);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div>
        <button
          type="button"
          className="border-2"
          onClick={toggleMenu}
        >
          Categories
        </button>
      </div>
      {menuOpen && (
      <div>
        <ul>
          {categoriesArr.map((category) => (
            <li key={category.name}>
              <button type="button">
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      )}
    </>
  );
};

export default CategoriesMenu;
