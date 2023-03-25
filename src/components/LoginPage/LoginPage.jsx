import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    return (
        <div>
            <h1>This's Loginpage!</h1>
            <button>
            <Link to = "/LoginPage">LoginPage</Link>
            </button>
        </div>
    );
}

export default LoginPage;
