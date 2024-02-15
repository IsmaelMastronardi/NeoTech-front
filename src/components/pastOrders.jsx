import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPastOrders } from '../redux/slices/orderSlice';
import PastOrder from './pastOrder';

const PastOrders = () => {
  const { pastOrdersLoading, pastOrdersArray } = useSelector((store) => store.order);
  const { user } = useSelector((store) => store.user);
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
    <div className="flex justify-center w-full">
      <ul className="flex flex-col items-center justify-center w-10/12 gap-16 py-10 mt-4">
        {pastOrdersArray.map((order) => (
          <PastOrder order={order} key={order + order.id} />
        ))}
      </ul>
    </div>
  );
};

export default PastOrders;
