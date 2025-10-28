# Resume Redis

An interactive terminal-style resume built with React that mimics Redis commands.

## Features

- **Redis-style Commands**: Use familiar Redis commands to explore resume data
- **Interactive Terminal**: Clean, terminal-like interface with command history
- **Snake Game**: Built-in Snake game for entertainment
- **Responsive Design**: Works on desktop and mobile devices

## Available Commands

- `GETALL` - Display complete resume
- `GET <key>` - Get specific resume field
- `KEYS <pattern>` - List keys matching pattern
- `SET <key> <value>` - Update resume data
- `DEL <key>` - Delete resume field
- `DBSIZE` - Count total fields
- `GAME` - Play Snake game
- `HELP` - Show command help
- `CLEAR` - Clear terminal

## Quick Start

Try these commands:
- `GETALL` - View complete resume
- `GET name` - View name
- `KEYS experience*` - List experience entries
- `GAME` - Play Snake game

## Live Demo

Visit: [https://vikasgavandi.github.io/resume-redis](https://vikasgavandi.github.io/resume-redis)

## Local Development

```bash
npm install
npm start
```

## Deployment

```bash
npm run build
npm run deploy
```