import './sidebar.css';
import 'primeicons/primeicons.css';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className='sidebar'>
      <NavLink
        to="/vendas"
        className={({ isActive }) => isActive ? 'icons active-link' : 'icons'}
      >
        <i className='pi pi-shop'> </i>
      </NavLink>
      <NavLink
        to="/clientes"
        className={({ isActive }) => isActive ? 'icons active-link' : 'icons'}
      >
        <i className='pi pi-user'>  </i>
      </NavLink>
      <NavLink
        to="/produtos"
        className={({ isActive }) => isActive ? 'icons active-link' : 'icons'}
      >
        <i className='pi pi-shopping-bag'> </i>
      </NavLink>
    </div>
  );
}

export default Sidebar;
