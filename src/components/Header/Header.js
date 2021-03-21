import React from 'react';
// import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react/cjs/react.development';
import { UserContext } from '../../App';
import logo from '../../images/bus logo.png';
import "./Header.css";

const Header = () => {
    const [loggedInUser] = useContext(UserContext)
    return (
        <div className="container header">
            <nav className="nav">
                <div className="logo-container">
                  <img className="logo" src={logo} alt=""/>
                  <span>TRIP TICKETS</span>
                </div>
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/destination">Destination</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>  
                         <Link to="/login">Login</Link>
                    </li>

                    <li> <strong> {loggedInUser.name}</strong> </li>
                    
                </ul>
            </nav>
        </div>
    );
};

export default Header;