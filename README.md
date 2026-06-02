# 🎵 Moodwave– Music Player  

This is my ** web development project**, a simple clone of the Spotify music player built using **HTML, CSS, and JavaScript**.  
The project helped me practice and understand how real-world music players work with interactive UI and JavaScript functionality.  

---

## 🚀 Key Features

### 🎧 1. Robust Playback Engine
* **Native Audio Engine:** Engineered using the native HTML5 `Audio()` constructor for seamless audio initialization, tracking, and absolute playback control.
* **Intelligent Controls:** Interactive panel for **Play, Pause, Next, and Previous** track actions designed to safely check playlist boundaries.

### 🗂️ 2. Dynamic Playlist Architecture
* **Vibe & Mood Categorization:** Data-driven system grouping music into tailored collections (*Chill, Coding, Funk, Dark, Love, etc.*).
* **Dynamic DOM Rendering:** Loops through structured JSON configurations to inject custom UI album cards dynamically into the layout grid.
* **Instant Queue Loading:** Smart click event delegation that clears active lists and feeds new track queues on the fly.

### 🎛️ 3. Interactive UI/UX Components
* **Synchronized Seekbar:** Visual timeline scrub circle updating its relative percentage placement dynamically on every `timeupdate` event.
* **Manual Timeline Scrubbing:** Translates mouse click offsets on the seekbar directly to the player's `currentTime` for instantaneous scrubbing.
* **Precision Time Formatter:** Custom processing math converting raw track duration seconds into a clean `MM:SS / MM:SS` display layout.

### 🔊 4. Advanced Audio Volume Controls
* **Live Volume Slider:** Leverages continuous HTML5 `"input"` listener streams to update audio gain ranges instantly as the user drags.
* **Smart Memory Mute:** Saves active gain preferences in state cache memory right before muting, ensuring flawless audio restoration.

### 📱 5. Responsive UI Layout
* **Flexbox & Grid Engine:** Crafted using a modular, lightweight utility class architecture to handle split-panel layout mapping.
* **Off-Canvas Navigation:** Leverages CSS Media Queries combined with JS event triggers to host an elegant off-canvas mobile drawer menu.
---

## 🛠️ Technologies Used  

- **HTML5** – for structure  
- **CSS3** – for styling & layout  
- **JavaScript (ES6)** – for interactivity and dynamic features  

---

## 🎯 What I Learned  

- Handling **DOM manipulation** in JavaScript  
- Working with **audio APIs** in JS (play, pause, seek, mute, etc.)  
- Building a **responsive layout** with CSS  
- Organizing code for better **readability and scalability**  

---

## 💡 Future Improvements  
- Implement using MERN stack and provide all backend functionalities
- Add **playlist creation**  
- Implement **volume slider** instead of just mute/unmute  
- Add **shuffle & repeat functionality**  
- Connect to a **real music API**  

---

## ⚠️ Note
**This project is best viewed on a laptop/desktop screen. Full responsiveness for all devices has not been completely implemented yet, as this project focuses mainly on basic HTML and CSS concepts and without using backend and js its functionalities are taken care off.

