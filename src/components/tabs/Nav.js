import React from 'react';
import { Link } from 'react-router-dom'
import AccountCircle from "@mui/icons-material/AccountCircle";
import "../../style/Nav.css"
import logo from "../../assets/logo-orange.png"


const Nav = () => {
    return (
        <nav className="navbar" onClick={e => e.stopPropagation()}>
            <div className='link-left'>
                {/* <Link to="/accueil" className='lien'>Accueil</Link> */}
                <Link to="/"><img src={logo} alt="logo du site"/></Link>
                <Link to="/entreprise" className='lien'>Entreprise</Link>
                <Link to="/portefeuille" className='lien'>Portefeuille</Link>
            </div>
            <div className='link-right'>
                <p style={{ color: "white"}}>Momo</p>
                <AccountCircle style={{ color: "grey", width: 30, height: 30 }} />
            </div>


        </nav>
    );
};

export default Nav;