import React from 'react';
import { Button } from 'reactstrap';

const home = () => {
    return (
        <div>
            <div>
                <h1>Home</h1>
                <p>Welcome! You have been authenticated</p>
            </div>
            <div>
                <Button href="http://localhost:9000/logout" color="warning">Logout</Button>
            </div>
        </div>
    );
}

export default home;