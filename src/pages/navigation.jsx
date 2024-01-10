/* eslint-disable import/no-extraneous-dependencies */
import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <>
    <div className="fixed top-0 left-0 right-0 z-50 h-20 border-b-2 bg-slate-100">
      <nav>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
      </nav>
    </div>
    <div className="mt-20" />
  </>
);

export default Navigation;
