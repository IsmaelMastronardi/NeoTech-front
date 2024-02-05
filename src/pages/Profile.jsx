/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import PastOrders from '../components/pastOrders';

const Profile = () => {
  const dispatch = useDispatch();
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
