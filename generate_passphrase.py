#!/usr/bin/env python3
"""
Passphrase generator that selects random four-letter words from
adjective, noun, and verb pools.
"""

import random
import sys
from pathlib import Path


def load_words(filename):
    """Load words from a file, one per line."""
    filepath = Path(__file__).parent / filename
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            words = [line.strip() for line in f if line.strip()]
        return words
    except FileNotFoundError:
        print(f"Error: {filename} not found", file=sys.stderr)
        sys.exit(1)


def main():
    # Load word pools
    adjectives = load_words('adjectives.txt')
    nouns = load_words('nouns.txt')
    verbs = load_words('verbs.txt')

    # Validate word pools
    if not adjectives or not nouns or not verbs:
        print("Error: One or more word files are empty", file=sys.stderr)
        sys.exit(1)

    # Select random words
    adjective = random.choice(adjectives)
    noun = random.choice(nouns)
    verb = random.choice(verbs)

    # Output in lowercase
    print(f"{adjective} {noun} {verb}")


if __name__ == '__main__':
    main()
