import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../Assets/Image/logo.png";
import "./Navbar.css";
import { useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase.init";

const Navbar = () => {
  const { pathname } = useLocation();
  const [user, setUser] = useState({})

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {

      }
    });
  }, [])

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser({});
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <nav
      style={
        pathname.includes("blog") ? { display: "none" } : { display: "flex" }
      }
    >
      <div className='logo-container'>
        <img src={Logo} alt='' />
      </div>
      <div className='link-container' style={{display: 'flex', alignItems: 'center'}}>
        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : "link")}
          to='/'
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : "link")}
          to='/videos'
        >
          Videos
        </NavLink>
        {user.email ? <button className="logout-button" onClick={handleLogout}>Logout</button> : <NavLink
          className={({ isActive }) => (isActive ? "active-link" : "link")}
          to='/login'
        >
          Login
        </NavLink>}
        {user?.photoURL ? <img title={user.displayName} style={{width:'45px',height:'45px',borderRadius: '50%', marginLeft: '20px'}} src={user?.photoURL} alt="" /> : ''}
      </div>
    </nav>
  );
};

export default Navbar;
