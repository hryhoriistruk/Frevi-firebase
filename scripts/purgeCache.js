const fs = require('fs');
const path = require('path');

const cleanDirs = [
    '.next',
    'node_modules',
    'package-lock.json',
    'yarn.lock'
];

console.log('🔥 Purging build cache...');
cleanDirs.forEach(dir => {
    const dirPath = path.join(process.cwd(), dir);
    if (fs.existsSync(dirPath)) {
        console.log(`Removing ${dir}`);
        fs.rmSync(dirPath, { recursive: true, force: true });
    }
});
console.log('✅ Cache purged successfully');