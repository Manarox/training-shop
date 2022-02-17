import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import './Header.css';
import './Footer.css';

const Layout = () => {
    return (
        <>
        <Header />

        <Outlet />

        <Footer />
        </>
    )
}

export {Layout}