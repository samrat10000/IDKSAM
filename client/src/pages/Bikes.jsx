import React from 'react';
import ShoutingTrioMascot from '../components/ShoutingTrioMascot';
import './Bikes.css';

const Bikes = () => {
    const bikes = [
        {
            id: 1,
            name: "BMW S1000RR 2nd Gen",
            type: "Superbike",
            power: "199 HP",
            weight: "450 lbs (Wet)",
            status: "Dream Machine",
            image: "/assets/bikes/s1000rr.jpg",
            description: "Dream Machine. I wish I had the money to buy it. I wish I was born in like... Japan or something."
        },
        {
            id: 2,
            name: "Suzuki GSX-R750",
            type: "Super Sport",
            power: "148 HP",
            weight: "419 lbs (Wet)",
            status: "Dream Machine",
            image: "/assets/bikes/gsxr750.jpg",
            description: "Also a Dream Machine. Not in my garage. I just like bikes. I really like bikes."
        },
        {
            id: 3,
            name: "CBR900RR FireBlade",
            type: "Modern Classic",
            power: "130 HP",
            weight: "397 lbs (Dry)",
            status: "Wishlist",
            image: "/assets/bikes/fireblade.jpg",
            description: "It's on the wishlist. FireBlade is cool."
        },
        {
            id: 4,
            name: "BMW F900GS",
            type: "Adventure",
            power: "105 HP",
            weight: "482 lbs (Wet)",
            status: "All-Rounder",
            image: "/assets/bikes/f900gs.jpg",
            description: "Yeah, that's a good all-rounder."
        }
    ];

    return (
        <div className="bikes-page fade-in">
            <header className="mechanical-header">
                <h1 className="glitch-text" data-text="I WANT SHUTUP ABOUT BIKES">
                    I WANT SHUTUP ABOUT BIKES
                </h1>
                <div className="header-stamp">MODEL: B-2025 // REV: 01</div>
            </header>

            <div className="bikes-grid">
                {bikes.map(bike => (
                    <article key={bike.id} className="tech-card">
                        <div className="bike-image-container">
                            {bike.image ? (
                                <>
                                    <img src={bike.image} alt={bike.name} className="bike-image" />
                                    <div className="image-overlay"></div>
                                </>
                            ) : (
                                <div className="bike-image-placeholder">BIKE_IMG</div>
                            )}
                        </div>
                        <div className="tech-details">
                            <span className="bike-name">{bike.name}</span>
                            <div className="bike-specs">
                                <div className="spec-line">
                                    <span className="spec-label">TYPE</span>
                                    <span>{bike.type}</span>
                                </div>
                                <div className="spec-line">
                                    <span className="spec-label">POWER</span>
                                    <span>{bike.power}</span>
                                </div>
                                <div className="spec-line">
                                    <span className="spec-label">WEIGHT</span>
                                    <span>{bike.weight}</span>
                                </div>
                                <div className="spec-line">
                                    <span className="spec-label">STATUS</span>
                                    <span style={{ color: bike.status === 'Maintenance' ? 'var(--accent-red)' : 'var(--accent-green)' }}>
                                        {bike.status}
                                    </span>
                                </div>
                            </div>
                            <p style={{ marginTop: '0.8rem', opacity: 0.8, fontSize: '0.9rem', lineHeight: '1.4' }}>
                                "{bike.description}"
                            </p>
                        </div>
                    </article>
                ))}
            </div>

            <section className="dream-bike-section">
                <div className="dream-label">// THE DREAM MACHINE</div>
                <div className="dream-layout">
                    <div className="dream-frame">
                        <img src="/assets/bikes/tenere700.jpg" alt="Yamaha Tenere 700" className="dream-image" />
                        <div className="blueprint-overlay"></div>
                        <div className="dream-specs-overlay">
                            <span>CP2 ENGINE</span>
                            <span>73 HP</span>
                            <span>452 LBS</span>
                        </div>
                    </div>
                    <div className="dream-desc">
                        <h3 className="dream-title">Yamaha Ténéré 700</h3>
                        <p>Yeah, that's my bike. I wish that was my bike. I wish I had the money to buy it. Getting a house in the mountains and just settling there... that's the goal. With a pet and a girlfriend obviously. Just me and the machine.</p>
                        <p style={{ marginTop: '1rem', color: 'var(--accent-green)', fontSize: '0.9rem', fontFamily: 'var(--font-pixel)' }}>
                            // STATUS: I WISH
                        </p>
                    </div>
                </div>
            </section>

            <ShoutingTrioMascot />

            <footer className="scrapbook-footer" style={{ marginTop: '3rem' }}>
                // mechanical souls and oily hands.
            </footer>
        </div>
    );
};

export default Bikes;
