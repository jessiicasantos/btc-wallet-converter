import { Disclosure,  Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import logoOliveiraTrust from '../../assets/logo-oliveira-trust.svg';
import ArrowRightStartRect from '../../assets/arrow-right-start-on-rectangle-icon.svg';
import { Link, NavLink } from 'react-router';
import './Navbar.css';

const Navbar = () => {
  return (
      <Disclosure
      as="nav"
      className="navbar"
      >
      <div>
        <div>
          <div className="left">
            <NavLink to="" className="logo">
              <img
                alt="Logo Oliveira Trust"
                src={logoOliveiraTrust}
                className=""
              />
            </NavLink>
          </div>
          <div className="profile">
            {/* Profile dropdown */}
            <Menu as="div" className="profile-wrapper">
              <MenuButton className="open-user-menu">
                <span className="" />
                <span className="">Open user menu</span>
                <img
                  alt="Foto de Perfil de Otávio Oliveira"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className=""
                />
                <b>Otávio Oliveira</b>
              </MenuButton>
            </Menu>

            <NavLink
              to="/login"
              className="sign-out"
            >
              <span className="sr-only">Sign out</span>
              <img src={ArrowRightStartRect} alt="Sign Out Icon" />
            </NavLink>
          </div>
        </div>
      </div>
    </Disclosure>
  )
}

export default Navbar;