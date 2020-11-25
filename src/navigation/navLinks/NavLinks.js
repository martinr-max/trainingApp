import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import './NavLinks.css'


export default function NavLinks() {

    const {authenticated, logOut } = useContext(AuthContext);

    return (
        <ul>
            {!authenticated &&
            <li><Link to="/signup" className="headerLink">Signup</Link></li>  } 
            {!authenticated ?
            <li><Link to="/login" className="headerLink" >login</Link></li>:
            <li><Link to="/" onClick={logOut} className="headerLink" >logout</Link></li> }
            {authenticated &&
            <li><Link to="/training-tab"className="headerLink" >Training</Link></li> }
        </ul>
    )
}