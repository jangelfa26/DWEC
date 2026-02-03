module.exports.list = albumes => `
<!DOCTYPE html>
<html><head><title>Álbumes</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" rel="stylesheet">
</head><body>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
  <div class="container">
    <a class="navbar-brand fw-bold" href="/">Discoteca Virtual</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><a class="nav-link" href="/albumes">Álbumes</a></li>
        <li class="nav-item"><a class="nav-link" href="/artistas">Artistas</a></li>
      </ul>
    </div>
  </div>
</nav>
<div class="container mt-4">
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h1>Lista de Álbumes</h1>
    <a href="/album/form" class="btn btn-success"><i class="bi bi-plus"></i> Nuevo</a>
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-hover">
      <thead class="table-dark">
        <tr><th></th><th>Título</th><th>Artista</th><th>Año</th><th>Acciones</th></tr>
      </thead>
      <tbody>
        ${albumes.map(a => `
          <tr>
            <td><img src="${a.foto}" width="50" class="rounded-circle"></td>
            <td><strong>${a.titulo}</strong></td>
            <td>${a.artista}</td>
            <td>${a.anio}</td>
            <td>
              <a href="/album/form/${a.id}" class="btn btn-sm btn-outline-primary"><i class="bi bi-pencil"></i></a>
              <a href="/album/delete/${a.id}" class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i></a>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script></body></html>
`;

module.exports.form = (album, artistas, error = '') => `
<!DOCTYPE html>
<html><head><title>${album ? 'Editar' : 'Nuevo'} Álbum</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" rel="stylesheet">
</head><body>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
  <div class="container">
    <a class="navbar-brand fw-bold" href="/">Discoteca Virtual</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><a class="nav-link" href="/albumes">Álbumes</a></li>
        <li class="nav-item"><a class="nav-link" href="/artistas">Artistas</a></li>
      </ul>
    </div>
  </div>
</nav>
<div class="container mt-4">
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card shadow">
        <div class="card-header bg-primary text-white">
          <h3 class="mb-0">${album ? 'Editar' : 'Nuevo'} Álbum</h3>
        </div>
        <div class="card-body">
          ${error ? `<div class="alert alert-danger">${error}</div>` : ''}
          <form method="POST" action="/album/save">
            <input type="hidden" name="id" value="${album?.id || ''}">
            
            <div class="mb-3">
              <label class="form-label">Título *</label>
              <input type="text" name="titulo" class="form-control" value="${album?.titulo || ''}" required>
            </div>
            
            <div class="mb-3">
              <label class="form-label">Año *</label>
              <input type="number" name="anio" class="form-control" value="${album?.anio || ''}" min="1500" max="2027" required>
            </div>
            
            <div class="mb-3">
              <label class="form-label">Artista</label>
              <select name="artistaId" class="form-select">
                <option value="">Selecciona...</option>
                ${artistas.map(a => `
                  <option value="${a.id}" ${album && a.id == album.artistaId ? 'selected' : ''}>${a.nombre}</option>
                `).join('')}
              </select>
            </div>
            
            <div class="mb-3">
              <label class="form-label">Foto URL</label>
              <input type="url" name="foto" class="form-control" value="${album?.foto || ''}" placeholder="https://picsum.photos/id/237/150/150">
            </div>
            
            ${album?.foto ? `<img src="${album.foto}" class="img-thumbnail mt-2" style="max-width:200px;max-height:200px">` : ''}
            
            <div class="d-grid gap-2 d-md-flex justify-content-md-start mt-4">
              <button type="submit" class="btn btn-success me-md-2"><i class="bi bi-save"></i> Guardar</button>
              <a href="/albumes" class="btn btn-secondary">Cancelar</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script></body></html>
`;
