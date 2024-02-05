/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPastOrders } from '../redux/slices/orderSlice';
import PastOrders from '../components/pastOrders';

const Profile = () => {
  const dispatch = useDispatch();
  const { pastOrdersLoading, pastOrdersArray } = useSelector((store) => store.order);
  const { user, loading } = useSelector((store) => store.user);

  if (loading) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center">
      <PastOrders />
    </section>
  );
};

export default Profile;
