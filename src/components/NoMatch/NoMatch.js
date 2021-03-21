import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import './NoMatch.css';

const NoMatch = () => {
    return (
        <div className="container noMatch">
            <h1>Oops!</h1>
            <h2>404-PAGE NOT FOUND</h2>
            <h5>The page you are looking for might have been removed, <br/> had its name changed or is temporarily unavailable.</h5>
            <Link to="/home">
            <button className="noMatch-button">GO TO HOMEPAGE</button>
            </Link>
            
            <footer><p>Copyright <span><FontAwesomeIcon icon={faCopyright}></FontAwesomeIcon></span> 2021 by Sports Manager</p></footer>
        
            
        </div>
    );
};

export default NoMatch;