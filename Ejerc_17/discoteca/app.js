const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);
app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(require('./artista/routes'));
app.use(require('./album/routes'));

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html><head><title>Discoteca</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" rel="stylesheet">
</head><body>
` + require('fs').readFileSync('public/navbar.html', 'utf8') + `
<div class="container mt-5 text-center">
  <div class="row justify-content-center">
    <div class="col-md-8">
      <h1 class="display-3 fw-bold text-white mb-4">Discoteca Virtual</h1>
      <p class="lead text-light mb-5">Gestiona tu colección de álbumes y artistas favoritos</p>
      <div class="d-grid gap-3 col-6 mx-auto col-md-4">
        <a href="/albumes" class="btn btn-primary btn-lg"><i class="bi bi-disc bi-2x"></i><br>Álbumes</a>
        <a href="/artistas" class="btn btn-success btn-lg"><i class="bi bi-mic bi-2x"></i><br>Artistas</a>
      </div>
    </div>
  </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script></body></html>
  `);
});



app.listen(3000);
