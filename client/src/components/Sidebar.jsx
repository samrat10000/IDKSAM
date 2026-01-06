import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import VisitCounter from './VisitCounter';



const Sidebar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? 'active' : '';

    React.useEffect(() => {
        const path = location.pathname;
        const inosukeSay = window.inosukeSay;
        if (!inosukeSay) return;

        switch (path) {
            case '/':
                inosukeSay("WELCOME TO MY DOMAIN!! ...oh, it's just your home.");
                break;
            case '/webmaster':
                inosukeSay("SHUT UP ABOUT YOURSELF!! AND I DON'T WANT TO BATH!!");
                break;
            case '/blog':
                inosukeSay("ONLY WORDS?? MY BRAIN IS SMOKING!!");
                break;
            case '/bikes':
                inosukeSay("METAL MONSTERS!! I WILL FIGHT THEM!!");
                break;
            case '/music':
                inosukeSay("MUSIC!! THE SOUND OF VICTORIOUS BATTLE DRUMS!!");
                break;
            case '/vending':
                inosukeSay("FOOD MACHINE!! GIVE ME ALL YOUR MEAT!!");
                break;
            case '/guestbook':
                inosukeSay("WHO ARE THESE WEAKLINGS WRITING HERE??");
                break;
            case '/stickers':
                inosukeSay("ARE THESE MY TROPHIES?? I WANT MORE!!");
                break;
            case '/links':
                inosukeSay("WHERE DO THESE HOLES LEAD?? TO FIGHTS??");
                break;
            default:
                break;
        }
    }, [location.pathname]);

    return (
        <aside className="sidebar-nav">
            <div className="sidebar-header">
                <h2 className="pixel-text">navigate</h2>
            </div>

            <nav className="nav-list">
                <Link to="/" className={`nav-item ${isActive('/')}`}>home</Link>
                <Link to="/webmaster" className={`nav-item ${isActive('/webmaster')}`}>about</Link>
                <Link to="/blog" className={`nav-item ${isActive('/blog')}`}>blog</Link>
                <Link to="/stickers" className={`nav-item ${isActive('/stickers')}`}>stickers</Link>
                <Link to="/stuff" className={`nav-item ${isActive('/stuff')}`}>stuff by me</Link>
                <Link to="/bikes" className={`nav-item ${isActive('/bikes')}`}>bikes</Link>
                <Link to="/music" className={`nav-item ${isActive('/music')}`}>music</Link>
                <Link to="/vending" className={`nav-item ${isActive('/vending')}`}>vending</Link>
                <Link to="/guestbook" className={`nav-item ${isActive('/guestbook')}`}>guestbook</Link>
                <Link to="/links" className={`nav-item ${isActive('/links')}`}>links</Link>
                <Link to="/contact" className={`nav-item ${isActive('/contact')}`} style={{ marginTop: '0.5rem' }}>contact me</Link>
            </nav>

            <div className="sidebar-footer">
                <VisitCounter />
            </div>
        </aside>
    );
};

export default Sidebar;
