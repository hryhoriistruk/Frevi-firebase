const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

console.log('Checking env file at:', path.resolve(__dirname, '../.env.local'));

const requiredVars = [
    'FIREBASE_PROJECT_ID',
    'FIREBASE_CLIENT_EMAIL',
    'FIREBASE_PRIVATE_KEY'
];

let allPresent = true;

requiredVars.forEach(varName => {
    if (!process.env[varName]) {
        console.error(`❌ Missing: ${varName}`);
        allPresent = false;
    } else {
        console.log(`✅ Found: ${varName}`);
    }
});

if (!allPresent) {
    console.log('\nCurrent environment:', process.env);
    process.exit(1);
}