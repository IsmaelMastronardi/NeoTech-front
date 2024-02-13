import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Item = ({ item }) => (
  <NavLink to={`/${item.id}`} className="flex justify-center">
    <li key={item.name} className="flex flex-col items-center justify-between w-9/12 gap-4 p-2 py-6 text-center rounded-md bg-space-cadet text-verdigris md:w-full">
      <div className="w-2/3 h-full">
        <img src={item.image} alt={item.name} className="rounded-md" />
      </div>
      <div className="flex flex-col justify-between w-full gap-4">
        <p className="text-lg">{item.name}</p>
        <p className="text-2xl">
          $
          {item.price}
        </p>
      </div>
    </li>
  </NavLink>
);

Item.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default Item;
