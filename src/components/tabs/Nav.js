import React from 'react';
import { Link } from 'react-router-dom'
// import AccountCircle from "@mui/icons-material/AccountCircle";
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


import "../../style/Nav.css"
import logo from "../../assets/logo-orange.png"


const Nav = () => {
    return (
        <nav className="navbar" onClick={e => e.stopPropagation()}>
            <div className='link-left'>
                <Link to="/"><img src={logo} alt="logo du site"/></Link>
                <Link to="/entreprise" className='lien'>Entreprise</Link>
                <Link to="/portefeuille" className='lien'>Portefeuille</Link>
            </div>
            <Stack direction="row" spacing={1} className='link-right'>
                <Chip avatar={<Avatar>M</Avatar>} label="Avatar" variant='outlined'/>
                {/* <p style={{ color: "white"}}>Momo</p>
                <AccountCircle style={{ color: "grey", width: 30, height: 30 }} /> */}
            </Stack>
        </nav>
    );
};

export default Nav;