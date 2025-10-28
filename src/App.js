import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Trash2, Database } from 'lucide-react';

export default function MiniRedis() {
  const [store, setStore] = useState({
    name: "Vikas Shakuntala B. Gavandi",
    title: "Software Engineer / Visualiser",
    contact: "9172656043 | vikasgavandi.dev@gmail.com",
    github: "github.com/vikasgavandi",
    linkedin: "linkedin.com/in/vikas-gavandi-689163289/",
    summary: "With 6+ years as a UX/UI and software developer and 13+ years in diverse domains, I specialize in clean, scalable web applications covering UI/UX, design, ads, and full-stack development. A collaborative problem-solver and aspiring software architect focused on innovation and efficiency.",
    skills: "NodeJS, Golang, Angular, PHP, JavaScript, AWS, MySQL, MongoDB, HTML, CSS, Figma, Miro, Adobe Creative Suite, AutoCAD, CICD",
    softskills: "Leadership, Problem Solving, Communication, Time Management, Collaboration, Organization",
    experience_alembic: "Alembic Pharmaceuticals Ltd | Senior Software Developer (Figma, Miro, NodeJS, Golang, AWS, Angular, PHP) | May 2021 – Feb 2025",
    experience_knoxx: "KnoxxFoods Pty Ltd (Remote / Australia) | Creative Visualiser / Software Developer (NodeJS, Golang, GCP, Creative Suite, OpenAI) | Mar 2025 – Present",
    experience_fancyfluff: "FancyFluff (Star Born LLP) | Motion & Sr. Web Designer (Figma, NodeJS, Photoshop, InDesign) | Aug 2020 – Oct 2021",
    experience_grey: "Grey Lifescience (Aramuc Pvt Ltd) | Web & UI Developer (Figma, Photoshop, InDesign, Web Designing) | Jan 2018 – Sep 2020",
    experience_shine: "Shine Art Press | Graphic Designer (CorelDraw, Photoshop, Communication) | Jan 2012 – Jan 2018",
    experience_mbt: "Maharashtra Buland Times | Graphic Designer & Typist (QuarkXPress, Photoshop, CorelDraw, Illustrator) | Aug 2016 – Jan 2018",
    education_bsc: "B.Sc (IT) | Symbiosis International University | 2008 – 2011 | Grade A",
    education_diploma: "Diploma in Software Programming | Mumbai Software Institute | 2010 – 2012 | Grade A",
    education_typography: "Typography | Mumbai Software Institute | 2013 – 2014 | Grade A",
    certifications: "Scaler (2023): High-Level Design of Cab Booking Apps, Monolithic & Microservice Architecture, Low-Level Design of Payment Apps, High-Level Design of OTT Platform",
    npm_packages: "easy-package-logger, ratelimitsense, logsupd (ongoing)",
    personal: "Gender: Male | Nationality: Indian | Marital Status: Unmarried",
  });

  const [history, setHistory] = useState([
    { type: 'system', text: 'Resume Redis v1.0 - Interactive Resume Terminal' },
    { type: 'output', text: `╔════════════════════════════════════════════════════════════════════════╗
║                        AVAILABLE COMMANDS                              ║
╚════════════════════════════════════════════════════════════════════════╝

┌─ QUERY COMMANDS ───────────────────────────────────────────────────────
│
│ ▸ GETALL              Display complete resume with all sections
│ ▸ GET <key>           Get value of a specific key
│ ▸ KEYS <pattern>      List keys matching pattern (* for all)
│ ▸ DBSIZE              Count total number of keys in database
│
└────────────────────────────────────────────────────────────────────────

┌─ MODIFICATION COMMANDS ────────────────────────────────────────────────
│
│ ▸ SET <key> <value>   Set key to value
│ ▸ DEL <key> [...]     Delete one or more keys
│
└────────────────────────────────────────────────────────────────────────

┌─ UTILITY COMMANDS ─────────────────────────────────────────────────────
│
│ ▸ CLEAR               Clear terminal history
│ ▸ HELP                Show this command list
│ ▸ GAME                Play Snake game (use arrow keys)
│
└────────────────────────────────────────────────────────────────────────

┌─ QUICK START EXAMPLES ─────────────────────────────────────────────────
│
│ Try these:
│   • GETALL                    → View complete resume
│   • GET name                  → View name
│   • GET summary               → View professional summary
│   • KEYS experience*          → List all experience entries
│   • KEYS education*           → List all education entries
│   • GET experience_knoxx      → View current position
│
└────────────────────────────────────────────────────────────────────────

💡 Start by typing: GETALL` }
  ]);
  const [input, setInput] = useState('');
  const outputRef = useRef(null);
  const [gameActive, setGameActive] = useState(false);
  const [snake, setSnake] = useState([[5, 5]]);
  const [food, setFood] = useState([10, 10]);
  const [direction, setDirection] = useState('RIGHT');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameInterval = useRef(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const generateFood = (snakeBody) => {
    let newFood;
    do {
      newFood = [
        Math.floor(Math.random() * 20),
        Math.floor(Math.random() * 20)
      ];
    } while (snakeBody.some(segment => segment[0] === newFood[0] && segment[1] === newFood[1]));
    return newFood;
  };

  const startGame = () => {
    setGameActive(true);
    setSnake([[5, 5]]);
    setFood([10, 10]);
    setDirection('RIGHT');
    setScore(0);
    setGameOver(false);
  };

  const stopGame = () => {
    setGameActive(false);
    if (gameInterval.current) {
      clearInterval(gameInterval.current);
    }
  };

  useEffect(() => {
    if (gameActive && !gameOver) {
      gameInterval.current = setInterval(() => {
        setSnake(prevSnake => {
          const head = [...prevSnake[0]];
          
          switch (direction) {
            case 'UP': head[1] -= 1; break;
            case 'DOWN': head[1] += 1; break;
            case 'LEFT': head[0] -= 1; break;
            case 'RIGHT': head[0] += 1; break;
          }

          // Check wall collision
          if (head[0] < 0 || head[0] >= 20 || head[1] < 0 || head[1] >= 20) {
            setGameOver(true);
            return prevSnake;
          }

          // Check self collision
          if (prevSnake.some(segment => segment[0] === head[0] && segment[1] === head[1])) {
            setGameOver(true);
            return prevSnake;
          }

          const newSnake = [head, ...prevSnake];

          // Check food collision
          if (head[0] === food[0] && head[1] === food[1]) {
            setScore(prev => prev + 10);
            setFood(generateFood(newSnake));
            return newSnake;
          }

          newSnake.pop();
          return newSnake;
        });
      }, 150);

      return () => clearInterval(gameInterval.current);
    }
  }, [gameActive, direction, food, gameOver]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameActive) return;
      
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setDirection(prev => prev !== 'DOWN' ? 'UP' : prev);
          break;
        case 'ArrowDown':
          e.preventDefault();
          setDirection(prev => prev !== 'UP' ? 'DOWN' : prev);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setDirection(prev => prev !== 'RIGHT' ? 'LEFT' : prev);
          break;
        case 'ArrowRight':
          e.preventDefault();
          setDirection(prev => prev !== 'LEFT' ? 'RIGHT' : prev);
          break;
        case 'Escape':
          stopGame();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameActive]);

  const executeCommand = (cmd) => {
    const parts = cmd.trim().split(/\s+/);
    const command = parts[0]?.toUpperCase();
    const args = parts.slice(1);

    let result = '';
    let newStore = { ...store };

    switch (command) {
      case 'GET':
        if (args.length !== 1) result = '(error) ERR wrong number of arguments for GET';
        else {
          if (newStore[args[0]]) {
            const key = args[0];
            const value = newStore[key];
            result = `┌─ ${key.toUpperCase().replace(/_/g, ' ')} ───\n│\n│ ${value}\n│\n└${'─'.repeat(50)}`;
          } else {
            result = '(nil)';
          }
        }
        break;

      case 'KEYS':
        const pattern = args[0] || '*';
        const keys = Object.keys(newStore);
        if (pattern === '*') {
          result = keys.length === 0 ? '(empty array)' : keys.map((k, i) => `${i + 1}) "${k}"`).join('\n');
        } else {
          const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
          const matched = keys.filter(k => regex.test(k));
          result = matched.length === 0 ? '(empty array)' : matched.map((k, i) => `${i + 1}) "${k}"`).join('\n');
        }
        break;

      case 'SET':
        if (args.length < 2) result = '(error) ERR wrong number of arguments for SET';
        else {
          const key = args[0];
          const value = args.slice(1).join(' ');
          newStore[key] = value;
          result = 'OK';
        }
        break;

      case 'DEL':
        if (args.length === 0) result = '(error) ERR wrong number of arguments for DEL';
        else {
          let count = 0;
          args.forEach(k => {
            if (newStore[k]) {
              delete newStore[k];
              count++;
            }
          });
          result = `(integer) ${count}`;
        }
        break;

      case 'DBSIZE':
        result = `(integer) ${Object.keys(newStore).length}`;
        break;

      case 'GETALL':
        const sections = {
          'PERSONAL INFO': ['name', 'title', 'contact', 'github', 'linkedin', 'personal'],
          'SUMMARY': ['summary'],
          'TECHNICAL SKILLS': ['skills'],
          'SOFT SKILLS': ['softskills'],
          'EXPERIENCE': ['experience_knoxx', 'experience_alembic', 'experience_fancyfluff', 'experience_grey', 'experience_shine', 'experience_mbt'],
          'EDUCATION': ['education_bsc', 'education_diploma', 'education_typography'],
          'CERTIFICATIONS': ['certifications'],
          'NPM PACKAGES': ['npm_packages']
        };
        
        let output = [];
        output.push('╔════════════════════════════════════════════════════════════════════════╗');
        output.push('║                         PROFESSIONAL RESUME                            ║');
        output.push('╚════════════════════════════════════════════════════════════════════════╝');
        
        Object.entries(sections).forEach(([section, keys]) => {
          output.push(`\n┌─ ${section} ${'─'.repeat(Math.max(0, 70 - section.length))}`);
          keys.forEach(key => {
            if (newStore[key]) {
              const label = key.replace(/_/g, ' ').toUpperCase();
              output.push(`│`);
              output.push(`│ ▸ ${label}`);
              output.push(`│   ${newStore[key]}`);
            }
          });
          output.push(`└${'─'.repeat(72)}`);
        });
        
        output.push('\n╔════════════════════════════════════════════════════════════════════════╗');
        output.push('║  Type "HELP" for more commands | Redis Resume v1.0                    ║');
        output.push('╚════════════════════════════════════════════════════════════════════════╝');
        result = output.join('\n');
        break;

      case 'HELP':
        result = `Available commands:
  GET key            - Get value of key
  GETALL             - Display all resume data
  SET key value      - Set key to value
  DEL key [key ...]  - Delete keys
  KEYS pattern       - List keys
  DBSIZE             - Count keys
  CLEAR              - Clear terminal
  GAME               - Play Snake game 🎮
  HELP               - Show this help

Try: GETALL | GET name | KEYS experience* | GAME`;
        break;

      case 'CLEAR':
        setHistory([]);
        return;

      case 'GAME':
        startGame();
        result = '🎮 Snake Game launched! Use arrow keys to play. Press ESC to exit.';
        break;

      default:
        result = `(error) ERR unknown command '${command}'`;
    }

    setStore(newStore);
    setHistory(prev => [
      ...prev,
      { type: 'input', text: cmd },
      { type: 'output', text: result }
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setInput('');
    }
  };

  const clearAll = () => {
    setHistory([
      { type: 'system', text: 'Resume Redis v1.0 - Interactive Resume Terminal' },
      { type: 'output', text: `╔════════════════════════════════════════════════════════════════════════╗
║                        AVAILABLE COMMANDS                              ║
╚════════════════════════════════════════════════════════════════════════╝

┌─ QUERY COMMANDS ───────────────────────────────────────────────────────
│
│ ▸ GETALL              Display complete resume with all sections
│ ▸ GET <key>           Get value of a specific key
│ ▸ KEYS <pattern>      List keys matching pattern (* for all)
│ ▸ DBSIZE              Count total number of keys in database
│
└────────────────────────────────────────────────────────────────────────

┌─ MODIFICATION COMMANDS ────────────────────────────────────────────────
│
│ ▸ SET <key> <value>   Set key to value
│ ▸ DEL <key> [...]     Delete one or more keys
│
└────────────────────────────────────────────────────────────────────────

┌─ UTILITY COMMANDS ─────────────────────────────────────────────────────
│
│ ▸ CLEAR               Clear terminal history
│ ▸ HELP                Show this command list
│
└────────────────────────────────────────────────────────────────────────

┌─ QUICK START EXAMPLES ─────────────────────────────────────────────────
│
│ Try these:
│   • GETALL                    → View complete resume
│   • GET name                  → View name
│   • GET summary               → View professional summary
│   • KEYS experience*          → List all experience entries
│   • KEYS education*           → List all education entries
│   • GET experience_knoxx      → View current position
│
└────────────────────────────────────────────────────────────────────────

💡 Start by typing: GETALL` }
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 p-6 font-mono">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Database className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Resume Redis</h1>
          </div>
          <button
            onClick={clearAll}
            className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        </div>

        <div className="bg-black rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
          <div className="bg-gray-800 px-4 py-2 flex items-center gap-2 border-b border-gray-700">
            <Terminal className="w-4 h-4" />
            <span className="text-sm text-gray-300">Terminal</span>
          </div>

          <div ref={outputRef} className="h-96 overflow-y-auto p-4 space-y-2">
            {history.map((entry, idx) => (
              <div key={idx}>
                {entry.type === 'system' && <div className="text-blue-400"># {entry.text}</div>}
                {entry.type === 'input' && (
                  <div className="text-green-400">
                    <span className="text-yellow-400">redis&gt;</span> {entry.text}
                  </div>
                )}
                {entry.type === 'output' && (
                  <div className="text-gray-300 whitespace-pre-wrap ml-8 leading-relaxed">{entry.text}</div>
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-gray-700 p-4">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">redis&gt;</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                className="flex-1 bg-transparent outline-none text-green-400"
                placeholder="Enter command..."
                autoFocus
              />
            </div>
          </div>
        </div>

        <div className="mt-4 text-xs text-gray-500 text-center">
          Try: GETALL | GET name | KEYS * | KEYS experience* | GAME 🎮
        </div>
      </div>

      {gameActive && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="bg-gray-900 border-4 border-green-400 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-green-400 text-xl font-bold">🐍 SNAKE GAME</div>
              <div className="text-yellow-400 text-xl font-bold">Score: {score}</div>
            </div>
            
            <div className="bg-black border-2 border-gray-700 p-2">
              <div className="grid gap-0" style={{ 
                gridTemplateColumns: 'repeat(20, 20px)',
                gridTemplateRows: 'repeat(20, 20px)'
              }}>
                {Array.from({ length: 20 }).map((_, y) => 
                  Array.from({ length: 20 }).map((_, x) => {
                    const isSnake = snake.some(segment => segment[0] === x && segment[1] === y);
                    const isHead = snake[0] && snake[0][0] === x && snake[0][1] === y;
                    const isFood = food[0] === x && food[1] === y;
                    
                    return (
                      <div
                        key={`${x}-${y}`}
                        className={`w-5 h-5 ${
                          isHead ? 'bg-yellow-400' :
                          isSnake ? 'bg-green-400' :
                          isFood ? 'bg-red-500' :
                          'bg-gray-900'
                        }`}
                      />
                    );
                  })
                )}
              </div>
            </div>
            
            <div className="mt-4 text-center text-gray-400 text-sm">
              {gameOver ? (
                <div>
                  <div className="text-red-400 text-xl font-bold mb-2">GAME OVER!</div>
                  <div className="text-green-400 mb-2">Final Score: {score}</div>
                  <button 
                    onClick={startGame}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded mr-2"
                  >
                    Play Again
                  </button>
                  <button 
                    onClick={stopGame}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
                  >
                    Exit (ESC)
                  </button>
                </div>
              ) : (
                <div>
                  <div>Use Arrow Keys to move</div>
                  <div>Press ESC to exit</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}