// Virtual Study Room JavaScript
class VirtualStudyRoom {
    constructor() {
        // Timer state
        this.timeLeft = 25 * 60; // 25 minutes in seconds
        this.isActive = false;
        this.mode = 'study'; // 'study', 'shortBreak', 'longBreak'
        this.cycles = 0;
        this.interval = null;
        
        // Room state
        this.activeUsers = 12;
        this.soundEnabled = true;
        this.currentSubject = 'Data Structures';
        this.studyGoal = 'Complete 3 Pomodoro sessions';
        this.completedSessions = 0;
        
        // Study stats
        this.todayStudyTime = 120; // minutes
        this.weeklyGoal = 840; // 14 hours in minutes
        this.weeklyProgress = 480; // minutes completed this week
        
        // Tasks
        this.tasks = [
            { id: 1, text: 'Review Binary Trees', completed: false },
            { id: 2, text: 'Complete Database Assignment', completed: true },
            { id: 3, text: 'Practice SQL Queries', completed: false }
        ];
        
        // Initialize the app
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateDisplay();
        this.renderTasks();
        this.updateStats();
    }
    
    bindEvents() {
        // Timer controls
        document.getElementById('playPauseBtn').addEventListener('click', () => this.toggleTimer());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetTimer());
        
        // Sound toggle
        document.getElementById('soundToggle').addEventListener('click', () => this.toggleSound());
        
        // Task management
        document.getElementById('addTaskBtn').addEventListener('click', () => this.addTask());
        document.getElementById('newTaskInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });
        
        // Ambience buttons
        document.querySelectorAll('.ambience-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.setAmbience(e.target.dataset.sound));
        });
        
        // Input events
        document.getElementById('currentSubject').addEventListener('input', (e) => {
            this.currentSubject = e.target.value;
        });
        
        document.getElementById('studyGoal').addEventListener('input', (e) => {
            this.studyGoal = e.target.value;
        });
    }
    
    toggleTimer() {
        this.isActive = !this.isActive;
        
        if (this.isActive) {
            this.startTimer();
        } else {
            this.pauseTimer();
        }
        
        this.updatePlayPauseButton();
    }
    
    startTimer() {
        this.interval = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            
            if (this.timeLeft <= 0) {
                this.completeSession();
            }
        }, 1000);
    }
    
    pauseTimer() {
        clearInterval(this.interval);
    }
    
    resetTimer() {
        this.isActive = false;
        clearInterval(this.interval);
        this.timeLeft = 25 * 60;
        this.mode = 'study';
        this.updateDisplay();
        this.updatePlayPauseButton();
        this.updateTimerCard();
    }
    
    completeSession() {
        this.isActive = false;
        clearInterval(this.interval);
        
        if (this.mode === 'study') {
            this.completedSessions++;
            this.cycles++;
            this.todayStudyTime += 25;
            this.weeklyProgress += 25;
            
            // Switch to break
            if (this.cycles > 0 && this.cycles % 4 === 0) {
                this.mode = 'longBreak';
                this.timeLeft = 15 * 60; // 15 minutes
            } else {
                this.mode = 'shortBreak';
                this.timeLeft = 5 * 60; // 5 minutes
            }
        } else {
            this.mode = 'study';
            this.timeLeft = 25 * 60; // 25 minutes
        }
        
        this.updateDisplay();
        this.updatePlayPauseButton();
        this.updateTimerCard();
        this.updateStats();
        this.showNotification(`${this.getModeName()} completed!`);
        
        if (this.soundEnabled) {
            this.playNotificationSound();
        }
    }
    
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        this.updateSoundButton();
    }
    
    addTask() {
        const input = document.getElementById('newTaskInput');
        const taskText = input.value.trim();
        
        if (taskText) {
            const newTask = {
                id: Date.now(),
                text: taskText,
                completed: false
            };
            
            this.tasks.push(newTask);
            input.value = '';
            this.renderTasks();
        }
    }
    
    toggleTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.renderTasks();
        }
    }
    
    deleteTask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        this.renderTasks();
    }
    
    setAmbience(soundType) {
        // Remove active class from all buttons
        document.querySelectorAll('.ambience-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        document.querySelector(`[data-sound="${soundType}"]`).classList.add('active');
        
        console.log(`Playing ${soundType} ambience`);
        // Here you would implement actual audio playback
    }
    
    // Update display methods
    updateDisplay() {
        document.getElementById('timerDisplay').textContent = this.formatTime(this.timeLeft);
        document.getElementById('sessionInfo').textContent = 
            `Session ${this.completedSessions + 1} • Cycle ${Math.floor(this.cycles / 4) + 1}`;
        document.getElementById('modeText').textContent = this.getModeName();
    }
    
    updatePlayPauseButton() {
        const btn = document.getElementById('playPauseBtn');
        const icon = document.getElementById('playPauseIcon');
        const text = document.getElementById('playPauseText');
        
        if (this.isActive) {
            text.textContent = 'Pause';
            icon.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            `;
        } else {
            text.textContent = 'Start';
            icon.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            `;
        }
    }
    
    updateTimerCard() {
        const card = document.getElementById('timerCard');
        const gradientClass = this.getGradientClass();
        
        // Remove existing gradient classes
        card.className = card.className.replace(/bg-gradient-to-br[\w-\s]+/, '');
        card.classList.add('bg-gradient-to-br', ...gradientClass.split(' '));
    }
    
    updateSoundButton() {
        const icon = document.getElementById('soundIcon');
        
        if (this.soundEnabled) {
            icon.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M8.083 5.5H4a1 1 0 00-1 1v11a1 1 0 001 1h4.083l4.674 3.129a.5.5 0 00.743-.43V2.801a.5.5 0 00-.743-.432L8.083 5.5z"></path>
            `;
        } else {
            icon.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>
            `;
        }
    }
    
    updateStats() {
        document.getElementById('completedSessions').textContent = this.completedSessions;
        document.getElementById('todayTime').textContent = `${this.todayStudyTime} min`;
        document.getElementById('weeklyTime').textContent = `${this.weeklyProgress}/${this.weeklyGoal} min`;
        
        // Update progress bars
        const todayProgress = Math.min((this.todayStudyTime / 240) * 100, 100);
        const weeklyProgressPercent = (this.weeklyProgress / this.weeklyGoal) * 100;
        
        document.getElementById('todayProgress').style.width = `${todayProgress}%`;
        document.getElementById('weeklyProgress').style.width = `${weeklyProgressPercent}%`;
    }
    
    renderTasks() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        
        this.tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = `task-item flex items-center space-x-3 group ${task.completed ? 'completed' : ''}`;
            
            taskElement.innerHTML = `
                <input type="checkbox" 
                       class="task-checkbox w-4 h-4 text-blue-400 rounded focus:ring-blue-400" 
                       ${task.completed ? 'checked' : ''}
                       onchange="studyRoom.toggleTask(${task.id})">
                <span class="flex-1 ${task.completed ? 'line-through opacity-60' : ''}">${task.text}</span>
                <button class="task-delete opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity"
                        onclick="studyRoom.deleteTask(${task.id})">×</button>
            `;
            
            taskList.appendChild(taskElement);
        });
    }
    
    // Utility methods
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    getModeName() {
        switch (this.mode) {
            case 'study': return 'Focus Time';
            case 'shortBreak': return 'Short Break';
            case 'longBreak': return 'Long Break';
            default: return 'Focus Time';
        }
    }
    
    getGradientClass() {
        switch (this.mode) {
            case 'study': return 'from-blue-600 to-purple-600';
            case 'shortBreak': return 'from-green-500 to-teal-500';
            case 'longBreak': return 'from-orange-500 to-red-500';
            default: return 'from-blue-600 to-purple-600';
        }
    }
    
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
    
    playNotificationSound() {
        // Create audio context for notification sound
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        }
    }
    
    // Save and load data (for future localStorage implementation)
    saveData() {
        const data = {
            completedSessions: this.completedSessions,
            todayStudyTime: this.todayStudyTime,
            weeklyProgress: this.weeklyProgress,
            tasks: this.tasks,
            currentSubject: this.currentSubject,
            studyGoal: this.studyGoal
        };
        
        // In a real implementation, you would save to localStorage here
        console.log('Saving data:', data);
    }
    
    loadData() {
        // In a real implementation, you would load from localStorage here
        console.log('Loading saved data...');
    }
}

// Utility functions for simulating real-time features
function simulateActiveUsers() {
    setInterval(() => {
        const users = 8 + Math.floor(Math.random() * 12); // 8-20 users
        document.getElementById('activeUsers').textContent = `${users} studying`;
    }, 30000); // Update every 30 seconds
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create global instance
    window.studyRoom = new VirtualStudyRoom();
    
    // Start simulating active users
    simulateActiveUsers();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Space bar to toggle timer
        if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            studyRoom.toggleTimer();
        }
        
        // R key to reset timer
        if (e.code === 'KeyR' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            studyRoom.resetTimer();
        }
    });
    
    // Add fade-in animation to cards
    const cards = document.querySelectorAll('.bg-white, .bg-gradient-to-br');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
    });
    
    // Update time every minute for real-time feeling
    setInterval(() => {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        console.log('Current time:', timeString);
    }, 60000);
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js')
            .then(function(registration) {
                console.log('ServiceWorker registered successfully');
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed');
            });
    });
}