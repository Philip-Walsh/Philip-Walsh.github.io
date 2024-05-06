/* eslint-disable no-console */

const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.get('/assets/icons/:file', (req, res) => {
    const filePath = path.join(__dirname, 'assets', 'icons', req.params.file);
    res.sendFile(filePath, { headers: { 'Content-Type': 'image/svg+xml' } });
});
app.get('/assets/images/:file', (req, res) => {
    const filePath = path.join(__dirname, 'assets', 'images', req.params.file);
    res.sendFile(filePath, { headers: { 'Content-Type': 'image/png' } });
});

app.get('/styles/:file', (req, res) => {
    const filePath = path.join(__dirname, 'styles', req.params.file);
    res.sendFile(filePath, { headers: { 'Content-Type': 'text/css' } });
});
app.get('/styles/layout/:file', (req, res) => {
    const filePath = path.join(__dirname, 'styles/layout', req.params.file);
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

app.use('/ad', express.static(path.join(__dirname, 'ad')));


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

