import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Footer.css';
import { assets } from '../../assets/front/assets';


const Footer = () => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/comments');
    };

    return (
        <div className="footer">
            <div className="footerContent">
                <div className="footerContentLeft">
                    <Link to="/"> <img src={assets.logo} alt="" /></Link>
                    <p>Experience seamless train ticket booking with Happy Journey – your trusted travel companion for a smooth and hassle-free journey!</p>
                </div>
                <div className="footerSocialIcons">
                    <a href="https://www.facebook.com/pages/create/?ref_type=registration_form"> <img src={assets.facebook_icon} alt="" /> </a>
                    <a href="https://x.com/?lang=en&mx=2"><img src={assets.twitter_icon} alt="" /></a>
                    <a href="https://in.linkedin.com/"><img src={assets.linkedin_icon} alt="" /></a>

                </div>
                <div className="footerContentCenter">
                    <h2>Company</h2>
                    <ul>
                        <a href="#navbar"><li>Home</li></a>
                        <Link to="/About"><li>About Us</li></Link>
                        <Link to="/ContactUs">  <li>Contact Us</li></Link>

                    </ul>

                </div>
                <div className="footerContentRight ">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li className='lii text-light'>09384783833</li>
                        <li className='lii text-light'>TrainBooking@123gmail.com</li>
                    </ul>
                </div>
            </div>
            <p className="footerCopyright text-light">TrainBooking@Copyright</p>

        </div>

    );
};

export default Footer;
