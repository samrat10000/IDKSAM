import React, { useState, useRef, useEffect } from 'react';
import '../components/MusicBar.css';

const Music = () => {
    // Audio State
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [shuffle, setShuffle] = useState(false);
    const [repeat, setRepeat] = useState('off'); // 'off', 'all', 'one'
    const [ambient, setAmbient] = useState({
        forest: false,
        thunder: false
    });
    const [ambientVolumes, setAmbientVolumes] = useState({
        forest: 0.5,
        thunder: 0.4
    });

    const audioRef = useRef(null);
    const analyzerRef = useRef(null);
    const [frequencyData, setFrequencyData] = useState(new Uint8Array(256));
    const animationRef = useRef(null);
    const ambientRefs = {
        forest: useRef(null),
        thunder: useRef(null)
    };

    // Playlist
    const PLAYLISTS = {
        vibes: [
            { name: 'Trex it is (Playlist)', artist: 'Samrat Mix', file: '/audio/01-djo-end-of-beginning.mp3', link: 'https://music.youtube.com/playlist?list=PLKxt3aIEpQWQDk5pPZyXjUMe_opfnhrsz' },
            { name: 'End Of Beginning', artist: 'Djo', file: '/audio/01-djo-end-of-beginning.mp3', link: 'https://youtu.be/B3Z4XGAxJB0?si=65lXsyZ0DJM7vdg4' },
            { name: 'Iris', artist: 'Goo Goo Dolls', file: '/audio/05-goo-goo-dolls-iris.mp3', link: 'https://www.youtube.com/watch?v=NdYWuo9OFAw' },
            { name: 'Somewhere Only We Know', artist: 'Keane', file: '/audio/06-keane-somewhere-only-we-know.mp3', link: 'https://www.youtube.com/watch?v=Oextk-If8HQ' },
            { name: 'Gone, Gone, Gone', artist: 'Phillip Phillips', file: '/audio/07-phillip-phillips-gone-gone-gone.mp3', link: 'https://www.youtube.com/watch?v=oozQ4yV__Vw' },
            { name: 'Love Hurts', artist: 'Nazareth', file: '/audio/09-nazareth-love-hurts.mp3', link: 'https://www.youtube.com/watch?v=Vj2AlaQcW40' },
            { name: 'Homura', artist: 'LiSA', file: 'https://www.youtube.com/watch?v=4DxL68KlZno', link: 'https://www.youtube.com/watch?v=4DxL68KlZno' }
        ],
        hits: []
    };

    const [currentPlaylist, setCurrentPlaylist] = useState('vibes');
    const tracks = PLAYLISTS[currentPlaylist];

    // Ambient loop URLs
    const AMBIENT_FILES = {
        forest: 'https://www.youtube.com/watch?v=GgO6nfNEf_4',
        thunder: 'https://www.youtube.com/watch?v=JtzY_kN4B_w'
    };

    // Initialize Audio Context for Visualizer
    const initVisualizer = () => {
        if (!audioRef.current || analyzerRef.current) return;

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        const analyzer = ctx.createAnalyser();
        const source = ctx.createMediaElementSource(audioRef.current);

        source.connect(analyzer);
        analyzer.connect(ctx.destination);
        analyzer.fftSize = 64;

        analyzerRef.current = analyzer;
    };

    const updateVisualizer = () => {
        if (!analyzerRef.current) return;

        const dataArray = new Uint8Array(analyzerRef.current.frequencyBinCount);
        analyzerRef.current.getByteFrequencyData(dataArray);
        setFrequencyData([...dataArray]);
        animationRef.current = requestAnimationFrame(updateVisualizer);
    };

    useEffect(() => {
        if (isPlaying) {
            initVisualizer();
            animationRef.current = requestAnimationFrame(updateVisualizer);
        } else {
            cancelAnimationFrame(animationRef.current);
        }
        return () => cancelAnimationFrame(animationRef.current);
    }, [isPlaying]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    // Sync ambient audio playback
    useEffect(() => {
        Object.keys(ambient).forEach(key => {
            const audio = ambientRefs[key].current;
            if (audio) {
                if (ambient[key]) {
                    audio.volume = volume * ambientVolumes[key];
                    audio.play().catch(e => {
                        console.warn(`${key} ambient sound play failed:`, e);
                        audio.load();
                        audio.play().catch(err => console.error(`${key} retry failed:`, err));
                    });
                    audio.loop = true;
                } else {
                    audio.pause();
                    audio.currentTime = 0;
                }
            }
        });
    }, [ambient]);

    useEffect(() => {
        Object.keys(ambientRefs).forEach(key => {
            if (ambientRefs[key].current) {
                ambientRefs[key].current.volume = volume * ambientVolumes[key];
            }
        });
    }, [volume, ambientVolumes]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load();
            if (isPlaying) {
                audioRef.current.play().catch(err => {
                    console.log('Playback prevented:', err);
                    setIsPlaying(false);
                });
            }
        }
    }, [currentTrack]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            audioRef.current.playbackRate = 1.0;
        }
    }, [volume]);

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play().catch(err => {
                    console.log('Playback failed:', err);
                });
                setIsPlaying(true);
                window.inosukeSay?.("PLAY MY MUSIC!! AND WHERE IS MY SWORD?!");
            }
        }
    };

    const handleNext = () => {
        setCurrentTrack((prev) => (prev + 1) % tracks.length);
    };

    const handlePrevious = () => {
        setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    };

    const handleTrackEnd = () => {
        if (repeat === 'one') {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        } else if (repeat === 'all') {
            handleNext();
        } else if (shuffle) {
            const randomIndex = Math.floor(Math.random() * tracks.length);
            setCurrentTrack(randomIndex);
        } else {
            if (currentTrack < tracks.length - 1) {
                handleNext();
            }
        }
    };

    const toggleAmbient = (type) => {
        setAmbient(prev => ({ ...prev, [type]: !prev[type] }));
    };

    const handleSeek = (e) => {
        const bar = e.currentTarget;
        const rect = bar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const newTime = percent * duration;
        if (audioRef.current && !isNaN(newTime)) {
            audioRef.current.currentTime = newTime;
        }
    };

    const toggleShuffle = () => setShuffle(!shuffle);

    const cycleRepeat = () => {
        const modes = ['off', 'all', 'one'];
        const currentIndex = modes.indexOf(repeat);
        setRepeat(modes[(currentIndex + 1) % modes.length]);
    };

    const setAmbientVolume = (type, value) => {
        setAmbientVolumes(prev => ({ ...prev, [type]: value }));
    };

    const formatTime = (seconds) => {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="music-page-container">
            <div className="content-header">
                <h1>// music player</h1>
                <p className="page-subtitle">tune in, zone out 🎵</p>
            </div>

            <div className="music-page-centered">
                <audio
                    ref={audioRef}
                    src={tracks[currentTrack].file}
                    onEnded={handleTrackEnd}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    crossOrigin="anonymous"
                />
                {Object.keys(AMBIENT_FILES).map(key => (
                    <audio
                        key={key}
                        ref={ambientRefs[key]}
                        src={AMBIENT_FILES[key]}
                        loop
                        preload="auto"
                        crossOrigin="anonymous"
                    />
                ))}

                <div className="cassette-deck vertical">
                    <div className="deck-header">
                        <div className="label-title" style={{ fontFamily: 'Courier Prime, monospace', fontWeight: 'bold' }}>
                            INDIE_DECK.v1
                        </div>
                        <div className="ascii-deco" style={{ fontSize: '0.6rem', color: '#666', whiteSpace: 'pre' }}>
                            {`[QC: OK]`}
                        </div>
                    </div>

                    <div className="cassette-body">
                        <div className="pen-mark mark-1">~</div>
                        <div className="pen-mark mark-2">*</div>
                        <div className="tape-texture"></div>
                        <div className="scratch-overlay"></div>
                        <div className="coffee-stain"></div>

                        <div className="tape-window">
                            <div className={`tape-wheel left ${isPlaying ? 'spinning' : ''}`}>
                                <div className="wheel-spokes"></div>
                            </div>

                            <div className="visualizer-container">
                                {[...Array(8)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="vis-bar"
                                        style={{
                                            height: `${isPlaying ? (frequencyData[i * 2] / 255) * 100 : 5}%`
                                        }}
                                    ></div>
                                ))}
                            </div>

                            <div className={`tape-wheel right ${isPlaying ? 'spinning' : ''}`}>
                                <div className="wheel-spokes"></div>
                            </div>
                        </div>

                        <div className="cassette-label">
                            <div className="label-top-text">
                                ☆ INDIE MIX ☆
                                {tracks[currentTrack].link && (
                                    <a
                                        href={tracks[currentTrack].link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="yt-link-icon"
                                        title="Open YouTube"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        🔗
                                    </a>
                                )}
                            </div>
                            <div className="track-info">
                                <span className="track-side">{currentTrack + 1}</span>
                                <div className="track-details">
                                    <span className="track-name">
                                        {tracks[currentTrack].name}
                                    </span>
                                    <span className="track-artist">
                                        {tracks[currentTrack].artist}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="progress-section">
                        <div className="led-progress-container" onClick={handleSeek}>
                            {[...Array(20)].map((_, i) => {
                                const percent = (currentTime / duration) * 100 || 0;
                                const isFilled = (i / 20) * 100 < percent;
                                return <div key={i} className={`led-segment ${isFilled ? 'filled' : ''}`}></div>;
                            })}
                        </div>
                        <div className="time-display-digital">
                            <span className="current">{formatTime(currentTime)}</span>
                            <span className="divider">/</span>
                            <span className="total">{formatTime(duration)}</span>
                        </div>
                    </div>

                    <div className="deck-controls vertical">
                        <div className="playback-controls">
                            <button onClick={toggleShuffle} className={`deck-btn shuffle-btn ${shuffle ? 'active' : ''}`} title="Shuffle">
                                {shuffle ? 'RND' : 'SEQ'}
                            </button>
                            <button onClick={handlePrevious} className="deck-btn" title="Prev">
                                {"|<"}
                            </button>
                            <button onClick={handlePlayPause} className="deck-btn play-pause">
                                {isPlaying ? '||' : 'GO'}
                            </button>
                            <button onClick={handleNext} className="deck-btn" title="Next">
                                {">|"}
                            </button>
                            <button onClick={cycleRepeat} className={`deck-btn repeat-btn ${repeat !== 'off' ? 'active' : ''}`} title={`Repeat: ${repeat}`}>
                                {repeat === 'one' ? '1' : repeat === 'all' ? 'ALL' : 'NO'}
                            </button>
                        </div>

                        <div className="ambient-mixer vertical">
                            <div className="volume-control-main">
                                <div className="indie-icon-minimal" title="Music Volume">♫</div>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={volume}
                                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                                    className="volume-slider-horizontal"
                                    title="Music Volume"
                                />
                            </div>

                            <span className="mixer-label">AMBIENT</span>
                            <div className="mixer-grid">
                                <div className="ambient-control horizontal">
                                    <button
                                        onClick={() => toggleAmbient('forest')}
                                        className={`deck-btn small-btn ${ambient.forest ? 'active' : ''}`}
                                        title="Toggle Forest"
                                    >
                                        WDS
                                    </button>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={ambientVolumes.forest}
                                        onChange={(e) => setAmbientVolume('forest', parseFloat(e.target.value))}
                                        className={`ambient-slider compact ${!ambient.forest ? 'disabled' : ''}`}
                                        title="Forest volume"
                                        disabled={!ambient.forest}
                                    />
                                </div>

                                <div className="ambient-control horizontal">
                                    <button
                                        onClick={() => toggleAmbient('thunder')}
                                        className={`deck-btn small-btn ${ambient.thunder ? 'active' : ''}`}
                                        title="Toggle Thunder"
                                    >
                                        STM
                                    </button>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={ambientVolumes.thunder}
                                        onChange={(e) => setAmbientVolume('thunder', parseFloat(e.target.value))}
                                        className={`ambient-slider compact ${!ambient.thunder ? 'disabled' : ''}`}
                                        title="Thunder volume"
                                        disabled={!ambient.thunder}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Music;
