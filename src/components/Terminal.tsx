'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Flex, Text } from '@/once-ui/components';
import styles from './Terminal.module.scss';

interface TerminalLine {
    type: 'command' | 'output' | 'error';
    text: string;
    timestamp?: Date;
}

interface TerminalProps {
    className?: string;
}

const Terminal: React.FC<TerminalProps> = ({ className }) => {
    const [lines, setLines] = useState<TerminalLine[]>([
        { type: 'output', text: 'Type "help" to see available commands.' },
    ]);
    const [currentInput, setCurrentInput] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isTyping, setIsTyping] = useState(false);
    const [cursorPosition, setCursorPosition] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);
    const hiddenSpanRef = useRef<HTMLSpanElement>(null);

    const commands = {
        help: {
            description: 'Show available commands',
            execute: () => [
                'Available commands:',
                '  help       - Show this help message',
                '  about      - Learn about Ayden',
                '  experience - View work experience',
                '  education  - View education',
                '  skills     - List technical skills',
                '  projects   - Show recent projects',
                '  contact    - Get contact information',
                '  resume     - Download resume',
                '  clear      - Clear terminal',
                '  ascii      - Show ASCII art',
                '  joke       - Tell a random joke',
                '  coffee     - Essential developer fuel',
                '  exit       - Close terminal',
                '',
                'Tip: Use arrow keys to navigate command history!',
            ]
        },
        about: {
            description: 'Learn about Ayden',
            execute: () => [
                '👋 Hi! I\'m Ayden Nguyen',
                '',
                '🎓 2nd year Computer Engineering Student at UBC',
                '💻 Passionate about backend development and embedded systems',
                '🚀 Currently working as a Firmware Developer at UBC AeroDesign',
                '🏢 Also working as a Middleware Administrator Assistant at BCLDB',
                '',
                '🌱 I love exploring new technologies, cycling, and photography!',
                '📸 Fun fact: I completed a 600km cycling challenge at age 15!',
                '',
                'Currently focused on: C/C++, Python, TypeScript, and embedded systems.',
            ]
        },
        experience: {
            description: 'View work experience',
            execute: () => [
                '💼 Work Experience:',
                '',
                '🏢 BC Liquor Distribution Branch (BCLDB)',
                '   📅 May 2025 - present',
                '   🔧 Middleware Administrator Assistant',
                '   • Maintaining DEV and TEST infrastructure',
                '   • Administering Java deployments via Oracle Service Bus',
                '   • Managing PostgreSQL, Microsoft SQL, and Oracle SQL databases',
                '',
                '✈️ UBC AeroDesign - Firmware Developer',
                '   📅 June 2025 - present',
                '   • Developing flight control firmware for VTOL aircraft',
                '   • Implementing C code on STM32H7 for autonomous flight',
                '   • Working with PID, GPS, IMU, Airspeed sensors',
                '',
                '✈️ UBC AeroDesign - Power & Controls Lead',
                '   📅 Sept. 2023 - June 2025',
                '   • Led team of 6 students in electric propulsion design',
                '   • Achieved highest thrust-to-weight ratio in team history',
                '   • Designed PCBs for propulsion testing',
            ]
        },
        education: {
            description: 'View education',
            execute: () => [
                '🎓 Education:',
                '',
                '🏫 University of British Columbia (UBC)',
                '   📚 Computer Engineering',
                '   📅 2023 - 2027 (Expected)',
                '   🎯 Currently in 2nd year',
                '',
                '📝 Relevant Coursework:',
                '   • Data Structures and Algorithms',
                '   • Digital Logic Design',
                '   • Computer Architecture',
                '   • Software Engineering',
                '   • Differential Equations',
                '',
                '🏆 Achievements:',
                '   • Dean\'s List',
                '   • Active in engineering design teams',
            ]
        },
        skills: {
            description: 'List technical skills',
            execute: () => [
                '🛠️ Technical Skills:',
                '',
                '💻 Programming Languages:',
                '   • C/C++ (Advanced) - Embedded systems, firmware',
                '   • Python (Advanced) - Automation, data analysis',
                '   • TypeScript/JavaScript (Intermediate) - Web development',
                '   • Java (Intermediate) - Enterprise applications',
                '',
                '🔧 Technologies & Tools:',
                '   • STM32 microcontrollers',
                '   • Arduino/ESP32',
                '   • Git/GitHub',
                '   • Linux/Unix systems',
                '   • Oracle Service Bus',
                '   • PostgreSQL, SQL Server, Oracle DB',
                '',
                '⚡ Frameworks & Libraries:',
                '   • React.js/Next.js',
                '   • Node.js',
                '   • RESTful APIs',
                '',
                '🎨 Other:',
                '   • PCB Design',
                '   • Photography',
                '   • Technical Documentation',
            ]
        },
        projects: {
            description: 'Show recent projects',
            execute: () => [
                '🚀 Recent Projects:',
                '',
                '✈️ VTOL Electric Aircraft (UBC AeroDesign)',
                '   • Flight control firmware for autonomous navigation',
                '   • Sensor fusion with PID controllers',
                '   • Real-time telemetry systems',
                '',
                '🔋 Electric Propulsion System',
                '   • High-performance electric aircraft design',
                '   • Custom PCB development for testing',
                '   • Arduino-based performance monitoring',
                '',
                '🌐 Personal Portfolio Website',
                '   • Built with Next.js and TypeScript',
                '   • Modern UI with Once UI components',
                '   • Interactive terminal (you\'re using it now!)',
                '',
                '📊 Scheduler Automation (UBC CS)',
                '   • Python script for exam proctoring',
                '   • Automated scheduling based on availability',
                '',
                'Want to see more? Check out the projects section!',
            ]
        },
        contact: {
            description: 'Get contact information',
            execute: () => [
                '📞 Contact Information:',
                '',
                '📧 Email: aydennguyen604@gmail.com',
                '💼 LinkedIn: linkedin.com/in/aydennguyen/',
                '🐙 GitHub: github.com/u759',
                '📄 Resume: Available for download',
                '',
                '📍 Location: Vancouver, BC, Canada',
                '🌐 Website: You\'re on it!',
                '',
                'Feel free to reach out for collaboration opportunities!',
            ]
        },
        resume: {
            description: 'Download resume',
            execute: () => {
                // Trigger resume download
                if (typeof window !== 'undefined') {
                    const link = document.createElement('a');
                    link.href = '/files/resume.pdf';
                    link.download = 'Ayden_Nguyen_Resume.pdf';
                    link.click();
                }
                return [
                    '📄 Resume download initiated!',
                    '',
                    'If the download didn\'t start automatically,',
                    'you can find the resume link in the navigation.',
                ];
            }
        },
        clear: {
            description: 'Clear terminal',
            execute: () => {
                setLines([]);
                return [];
            }
        },
        ascii: {
            description: 'Show ASCII art',
            execute: () => [
                '    ___             __         ',
                '   /   | __  ______/ /__  ____ ',
                '  / /| |/ / / / __  / _ \\/ __ \\',
                ' / ___ / /_/ / /_/ /  __/ / / /',
                '/_/  |_\\__, /\\__,_/\\___/_/ /_/ ',
                '      /____/                   ',
                '🎯 Computer Engineering Student',
                '🚀 Firmware Developer',
                '💻 Backend Enthusiast',
            ]
        },
        joke: {
            description: 'Tell a random joke',
            execute: () => {
                const jokes = [
                    [
                        'Why do programmers prefer dark mode?',
                        '',
                        'Because the light attracts bugs! 🐛'
                    ],
                    [
                        'How many programmers does it take to change a light bulb?',
                        '',
                        'None. That\'s a hardware problem! 💡'
                    ],
                    [
                        'Why do Java developers wear glasses?',
                        '',
                        'Because they can\'t C# ! 👓'
                    ],
                    [
                        'What\'s a programmer\'s favorite hangout place?',
                        '',
                        'Foo Bar! 🍺'
                    ],
                    [
                        'Why did the developer go broke?',
                        '',
                        'Because they used up all their cache! 💸'
                    ],
                    [
                        'What do you call a programmer from Finland?',
                        '',
                        'Nerdic! 🇫🇮'
                    ]
                ];
                return jokes[Math.floor(Math.random() * jokes.length)];
            }
        },
        coffee: {
            description: 'Essential developer fuel',
            execute: () => [
                '☕ Coffee Status:',
                '',
                '┌─────────────────────────────┐',
                '│  ☕ COFFEE LEVEL: ████████░░ │',
                '│     Status: CAFFEINATED     │',
                '│     Mood: READY TO CODE     │',
                '└─────────────────────────────┘',
                '',
                'Debug mode: ENABLED ✅',
                'Productivity: MAXIMUM 🚀',
                '',
                'Remember: Coffee first, code second! ☕→💻',
            ]
        },
        exit: {
            description: 'Close terminal',
            execute: () => [
                'Thanks for exploring my terminal! 👋',
                '',
                'Feel free to browse the rest of my portfolio.',
                'Terminal session will close in 3 seconds...',
            ]
        }
    };

    const addLine = useCallback((line: TerminalLine) => {
        setLines(prev => [...prev, line]);
    }, []);

    const addLines = useCallback((newLines: string[], type: 'output' | 'error' = 'output') => {
        const terminalLines = newLines.map(text => ({ type, text, timestamp: new Date() }));
        setLines(prev => [...prev, ...terminalLines]);
    }, []);

    // Calculate cursor position based on input text width
    const updateCursorPosition = useCallback(() => {
        if (hiddenSpanRef.current && inputRef.current) {
            const cursorPos = inputRef.current.selectionStart || 0;
            const textBeforeCursor = currentInput.substring(0, cursorPos);
            hiddenSpanRef.current.textContent = textBeforeCursor;
            setCursorPosition(hiddenSpanRef.current.offsetWidth);
        }
    }, [currentInput]);

    // Update cursor position when input changes
    useEffect(() => {
        if (currentInput === '') {
            setCursorPosition(0);
        } else {
            updateCursorPosition();
        }
    }, [currentInput, updateCursorPosition]);

    const executeCommand = useCallback((command: string) => {
        const trimmedCommand = command.trim().toLowerCase();
        
        // Add command to history
        if (trimmedCommand && !commandHistory.includes(trimmedCommand)) {
            setCommandHistory(prev => [...prev, trimmedCommand]);
        }
        setHistoryIndex(-1);

        // Add command line
        addLine({ type: 'command', text: `$ ${command}`, timestamp: new Date() });

        if (!trimmedCommand) {
            return;
        }

        // Check if command exists
        if (trimmedCommand in commands) {
            setIsTyping(true);
            
            // Simulate typing delay for more realistic terminal feel
            setTimeout(() => {
                const result = commands[trimmedCommand as keyof typeof commands].execute();
                addLines(result);
                setIsTyping(false);
                
                // Special handling for exit command
                if (trimmedCommand === 'exit') {
                    setTimeout(() => {
                        setLines([
                            { type: 'output', text: 'Terminal session ended.' },
                            { type: 'output', text: 'Reload page to restart.' },
                        ]);
                    }, 3000);
                }
            }, Math.random() * 500 + 200); // Random delay between 200-700ms
        } else {
            addLines([
                `Command not found: ${trimmedCommand}`,
                'Type "help" to see available commands.',
            ], 'error');
        }
    }, [addLine, addLines, commandHistory]);

    const handleInputSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentInput.trim() && !isTyping) {
            executeCommand(currentInput);
            setCurrentInput('');
            setCursorPosition(0); // Reset cursor position when input is cleared
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setCurrentInput(commandHistory[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex !== -1) {
                const newIndex = historyIndex + 1;
                if (newIndex >= commandHistory.length) {
                    setHistoryIndex(-1);
                    setCurrentInput('');
                } else {
                    setHistoryIndex(newIndex);
                    setCurrentInput(commandHistory[newIndex]);
                }
            }
        }
        // Update cursor position after any key press
        requestAnimationFrame(updateCursorPosition);
    };

    // Auto-scroll to bottom when new lines are added
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [lines]);

    // Focus input when terminal is clicked
    const handleTerminalClick = () => {
        if (inputRef.current && !isTyping) {
            inputRef.current.focus();
        }
    };

    return (
        <Flex
            direction="column"
            className={`${styles.terminal} ${className || ''}`}
            onClick={handleTerminalClick}
        >
            <div className={styles.header}>
                <div className={styles.controls}>
                    <div className={styles.dot} style={{ backgroundColor: '#ff5f57' }}></div>
                    <div className={styles.dot} style={{ backgroundColor: '#ffbd2e' }}></div>
                    <div className={styles.dot} style={{ backgroundColor: '#28ca42' }}></div>
                </div>
                <Text variant="body-default-s" className={styles.title}>
                    ayden@portfolio:~$
                </Text>
            </div>
            
            <div ref={terminalRef} className={styles.content}>
                {lines.map((line, index) => (
                    <div key={index} className={`${styles.line} ${styles[line.type]}`}>
                        <Text variant="code-default-s" className={styles.text}>
                            {line.text}
                        </Text>
                    </div>
                ))}
                
                {!isTyping && (
                    <form onSubmit={handleInputSubmit} className={styles.inputLine}>
                        <Text variant="code-default-s" className={styles.prompt}>
                            $&nbsp;
                        </Text>
                        <div className={styles.inputContainer}>
                            <input
                                ref={inputRef}
                                type="text"
                                value={currentInput}
                                onChange={(e) => {
                                    setCurrentInput(e.target.value);
                                    // Use requestAnimationFrame for better timing
                                    requestAnimationFrame(updateCursorPosition);
                                }}
                                onKeyDown={handleKeyDown}
                                onKeyUp={updateCursorPosition}
                                onClick={updateCursorPosition}
                                className={styles.input}
                                placeholder="Type a command..."
                                autoFocus
                                disabled={isTyping}
                            />
                            <span 
                                ref={hiddenSpanRef}
                                className={styles.hiddenSpan}
                                aria-hidden="true"
                            />
                            <span 
                                className={styles.cursor}
                                style={{ left: `${cursorPosition}px` }}
                            />
                        </div>
                    </form>
                )}
                
                {isTyping && (
                    <div className={styles.inputLine}>
                        <Text variant="code-default-s" className={styles.prompt}>
                            $&nbsp;
                        </Text>
                        <span className={styles.typing}>...</span>
                    </div>
                )}
            </div>
        </Flex>
    );
};

export default Terminal;
