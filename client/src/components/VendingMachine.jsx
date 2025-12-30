import React, { useState, useEffect } from 'react';
import './VendingMachine.css';

const VendingMachine = ({ isVisible, setIsVisible }) => {

    const [coins, setCoins] = useState(() => {
        try {
            const saved = localStorage.getItem('vendingCoins');
            return saved ? parseInt(saved) : 1;
        } catch (e) {
            console.error("Error loading coins from localStorage", e);
            return 1;
        }
    });

    const [inventory, setInventory] = useState(() => {
        try {
            const saved = localStorage.getItem('vendingInventory');
            if (!saved) return [];
            const parsed = JSON.parse(saved);
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            console.error("Error loading inventory from localStorage", e);
            return [];
        }
    });
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [dispensing, setDispensing] = useState(false);

    // Vending machine items - INDIE ASCII ART EDITION
    const items = [
        { id: 'G1', name: 'Crispy Chicken', ascii: `  _______  \n |CHICKEN| \n |  🍗🍗  | \n  ‾‾‾‾‾‾‾  `, preview: '/vending/chicken_light.png' },
        { id: 'G2', name: 'Spicy Chicken', ascii: `  _______  \n | SPICY  | \n |  🔥🍗  | \n  ‾‾‾‾‾‾‾  `, preview: '/vending/chicken_spicy.png' },
        { id: 'H1', name: 'Tempura Onigiri', ascii: `    /\\     \n   /🍤\\    \n  /____\\   \n |______|  `, preview: '/vending/onigiri_tempura.png' },
        { id: 'H2', name: 'Citrus Punch', ascii: `   .---.   \n  |  |  |  \n  |  O  |  \n   '---'   `, preview: '/vending/citrus_punch.png' },
        { id: 'I1', name: 'Twin Onigiri', ascii: `   / \\ / \\ \n  /___\\___\\ \n |_______| `, preview: '/vending/double_onigiri.png' },
        { id: 'S1', name: 'Sukuna (RARE)', ascii: `  _______  \n | CURSED | \n |  🖕👿  | \n  ‾‾‾‾‾‾‾  `, preview: '/vending/sukuna.png' },
        { id: 'J1', name: 'Sugar Cane', ascii: `   /  /  / \n  /  /  /  \n /__/ /__/ `, preview: '/vending/sugar_cane.png' },
        { id: 'K1', name: 'Caramel Purin', ascii: `   .---.   \n  (     )  \n   '---'   `, preview: '/vending/purin.png' },
        { id: 'L1', name: 'Shroom Cat', ascii: `  /\\_/\\    \n ( o.o )🍄 \n  > ^ <    `, preview: '/vending/mushroom_cat.png' },
        { id: 'M1', name: 'Soup Dumplings', ascii: `   .---.   \n  ( ooo )  \n   '---'   `, preview: '/vending/dumplings.png' },
        { id: 'M2', name: 'Spicy Ramen', ascii: `   _____   \n  /     \\  \n | 🔥🍜 | \n  \\_____/  `, preview: '/vending/spicy_noodles.png' },
        { id: 'N1', name: 'Tempura Udon', ascii: `   _____   \n  /🍤🍜\\  \n |       | \n  \\_____/  `, preview: '/vending/tempura_udon.png' },
        { id: 'N2', name: 'Tonkotsu Ramen', ascii: `   _____   \n  /🍜🍥\\  \n |       | \n  \\_____/  `, preview: '/vending/tonkotsu_ramen.png' },
        { id: 'O1', name: 'Honey Chicken', ascii: `  _______  \n | RICE  | \n |  🍗✨  | \n  ‾‾‾‾‾‾‾  `, preview: '/vending/chicken_bowl.png' },
        { id: 'P1', name: 'Vintage Cola', ascii: `    _|_    \n   /   \\   \n   |COL |   \n   \\___/   `, preview: '/vending/cola.png' },
        { id: 'P2', name: 'Fanta Orange', ascii: `   .---.   \n  | FAN |  \n  |  O  |  \n   '---'   `, preview: '/vending/fanta.png' }
    ];

    useEffect(() => {
        localStorage.setItem('vendingCoins', coins);
    }, [coins]);

    useEffect(() => {
        localStorage.setItem('vendingInventory', JSON.stringify(inventory));
    }, [inventory]);

    const handlePurchase = (item) => {
        if (coins < 1) {
            if (typeof window !== 'undefined') {
                window.jjkSay?.('geto', "Satoru, look. This person is broke. No coins left.");
                window.jjkSay?.('gojo', "EH?! Refill it already! I want that cat!!");
            }
            return;
        }

        setSelectedSlot(item.id);
        setDispensing(true);
        setCoins(coins - 1);

        setTimeout(() => {
            setInventory(prev => [...prev, item]);
            setDispensing(false);
            setSelectedSlot(null);

            // Copy ASCII to clipboard
            if (navigator.clipboard) {
                navigator.clipboard.writeText(item.ascii).catch(err => console.error("Clipboard error", err));
            }

            // JJK Interaction
            if (typeof window !== 'undefined' && window.jjkChat) {
                window.jjkChat('stickers');
            }
        }, 1500);
    };

    const resetCoins = () => {
        const lastReset = localStorage.getItem('vendingLastReset');
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;

        if (!lastReset || now - parseInt(lastReset) > oneDay) {
            setCoins(1);
            localStorage.setItem('vendingLastReset', now);
        } else {
            if (typeof window !== 'undefined' && window.jjkSay) {
                window.jjkSay('gojo', "Wait until tomorrow! Patience is a virtue... supposedly.");
            }
        }
    };

    return (
        <>
            {/* Main Vending Machine */}
            {/* Main Vending Machine */}
            <div className={`vending-drawer-container ${isVisible ? 'open' : ''}`}>
                {/* Close Button - Moved outside content content to avoid clipping */}
                <button
                    className="vending-close-btn"
                    onClick={() => setIsVisible(false)}
                    title="Close Vending Machine"
                >
                    ×
                </button>

                <div className="vending-drawer-content">
                    <div className="vending-header-top">
                        <div className="branding-logo">自 動 販 賣 機</div>
                        <div className="branding-subtitle">AURA TREX SAM</div>
                        <div className="vintage-label">SWIZZ</div>
                    </div>

                    <div className="vending-machine-body">
                        <div className="vending-grid">
                            {items.map((item, index) => (
                                <React.Fragment key={item.id}>
                                    <div
                                        className={`vending-slot ${selectedSlot === item.id ? 'dispensing' : ''}`}
                                        onClick={() => handlePurchase(item)}
                                    >
                                        {item.id === 'A1' && <div className="slot-badge sale">SALE</div>}
                                        {item.id === 'S1' && <div className="slot-badge rare">RARE</div>}
                                        {item.id === 'F1' && <div className="slot-badge hot">HOT</div>}

                                        <div className="slot-item">
                                            {item.preview.startsWith('/') ? (
                                                <img src={item.preview} alt={item.name} className="vending-item-img" />
                                            ) : (
                                                <span style={{ fontSize: '1.2rem' }}>{item.preview}</span>
                                            )}
                                        </div>

                                    </div>
                                    {(index + 1) % 4 === 0 && <div className="vending-shelf" />}
                                </React.Fragment>
                            ))}
                        </div>

                        <div className="machine-controls">
                            <div className="dispenser-tray">
                                {dispensing ? (
                                    <div className="dispensing-anim">DISPENSING...</div>
                                ) : (
                                    <div className="tray-text">[ 出 口 ]</div>
                                )}
                            </div>

                            <div className="coin-display-vintage">
                                <div className="coin-count-box">
                                    {coins} 🪙
                                </div>
                                <div className="coin-slot-ui" onClick={resetCoins}>
                                    <div className="coin-text">COIN</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="inventory-section">
                        <h3 className="collection-title">:: COLLECTION ::</h3>
                        <div className="inventory-grid">
                            {inventory.length === 0 ? (
                                <p className="empty-inv">empty...</p>
                            ) : (
                                inventory.map((item, i) => (
                                    <span key={i} className="inv-item" title={item.name}>
                                        {item.preview.startsWith('/') ? (
                                            <img src={item.preview} alt={item.name} className="vending-item-img-small" />
                                        ) : (
                                            item.preview
                                        )}
                                    </span>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Trigger Button Removed - Moved to Navbar */}
        </>
    );
};

export default VendingMachine;
