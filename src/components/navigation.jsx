import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import appLogo from '../images/app_logo.png';
import profileIcon from '../images/profile_icon.png';
import cartIcon from '../images/cart_icon.png';

const Navigation = () => {
  const {
    itemsCount,
  } = useSelector((store) => store.order);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 text-white shadow-sm h-14 bg-light-black shadow-current">
        <nav className="h-full p-2">
          <ul className="flex flex-row justify-around h-full pr-4 xl:justify-center xl:gap-40 2xl:gap-60">
            <li className=""><NavLink to="/"><img src={appLogo} alt="logo" className="h-full" /></NavLink></li>
            <li className="flex flex-col justify-center text-xl"><NavLink to="/">Products</NavLink></li>
            <li className=""><NavLink to="/profile"><img src={profileIcon} alt="profile link" className="h-full" /></NavLink></li>
            <li className="">
              <NavLink to="/cart" className="relative">
                <img src={cartIcon} alt="cart link" className="h-full" />
                {itemsCount >= 1 && (
                <span className="absolute top-0 px-1 text-xs font-bold rounded-full bg-custom-red text-verdigray left-7">{itemsCount}</span>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
