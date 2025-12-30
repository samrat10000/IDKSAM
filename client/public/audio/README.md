# 🌲⚡ Ambient Audio Setup

## Forest & Thunder Sounds

The music player now includes **Forest** and **Thunder** ambient sounds to create the perfect atmosphere.

### Required Files

You need to download these 2 audio files:

1. **Forest Sounds**
   - URL: https://www.youtube.com/watch?v=GgO6nfNEf_4
   - Save as: `forest.mp3`

2. **Thunder Sounds**
   - URL: https://www.youtube.com/watch?v=JtzY_kN4B_w
   - Save as: `thunder.mp3`

---

## How to Download

### Using yt-dlp (Recommended)

```powershell
cd c:\Users\cross\Downloads\Trex\client\public\audio

yt-dlp -x --audio-format mp3 -o "forest.mp3" "https://www.youtube.com/watch?v=GgO6nfNEf_4"
yt-dlp -x --audio-format mp3 -o "thunder.mp3" "https://www.youtube.com/watch?v=JtzY_kN4B_w"
```

### Using Online Converter

1. Visit: https://9convert.com/
2. Paste each YouTube URL
3. Download as MP3
4. Rename to `forest.mp3` and `thunder.mp3`
5. Place in `client/public/audio/`

---

## File Placement

Both MP3 files must be placed in:
```
client/public/audio/
├── forest.mp3
└── thunder.mp3
```

---

## How to Use

1. Open your music player (click **[music]**)
2. You'll see the new horizontal **♫ volume slider** at the top
3. Below that, you'll find:
   - **🌲 Forest** - Toggle and adjust forest ambience
   - **⚡ Thunder** - Toggle and adjust thunder sounds
4. Click the emoji icons to toggle ON/OFF
5. Use the sliders to adjust individual volumes
6. Mix them together with your music for the perfect vibe!

---

## Features

✨ **New Horizontal Volume Control** - Indie-style music icon with smooth slider
🌲 **Forest Ambience** - Calming nature sounds
⚡ **Thunder Sounds** - Dramatic storm atmosphere
🎚️ **Individual Controls** - Adjust each layer independently
