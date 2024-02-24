import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NotificationContainer } from 'react-notifications';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import { createGuestUser, fetchUser } from './redux/slices/userSlice';
import Navigation from './components/navigation';
import ItemDetails from './pages/ItemDetails';
import { fetchOrder } from './redux/slices/orderSlice';
import 'react-notifications/lib/notifications.css';
import Footer from './pages/Footer';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const loadUser = async () => {
      if (localStorage.getItem('userState') === null) {
        await dispatch(createGuestUser());
      } else {
        await dispatch(fetchUser(JSON.parse(localStorage.getItem('userState'))));
      }
      dispatch(fetchOrder());
    };

    loadUser();
  }, []);

  return (
    <>
      <main className="min-h-screen font-proxima-nova">
        <BrowserRouter>
          <Navigation />
          <NotificationContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/:id" element={<ItemDetails />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </main>
    </>
  );
}

export default App;
