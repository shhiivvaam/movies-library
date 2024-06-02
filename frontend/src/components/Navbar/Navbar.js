import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Navbar.css';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">Movies Library</Link>
            </div>
            <ul className="nav-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/create-playlist">Create Playlist</Link>
                </li>
                <li>
                    <Link to="/search">Search Movies</Link>
                </li>
                <li>
                    {!user &&
                        <>
                            <Link to="/signin">Sign In</Link>
                        </>
                    }
                </li>
                <li>
                    {!user &&
                        <>
                            <Link to="/signup">Sign Up</Link>
                        </>
                    }
                </li>
                <li>
                    {user &&
                        <>
                            <button className="logout-button-nav" onClick={() => logout()}>Logout</button>
                        </>
                    }
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
