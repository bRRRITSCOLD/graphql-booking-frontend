import React from 'react';
import { NavLink } from 'react-router-dom';

import './MainNavigation.css'

const MainNavigation = props => {
  return (
    <div className="main-navigation">
      <div className="main-navigation__logo">
        <h1>EasyEvent</h1>
      </div>
      <nav className="main-navigation__items">
        <ul>
          <li><NavLink to="/auth">Login/Register</NavLink></li>
          <li><NavLink to="/events">Events</NavLink></li>
          <li><NavLink to="/bookings">Bookings</NavLink></li>
        </ul>
      </nav>
    </div>
  );
}

export default MainNavigation;