import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const PartOrder = ({ order }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const alternateMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <li key={order.id} className="flex flex-col w-full gap-4 pl-4 border rounded-md bg-space-cadet lg:w-9/12 2xl:w-7/12">
      <h3 className="text-2xl">
        Order Number:
        {' '}
        {order.id}
      </h3>
      <p className="text-lg">
        Date:
        {' '}
        <span className="text-light-blue">
          {formatDate(order.created_at)}
        </span>
      </p>
      <p className="text-lg">
        Total Price:
        {' '}
        <span className="text-light-blue">
          $
          {order.total_price}
        </span>
      </p>
      <div className="flex justify-center pb-2">
        <button type="button" className="addButton" onClick={() => alternateMenu()}>
          {menuOpen === true ? 'See Less' : 'See More'}
        </button>
      </div>
      <div className={menuOpen === true ? 'flex flex-col items-center gap-4 pb-10' : 'hidden'}>
        {order.order_items.map((orderItem) => (
          <NavLink to={`/${orderItem.item.id}`} key={orderItem.item.id} className="flex flex-col items-center w-1/2 gap-2 rounded-md bg-ym-blue">
            <p className="text-xl">
              {orderItem.item.name}
            </p>
            <div className="flex justify-start gap-10 pb-4">
              <img src={orderItem.item.image} alt={orderItem.item.name} className="w-1/2 rounded-r-md" />
              <div className="flex flex-col gap-4 pt-4 text-lg">
                <p>
                  Quantity:
                  {' '}
                  <span className="text-oxford-blue">
                    {orderItem.item.quantity}
                  </span>
                </p>
                <p>
                  Price:
                  {' '}
                  <span className="text-oxford-blue">
                    $
                    {orderItem.item.price}
                  </span>
                </p>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </li>
  );
};

PartOrder.propTypes = {
  order: PropTypes.shape({
    completed: PropTypes.bool.isRequired,
    created_at: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    order_items: PropTypes.arrayOf(
      PropTypes.shape({
        item: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          quantity: PropTypes.number.isRequired,
          price: PropTypes.number.isRequired,
          image: PropTypes.string.isRequired,
        }).isRequired,
      }),
    ).isRequired,
    total_price: PropTypes.number.isRequired,
    updated_at: PropTypes.string.isRequired,
    user_id: PropTypes.number.isRequired,
  }).isRequired,
};

export default PartOrder;
