let adjectives = [];
let nouns = [];
let verbs = [];

// Load word lists from files
async function loadWordLists() {
    try {
        const [adjResponse, nounResponse, verbResponse] = await Promise.all([
            fetch('adjectives.txt'),
            fetch('nouns.txt'),
            fetch('verbs.txt')
        ]);

        const adjText = await adjResponse.text();
        const nounText = await nounResponse.text();
        const verbText = await verbResponse.text();

        adjectives = adjText.split('\n').filter(word => word.trim().length > 0);
        nouns = nounText.split('\n').filter(word => word.trim().length > 0);
        verbs = verbText.split('\n').filter(word => word.trim().length > 0);

        console.log(`Loaded ${adjectives.length} adjectives, ${nouns.length} nouns, ${verbs.length} verbs`);
    } catch (error) {
        console.error('Error loading word lists:', error);
        document.getElementById('result').textContent = 'Error loading word lists';
    }
}

// Get random element from array
function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Capitalize first letter
function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

// Generate and display passphrase
function generatePassphrase() {
    if (adjectives.length === 0 || nouns.length === 0 || verbs.length === 0) {
        document.getElementById('result').textContent = 'Loading word lists...';
        return;
    }

    const adjective = randomChoice(adjectives);
    const noun = randomChoice(nouns);
    const verb = randomChoice(verbs);

    document.getElementById('result').textContent = `${adjective} ${noun} ${verb}`;

    // Show the copy button
    document.getElementById('copyBtn').classList.add('show');
}

// Copy passphrase to clipboard
async function copyToClipboard() {
    const resultText = document.getElementById('result').textContent;

    // Don't copy if no passphrase has been generated
    if (resultText === 'Click the button to generate' || resultText === 'Loading word lists...') {
        return;
    }

    try {
        await navigator.clipboard.writeText(resultText);

        // Visual feedback
        const copyBtn = document.getElementById('copyBtn');
        copyBtn.classList.add('copied');
        copyBtn.title = 'Copied!';

        // Reset after 2 seconds
        setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyBtn.title = 'Copy to clipboard';
        }, 2000);
    } catch (error) {
        console.error('Failed to copy:', error);
        alert('Failed to copy to clipboard');
    }
}

// Theme management
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.className = savedTheme;
    }
}

function toggleTheme() {
    const body = document.body;
    const currentTheme = body.className;

    if (currentTheme === 'dark-theme') {
        body.className = 'light-theme';
        localStorage.setItem('theme', 'light-theme');
    } else if (currentTheme === 'light-theme') {
        body.className = 'dark-theme';
        localStorage.setItem('theme', 'dark-theme');
    } else {
        // No theme set, user is on system default
        // Check what the system preference is and toggle to opposite
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            body.className = 'light-theme';
            localStorage.setItem('theme', 'light-theme');
        } else {
            body.className = 'dark-theme';
            localStorage.setItem('theme', 'dark-theme');
        }
    }
}

// Load word lists when page loads
loadWordLists();
// Initialize theme on page load
initTheme();
