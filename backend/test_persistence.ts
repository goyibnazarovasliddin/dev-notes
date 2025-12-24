import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

const BASE_URL = 'http://localhost:5000/api/notes';
const FILE_PATH = path.join(__dirname, 'data/notes.json');

const run = async () => {
    try {
        console.log('--- START TEST ---');

        // 1. Create Note
        console.log('Creating note...');
        const res = await axios.post(BASE_URL, {
            title: 'Persistence Test',
            content: 'Checking if this writes to disk.'
        });
        console.log('Create Response Status:', res.status);
        const id = res.data.data.id;

        // 2. Fetch via API
        console.log('Fetching via API...');
        const res2 = await axios.get(BASE_URL);
        const notes = res2.data.data.notes;
        const found = notes.find((n: any) => n.id === id);
        console.log('Found in API?', !!found);

        // 3. Check File
        console.log('Checking file:', FILE_PATH);
        const fileContent = await fs.readFile(FILE_PATH, 'utf-8');
        console.log('File Content Length:', fileContent.length);
        console.log('File Content:', fileContent);

        const fileJson = JSON.parse(fileContent);
        const foundInFile = fileJson.find((n: any) => n.id === id);
        console.log('Found in File?', !!foundInFile);

    } catch (e: any) {
        console.error('Error:', e.message);
        if (e.response) console.error(e.response.data);
    }
};

run();
