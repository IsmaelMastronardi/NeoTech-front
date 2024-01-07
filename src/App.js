/* eslint-disable import/no-extraneous-dependencies */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './pages/navigation';
import Home from './pages/Home';
import Contact from './pages/Contact';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
