import React from 'react'
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import './Header.css';
import './Footer.css';

const Layout = () => {
    return (
        <>
        <div data-test-id='app'>
        <Header />

        <Outlet />

        <Footer />
        </div>
        </>        
    )
}

export {Layout}