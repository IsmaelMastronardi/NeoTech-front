import { useState } from 'react';
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
    <li key={order.id} className="flex flex-col w-full gap-4 px-4 py-10 text-white rounded-md bg-light-black lg:w-9/12 2xl:w-7/12 itemBorder">
      <h3 className="text-2xl text-custom-orange">
        Order Number:
        {' '}
        {order.id}
      </h3>
      <p className="text-lg">
        Date:
        {' '}
        {formatDate(order.created_at)}
      </p>
      <p className="text-lg">
        Total Price:
        {' '}
        $
        {order.total_price.toFixed(2)}
      </p>
      <div className="flex justify-center pb-2">
        <button type="button" className="addButton" onClick={() => alternateMenu()}>
          {menuOpen === true ? 'See Less' : 'See More'}
        </button>
      </div>
      <ul className={menuOpen === true ? 'flex flex-col items-center justify-center w-full gap-2 md:flex-row md:flex-wrap md:gap-10' : 'hidden'}>
        {order.order_items.map((orderItem) => (
          <div key={orderItem.item.id} className="itemContainer">
            <div className="flex flex-col items-center justify-center w-full px-4 rounded-lg bg-black-1">
              <p className="text-xl text-custom-orange">
                {orderItem.item.name}
              </p>
              <div className="">
                <img src={orderItem.item.image} alt={orderItem.item.name} className="h-40 rounded-r-md" />
                <div className="flex flex-col gap-4 pt-4 text-lg">
                  <p>
                    Quantity:
                    {' '}
                    {orderItem.item.quantity}
                  </p>
                  <p>
                    Price:
                    {' '}
                    $
                    {orderItem.item.price}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </ul>
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
