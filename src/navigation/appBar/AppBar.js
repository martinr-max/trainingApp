import React, { useState } from 'react';
import './AppBar.css'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import 'firebase/auth';
import PersistentDrawerLeft from '../drawer/Drawer';
import NavLinks from '../navLinks/NavLinks';



export default function MyAppBar() {

	const [open, setOpen] = useState(false);

	const handleDrawerToggle = () => {
		setOpen(!open);
	};

	return(	
	  <div className="appBar_root">
	   <AppBar position="static">
	    <Toolbar>
	      <IconButton color="inherit" aria-label="Open drawer" edge="start" onClick={handleDrawerToggle} className="menuButton">
		<MenuIcon />
	      </IconButton>
	      {open &&
	      <PersistentDrawerLeft handleDrawerToggle={handleDrawerToggle} open={open} />}
	      <h1>My App</h1>
	      <div className="spacer"></div>
	      <div className="navLinks">
		<NavLinks />
	      </div>
	    </Toolbar>
	   </AppBar>
	  </div>
	 );
}
