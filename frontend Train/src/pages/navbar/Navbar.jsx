import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets.js"
import { useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../components/Storecontext/StoreContext'
import { useDispatch } from "react-redux";
// import { removeUser } from "../../slices/userSlice.js";
const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const user = useSelector((state) => state.userInfo.user)


  const { token, setToken } = useContext(StoreContext)
  // const nav = useNavigate()
  // const logout = () => {
  //   localStorage.removeItem('token')
  //   setToken("")
  //   nav('/')
  //   dispatch(removeUser());
  // }
  return (
    <>
      <nav className="navbar" id="navbar">
        <div className="logo">
          <img src={assets.logo} alt="" />
        </div>
        {token ? (
          <ul className={isMobile ? "nav-links-mobile" : "nav-links"}>
            <li>
              <Link to="/BookedTicket"> Tickets</Link>
            </li>
            <li>
              <Link to="/ContactUs">Contact Us</Link>
            </li>
            <li>
              <a href="#trainTicket">Train Schedule</a>
            </li>
            <li title="Profile">
              <Link to="/profile">
                <img src={assets.profile_image} alt="Profile" />
              </Link>
            </li>
          </ul>
        ) : (
          null
        )}

        <button
          className="mobile-menu-icon"
          onClick={() => setIsMobile(!isMobile)}
        >
          {isMobile ? "✖" : "☰"}
        </button>
      </nav>
      <div className="home" id='home'>
        <div className="HomeContent">
          <h2>Book your tickets</h2>
          <p>"Life is like a train journey; enjoy the ride and make every stop count."</p>
          <div className="button">
            {!token ? <Link to="/Login" ><button >Login</button></Link> : null}

          </div>

        </div>
      </div>
    </>
  );
};

export default Navbar;
