# Virtual Study Room - BCA Final Year Project

A modern, interactive virtual study room application built with HTML, CSS, and JavaScript. This project implements a Pomodoro timer system with study tracking, task management, and ambient features to enhance the study experience.

## 🚀 Features

### Core Functionality
- **Pomodoro Timer System**
  - 25-minute focus sessions
  - 5-minute short breaks
  - 15-minute long breaks after 4 cycles
  - Visual and audio notifications

- **Study Management**
  - Subject tracking
  - Daily goal setting
  - Session completion tracking
  - Study time statistics

- **Task Management**
  - Add, complete, and delete tasks
  - Task persistence during session
  - Progress tracking

- **Ambient Features**
  - Background sound options (Rain, Fireplace, Ocean, Café)
  - Active user simulation
  - Sound toggle controls

### Technical Features
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern UI** - Glassmorphism effects and smooth animations
- **Keyboard Shortcuts** - Space to play/pause, R to reset
- **Real-time Updates** - Live user count and time display
- **Accessibility** - Proper ARIA labels and keyboard navigation

## 📁 Project Structure

```
virtual-study-room/
├── index.html          # Main HTML structure
├── styles.css          # Custom CSS styles
├── script.js           # JavaScript functionality
├── README.md           # Project documentation
└── assets/             # Images and icons (optional)
```

## 🛠️ Technologies Used

### Frontend Languages
1. **HTML5** - Structure and semantic markup
2. **CSS3** - Styling, animations, and responsive design
3. **JavaScript (ES6+)** - Core functionality and interactivity

### Libraries & Frameworks
- **Tailwind CSS** - Utility-first CSS framework
- **Font Awesome/Lucide** - Icons and visual elements

### Browser APIs Used
- **Web Audio API** - Notification sounds
- **Local Storage** - Data persistence (ready for implementation)
- **Service Worker** - PWA capabilities (optional)

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code, Sublime Text, etc.)
- Basic understanding of HTML, CSS, and JavaScript

### Installation

1. **Clone or Download**
   ```bash
   git clone https://github.com/yourusername/virtual-study-room.git
   cd virtual-study-room
   ```

2. **Open in Browser**
   - Simply open `index.html` in your web browser
   - Or use a local server for better development experience

3. **Using Local Server (Recommended)**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

4. **Access Application**
   - Open `http://localhost:8000` in your browser

## 💡 Usage Guide

### Timer Controls
- **Start/Pause**: Click the play button or press `Space`
- **Reset**: Click reset button or press `R`
- **Mode Switching**: Automatic based on Pomodoro technique

### Study Management
1. Set your current subject in the input field
2. Define your daily goal
3. Take notes in the study notes section
4. Track your progress in the stats panel

### Task Management
1. Add tasks using the input field and "Add" button
2. Check off completed tasks
3. Delete tasks using the × button (appears on hover)

### Keyboard Shortcuts
- `Space` - Start/Pause timer
- `R` - Reset timer
- `Enter` - Add new task (when input is focused)

## 🔧 Customization

### Modifying Timer Intervals
```javascript
// In script.js, VirtualStudyRoom constructor
this.timeLeft = 25 * 60; // Study time (25 minutes)

// In completeSession() method
this.timeLeft = 5 * 60;  // Short break (5 minutes)
this.timeLeft = 15 * 60; // Long break (15 minutes)
```

### Adding New Ambience Sounds
```html
<!-- In index.html -->
<button class="ambience-btn" data-sound="forest">
    🌲 Forest
</button>
```

```javascript
// In script.js, setAmbience() method
setAmbience(soundType) {
    // Add your audio implementation here
    console.log(`Playing ${soundType} ambience`);
}
```

### Customizing Colors and Themes
```css
/* In styles.css */
:root {
    --blue-primary: #3b82f6;
    --purple-primary: #8b5cf6;
    --green-primary: #10b981;
    /* Add your custom colors */
}
```

## 📊 Project Features for BCA Evaluation

### Technical Complexity
- **Object-Oriented JavaScript** - Class-based architecture
- **Event-Driven Programming** - User interaction handling
- **DOM Manipulation** - Dynamic content updates
- **CSS Grid/Flexbox** - Modern layout techniques
- **Responsive Design** - Mobile-first approach

### Academic Relevance
- **Data Structures** - Array manipulation for tasks
- **Algorithm Implementation** - Timer logic and calculations
- **UI/UX Design** - User-centered design principles
- **Software Engineering** - Modular code organization

## 🔮 Future Enhancements

### Backend Integration
- User authentication system
- Database storage for study data
- Multi-user study rooms
- Real-time collaboration features

### Advanced Features
- Study analytics and reports
- Achievement system and badges
- Calendar integration
- Export study data
- Mobile app version

### Technical Improvements
- Progressive Web App (PWA)
- Offline functionality
- Push notifications
- Cloud synchronization

## 🐛 Troubleshooting

### Common Issues

1. **Timer Not Working**
   - Check browser console for JavaScript errors
   - Ensure all files are properly linked

2. **Styles Not Loading**
   - Verify Tailwind CSS CDN link
   - Check custom CSS file path

3. **Sounds Not Playing**
   - Enable browser audio permissions
   - Check Web Audio API support

4. **Responsive Issues**
   - Test in browser developer tools
   - Check viewport meta tag

## 📚 Learning Resources

### HTML/CSS/JavaScript
- [MDN Web Docs](https://developer.mozilla.org/)
- [W3Schools](https://www.w3schools.com/)
- [freeCodeCamp](https://www.freecodecamp.org/)

### Advanced Topics
- [JavaScript.info](https://javascript.info/)
- [CSS Tricks](https://css-tricks.com/)
- [Web.dev](https://web.dev/)

## 🤝 Contributing

This is a student project, but suggestions and improvements are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is created for educational purposes as part of BCA final year project requirements.

## 👨‍💻 Author

**Your Name** - BCA Final Year Student  
**College**: [Your College Name]  
**Year**: [Academic Year]  
**Email**: [your.email@example.com]

## 🙏 Acknowledgments

- Pomodoro Technique by Francesco Cirillo
- Tailwind CSS for the utility framework
- Lucide React for beautiful icons
- Open source community for inspiration

---

### 📋 Project Submission Checklist

- [x] Complete HTML structure
- [x] Responsive CSS styling
- [x] Interactive JavaScript functionality
- [x] Timer implementation
- [x] Task management system
- [x] Local storage ready
- [x] Documentation complete
- [x] Code comments added
- [x] Cross-browser testing
- [x] Mobile responsiveness
- [x] Accessibility features
- [x] Error handling

**Total Lines of Code**: ~800+ lines  
**File Count**: 4 main files  
**Technologies**: 3 core (HTML, CSS, JS) + 2 libraries