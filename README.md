# Passphrase Generator

A simple tool to generate memorable passphrase components using random four-letter English words.

## Features

- Generates three random four-letter words: one adjective, one noun, and one verb
- Words are displayed with capitalized first letters
- Clean, simple web interface
- Can also be used as a command-line tool

## Web Version

Visit the hosted version at: `https://yourusername.github.io/PhraseGen/`

## Command-Line Usage

```bash
python generate_passphrase.py
```

Example output:
```
Wise Duck Leap
```

## How It Works

The generator uses three pools of four-letter English words:
- **adjectives.txt** - descriptive words
- **nouns.txt** - people, places, things
- **verbs.txt** - action words

Each time you generate a passphrase, one random word is selected from each pool.

## Building Strong Passphrases

This tool provides memorable building blocks. To create a strong passphrase:
1. Take the three generated words
2. Add numbers, symbols, or additional words
3. Example: `Wise Duck Leap` → `Wise7Duck!Leap#2024`

## Deployment to GitHub Pages

1. Create a new repository on GitHub
2. Push this code to the repository
3. Go to Settings → Pages
4. Select the branch to deploy (usually `main`)
5. Your site will be live at `https://yourusername.github.io/repositoryname/`
