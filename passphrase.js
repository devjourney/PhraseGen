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

    const adjective = capitalize(randomChoice(adjectives));
    const noun = capitalize(randomChoice(nouns));
    const verb = capitalize(randomChoice(verbs));

    document.getElementById('result').textContent = `${adjective} ${noun} ${verb}`;
}

// Load word lists when page loads
loadWordLists();
