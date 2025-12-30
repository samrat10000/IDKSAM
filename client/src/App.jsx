import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Links from './pages/Links';
import Status from './pages/Status';
import Scrapbook from './pages/Scrapbook';
import Stickers from './pages/Stickers';
import MusicBar from './components/MusicBar';
import Sidebar from './components/Sidebar';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminGuestbook from './pages/admin/AdminGuestbook';
import BlogEditor from './pages/admin/BlogEditor';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Bikes from './pages/Bikes';
import Guestbook from './pages/Guestbook';
import BackgroundSwitcher from './components/BackgroundSwitcher';
import PokeballButton from './components/PokeballButton';
import ThemeSwitcher from './components/ThemeSwitcher';
import UpdatesWidget from './components/UpdatesWidget';
import SiteStatsWidget from './components/SiteStatsWidget';
import AnimeWidget from './components/AnimeWidget';
import VendingMachine from './components/VendingMachine';
import InosukeMascot from './components/InosukeMascot';
import TanjiroZenitsuMascot from './components/TanjiroZenitsuMascot';
import JJKMascots from './components/JJKMascots';
import Footer from './components/Footer';


const App = () => {
  const [crtEnabled, setCrtEnabled] = useState(true);
  const [livingEnabled, setLivingEnabled] = useState(() => {
    const saved = localStorage.getItem('monstac-living-enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [isNightTime, setIsNightTime] = useState(false);
  const [musicVisible, setMusicVisible] = useState(false);
  const [vendingVisible, setVendingVisible] = useState(false);
  const [themeVisible, setThemeVisible] = useState(false);
  const [bgVisible, setBgVisible] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('monstac-theme') || 'default');
  const [background, setBackground] = useState(localStorage.getItem('monstac-bg') || 'city');

  useEffect(() => {
    localStorage.setItem('monstac-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('monstac-bg', background);
    document.body.className = `bg-${background}`;
  }, [background]);

  useEffect(() => {
    localStorage.setItem('monstac-living-enabled', JSON.stringify(livingEnabled));
  }, [livingEnabled]);

  // Living World Logic: Check for "Late Night" (2 AM - 5 AM)
  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours();
      // Night vision activates between 2 AM and 5 AM
      setIsNightTime(hour >= 2 && hour < 5);
    };

    checkTime();
    const timer = setInterval(checkTime, 60000); // Check every minute
    return () => clearInterval(timer);
  }, []);

  const isLivingNight = livingEnabled && isNightTime;
  const themeClass = theme === 'default' ? '' : `theme-${theme}`;
  const livingClass = isLivingNight ? 'living-night' : '';

  return (
    <Router>
      <div className={`app-container ${crtEnabled ? 'crt-active' : ''}`}>
        <PokeballButton />
        <ThemeSwitcher currentTheme={theme} setTheme={setTheme} isOpen={themeVisible} setIsOpen={setThemeVisible} />
        <BackgroundSwitcher currentBg={background} setBg={setBackground} isOpen={bgVisible} setIsOpen={setBgVisible} />

        {/* Left Side Controls (Under Pokeball) */}
        <div className="pokeball-controls">
          <button
            className={`crt-toggle-btn ${themeVisible ? 'active-tag' : ''}`}
            onClick={() => setThemeVisible(!themeVisible)}
          >
            Themes: {themeVisible ? 'ON' : 'OFF'}
          </button>
          <button
            className={`crt-toggle-btn ${bgVisible ? 'active-tag' : ''}`}
            onClick={() => setBgVisible(!bgVisible)}
          >
            BG: {bgVisible ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* Global Controls (Right Side) */}
        <div className="crt-toggle">
          <button
            className={`crt-toggle-btn ${livingEnabled ? 'active-tag' : ''}`}
            onClick={() => setLivingEnabled(!livingEnabled)}
            title="Toggle Living World (Time-based effects)"
          >
            Living: {livingEnabled ? 'ON' : 'OFF'}
          </button>
          <button
            className={`crt-toggle-btn ${crtEnabled ? 'active-tag' : ''}`}
            onClick={() => setCrtEnabled(!crtEnabled)}
            style={{ marginLeft: '8px' }}
          >
            CRT: {crtEnabled ? 'ON' : 'OFF'}
          </button>

          {/* New Toggles */}
          <button
            className={`crt-toggle-btn ${musicVisible ? 'active-tag' : ''}`}
            onClick={() => setMusicVisible(!musicVisible)}
            style={{ marginLeft: '8px' }}
          >
            Music: {musicVisible ? 'ON' : 'OFF'}
          </button>
          <button
            className={`crt-toggle-btn ${vendingVisible ? 'active-tag' : ''}`}
            onClick={() => setVendingVisible(!vendingVisible)}
            style={{ marginLeft: '8px' }}
          >
            Vend: {vendingVisible ? 'ON' : 'OFF'}
          </button>
        </div>
        {crtEnabled && <div className="crt-overlay"></div>}

        <div className={`app-wrapper ${themeClass} ${livingClass}`}>
          <div className="window-container fade-in">
            <InosukeMascot />
            <TanjiroZenitsuMascot />
            <UpdatesWidget />
            <SiteStatsWidget />
            <AnimeWidget />
            <div className="window-content">
              <Sidebar />

              <main className="content-area">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/webmaster" element={<About />} />
                  <Route path="/links" element={<Links />} />
                  <Route path="/now" element={<Status />} />
                  <Route path="/stuff" element={<Scrapbook />} />
                  <Route path="/stickers" element={<Stickers />} />
                  <Route path="/bikes" element={<Bikes />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogPost />} />
                  <Route path="/guestbook" element={<Guestbook />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/guestbook" element={<AdminGuestbook />} />
                  <Route path="/admin/blog" element={<BlogEditor />} />
                </Routes>
              </main>
            </div>

            {/* Decorative Keychain - Dangling from the bottom-left of the dashboard */}
            <div className="physical-hook dashboard-hook"></div>
            <div className="music-keychain-wrapper dashboard-keychain">
              <img
                src="/images/keychain_mimikyu.png"
                alt="Charm"
                className="music-keychain-dangle"
              />
            </div>
          </div>

          {/* MusicBar is now self-contained */}
          <MusicBar
            isLivingNight={isLivingNight}
            isOpen={musicVisible}
            setIsOpen={setMusicVisible}
          />

          {/* Retro Footer */}
          <Footer />

          {/* Vending Machine - Controlled via Global Toggle */}
          <VendingMachine isVisible={vendingVisible} setIsVisible={setVendingVisible} />

          {/* JJK Mascots - Bottom Left */}
          <JJKMascots onMusicToggle={() => setMusicVisible(!musicVisible)} musicOpen={musicVisible} />
        </div>
      </div>
    </Router >
  );
};

export default App;
