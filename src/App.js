/* eslint-disable import/no-extraneous-dependencies */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import { createGuestUser, fetchUser } from './redux/slices/userSlice';
import Navigation from './pages/navigation';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('userState') === null) {
      dispatch(createGuestUser());
    } else {
      dispatch(fetchUser(JSON.parse(localStorage.getItem('userState'))));
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
