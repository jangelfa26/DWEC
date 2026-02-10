const express = require('express');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');

const indexRouter = require('./routes/index');
const librosRouter = require('./routes/libros');
const prestamosRouter = require('./routes/prestamos');

const app = express();

const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);
const accessLogStream = fs.createWriteStream(path.join(logsDir, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

app.use('/', indexRouter);
app.use('/', librosRouter);
app.use('/', prestamosRouter);

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));
