import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import headerStyles from '../styles/header.module.css';
import { useRouter } from "next/router";
import { current } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
// import { updatePrice } from 'redux/cart.slice'
import cart from 'pages/cart';


const Header = (props) => { 
    const dispatch = useDispatch();

    const router = useRouter();
    const [check, setCheck] = useState(false);

    function handleRadioChange() {
        setCheck(true);
    }


    const [navCollapsed, setNavCollapsed] = useState(true);

    const handleNavCollapse = () => setNavCollapsed(false);
    const handleNavCollapseTwo = () => setNavCollapsed(true);
    

    let currencyName
    async function loadOnInitialPageLoad() {
        if (typeof window !== "undefined") {

            currencyName = sessionStorage.getItem("Currency");
            if (currencyName === null) {
    
                if (typeof window !== "undefined") {
                    sessionStorage.setItem("convertedPrice", "1") 
                    sessionStorage.setItem("Currency", "USD");  
                    sessionStorage.setItem("currencySymbol", "$")
                }
    
            }
    
        }
    }
   
    loadOnInitialPageLoad();

   

    const handleCurrencyChange = async(e) => {

        try {
            const request : any = await axios({
            method: 'get',    
            url: `${publicRuntimeConfig.backendBaseUrl}api/convertCurrency?currencyCode=${e.target.value}`,
            });
            if (typeof window !== "undefined") {
                sessionStorage.setItem("convertedPrice", request.data) 
                sessionStorage.setItem("Currency", e.target.value);
                if (e.target.value === "USD") {
                    sessionStorage.setItem("currencySymbol", "$")
                } else if (e.target.value === "AUD") {
                    sessionStorage.setItem("currencySymbol", "A$")
                }        
                router.reload();
            }                             
        } catch (error) {
            console.log(error)
        }
    }

    let reloadCurrency: any 
    if (typeof window !== "undefined") reloadCurrency  = window.sessionStorage.getItem("Currency")
    

    
  return (
    <header className="headerMain">
        <div className="topHeaderBar">
            <p><img src="/assets/images/heart.png" className="heart-icon" alt="" /> FREE SHIPPING 2+ books to AUS/USA</p>
        </div>
        <nav className="headerNav navbar navbar-expand-lg">

        <Link href="/" >
            <a className="navbar-brand" href="/"><img src="/assets/images/logo.png" className="logo" /> </a>
        </Link>
            
            <button className={`${navCollapsed ? 'collapsed' : 'collapsed'} navbar-toggler`} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded={navCollapsed ? false : true}  aria-label="Toggle navigation" onClick={handleNavCollapseTwo}>
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`${navCollapsed ? 'ktr navbar-collapse collapse' : 'ktr-rna navbar-collapse collapse'}`} id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">

                    <li className={router.pathname == "/" ? "nav-item active" : "nav-item"}>
                        <Link href='/'>
                            <a className='nav-link' onClick={handleNavCollapse}>Home</a>
                        </Link>
                    </li>

                    <li className={router.pathname == "/about" ? "nav-item active" : "nav-item"}>
                        <Link href='/about'>
                            <a className='nav-link' onClick={handleNavCollapse}>About</a>
                        </Link>
                    </li>
                    <li className={router.pathname == "/books" ? "nav-item active" : "nav-item"}>
                        <Link href='/books'>
                            <a className='nav-link' onClick={handleNavCollapse}>Books</a>
                        </Link>
                    </li> 
                    <li className={router.pathname == "/artprints" ? "nav-item active" : "nav-item"}>
                        <Link href='/artprints'>
                            <a className='nav-link' onClick={handleNavCollapse}>Art and Prints</a>
                        </Link>
                    </li>
                    <li className={router.pathname == "/application" ? "nav-item active" : "nav-item"}>
                        <Link href='/application'>
                            <a className='nav-link' onClick={handleNavCollapse}>App</a>
                        </Link>
                    </li>
                    <li className={router.pathname == "/printables" ? "nav-item active" : "nav-item"}>
                        <Link href='/printables'>
                            <a className='nav-link' onClick={handleNavCollapse}>Colouring</a>
                        </Link>
                    </li>
                    <li className={router.pathname == "/channel" ? "nav-item active" : "nav-item"}>
                        <Link href='/channel'>
                            <a className='nav-link' onClick={handleNavCollapse}>Shows</a>
                        </Link>
                    </li>
                    <li className={router.pathname == "/contact" ? "nav-item active" : "nav-item"}>
                        <Link href='/contact'>
                            <a className='nav-link' onClick={handleNavCollapse}>Contact</a>
                        </Link>
                    </li>
                   <div className="inline-wrap-menu">

                       { cart.length > 0 ?  <li className="nav-item">
                            <Link href='/cart'>
                                <a className='nav-link cart-image_number' onClick={handleNavCollapse}>
                                <img src="/assets/images/cart.png" className="nav-item-image"/><div className="number-on-cart">{cart.length}</div>
                                </a>
                            </Link>
                        </li> : <li className="nav-item" >
                            <Link href='/cart'>
                                <a className='nav-link cart-image_number' onClick={handleNavCollapse}>
                                <img src="/assets/images/cart.png" className="nav-item-image"/>
                                </a>
                            </Link>
                        </li> }


                        <li className="nav-item">
                            <Link href='/login'>
                                <a className='nav-link' onClick={handleNavCollapse}>
                                    <img src="/assets/images/account.png" className="nav-item-image" />
                                </a>
                            </Link>
                        </li>
                        <select id="currency-switcher" onChange={handleCurrencyChange}>
                            <option disabled selected >Currency</option>
                            <option value="USD">USD</option>
                            <option value="AUD">AUD</option> 
                        </select>


                            {/* { reloadCurrency === "USD" ? 
                                <select id="currency-switcher" onChange={handleCurrencyChange}>
                                    <option selected value="USD">USD</option>
                                    <option value="AUD">AUD</option> 
                                </select> :  
                                <select id="currency-switcher" onChange={handleCurrencyChange}>
                                    <option value="USD">USD</option>
                                    <option selected value="AUD">AUD</option> 
                                </select> 
                            } */}
                        



                   </div>
                </ul>              
            </div>
        </nav>
    </header>
  );
}

export default Header