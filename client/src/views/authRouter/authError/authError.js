import React from 'react';
import { NavLink } from 'react-router-dom';

const home = () => {
    return (
        <div>
            <h1>401: Could not Authenticate</h1>
            <NavLink to="/">Go back Home</NavLink>
        </div>
    );
}

export default home;