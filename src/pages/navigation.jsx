import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import appLogo from '../images/app_logo.png';
import profile from '../images/profile.png';
import cart from '../images/cart.png';

const Navigation = () => {
  const {
    oldCartItems,
    newCartItems,
  } = useSelector((store) => store.user);

  const itemsAmount = [...oldCartItems, ...newCartItems].length;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 h-20 border-b-2 bg-slate-100">
        <nav className="h-full p-2">
          <ul className="flex flex-row justify-between h-full pr-4">
            <li className=""><NavLink to="/"><img src={appLogo} alt="logo" className="h-full" /></NavLink></li>
            <li className="flex flex-col justify-center"><NavLink to="/">Products</NavLink></li>
            <li className="flex flex-col justify-center"><NavLink to="/contact">Contact</NavLink></li>
            <li className=""><NavLink to="/profile"><img src={profile} alt="profile link" className="mt-4 h-1/2" /></NavLink></li>
            <li className="">
              <NavLink to="/cart" className="relative">
                <img src={cart} alt="cart link" className="mt-4 h-1/2" />
                {itemsAmount >= 1 && (
                <span className="absolute px-1 text-xs font-bold bg-red-400 rounded-full top-7 left-5">{itemsAmount}</span>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mt-20" />
    </>
  );
};

export default Navigation;
