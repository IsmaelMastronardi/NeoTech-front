import { NavLink } from 'react-router-dom';
import appLogo from '../images/app_logo.png';
import profile from '../images/profile.png';
import cart from '../images/cart.png';

const Navigation = () => (
  <>
    <div className="fixed top-0 left-0 right-0 z-50 h-20 border-b-2 bg-slate-100">
      <nav className="h-full p-2">
        <ul className="flex flex-row justify-between h-full pr-4">
          <li className=""><NavLink to="/"><img src={appLogo} alt="logo" className="h-full" /></NavLink></li>
          <li className="flex flex-col justify-center"><NavLink to="/">Products</NavLink></li>
          <li className="flex flex-col justify-center"><NavLink to="/contact">Contact</NavLink></li>
          <li className="flex flex-col justify-center"><NavLink to="/contact">Profile</NavLink></li>
          <li className=""><NavLink to="/contact"><img src={profile} alt="profile link" className="mt-4 h-1/2" /></NavLink></li>
          <li className=""><NavLink to="/cart"><img src={cart} alt="cart link" className="mt-4 h-1/2" /></NavLink></li>
        </ul>
      </nav>
    </div>
    <div className="mt-20" />
  </>
);

export default Navigation;
