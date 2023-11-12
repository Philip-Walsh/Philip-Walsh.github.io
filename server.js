/* eslint-disable no-console */

const express = require('express');
const path = require('path');
const nodemon = require('nodemon');

const app = express();
const port = 3000;

app.get('/assets/:file', (req, res) => {
    const filePath = path.join(__dirname, 'assets', req.params.file);
    res.sendFile(filePath, { headers: { 'Content-Type': 'text/svg' } });
});

app.get('/styles/:file', (req, res) => {
    const filePath = path.join(__dirname, 'styles', req.params.file);
    res.sendFile(filePath, { headers: { 'Content-Type': 'text/css' } });
});

app.get('/scripts/:file', (req, res) => {
    const filePath = path.join(__dirname, 'scripts', req.params.file);
    res.sendFile(filePath, { headers: { 'Content-Type': 'application/javascript' } });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/projects', express.static(path.join(__dirname, 'projects')));

// Add more routes for additional directories as needed

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

if (process.env.NODE_ENV === 'development') {
    nodemon({
        script: 'server.js',
        ext: 'html js css',
        ignore: [],
    });

    nodemon.on('start', () => {
        console.log('Server has started');
    }).on('quit', () => {
        console.log('Server has quit');
        process.exit();
    }).on('restart', (files) => {
        console.log('Server restarted due to changes:', files);
    });
}
