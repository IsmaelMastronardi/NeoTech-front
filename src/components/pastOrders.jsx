/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPastOrders } from '../redux/slices/orderSlice';

const PastOrders = () => {
  const { pastOrdersLoading, pastOrdersArray } = useSelector((store) => store.order);
  const { user, loading } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPastOrders(user));
  }, []);

  if (pastOrdersLoading) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <div>
      <ul className="flex flex-col w-10/12 gap-16 py-10">
        {pastOrdersArray.map((order) => (
          <li key={order.id} className="flex flex-col gap-4">
            <h3>
              Order ID:
              {order.id}
            </h3>
            <p>
              Order Date:
              {order.created_at}
            </p>
            <p>
              Items:
              {order.order_items.length}
            </p>
            <p>
              Total:
              {order.total_price}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PastOrders;
