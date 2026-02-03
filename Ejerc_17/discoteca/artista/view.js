const fs = require('fs');
const navbar = () => fs.readFileSync('./public/navbar.html', 'utf8');

module.exports = {
  list: artistas => `
<!DOCTYPE html>
<html><head><title>Artistas</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" rel="stylesheet">
</head><body>
${navbar()}
<div class="container mt-4">
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h1>Artistas</h1>
    <a href="/artista/form" class="btn btn-success"><i class="bi bi-plus-circle"></i> Nuevo</a>
  </div>
  <div class="row g-3">
    ${artistas.map(a => `
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm">
          <img src="${a.foto}" class="card-img-top" style="height:180px;object-fit:cover">
          <div class="card-body">
            <h6 class="card-title fw-bold">${a.nombre}</h6>
            <small class="text-muted">${a.pais} • ${a.genero}</small>
          </div>
          <div class="card-footer bg-transparent">
            <a href="/artista/${a.id}" class="btn btn-outline-primary btn-sm me-1"><i class="bi bi-eye"></i></a>
            <a href="/artista/edit/${a.id}" class="btn btn-outline-warning btn-sm me-1"><i class="bi bi-pencil"></i></a>
            <a href="/artista/delete/${a.id}" class="btn btn-outline-danger btn-sm" onclick="return confirm('¿Eliminar?')"><i class="bi bi-trash"></i></a>
          </div>
        </div>
      </div>
    `).join('')}
  </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script></body></html>`,


  form: (artista, error = '') => `
<!DOCTYPE html>
<html><head><title>${artista ? 'Editar' : 'Nuevo'} Artista</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" rel="stylesheet">
</head><body>
${navbar()}
<div class="container mt-5">
  <div class="row justify-content-center">
    <div class="col-lg-8">
      <div class="card shadow">
        <div class="card-header bg-primary text-white">
          <h3>${artista ? 'Editar' : 'Nuevo'} <i class="bi bi-person-plus"></i></h3>
        </div>
        <div class="card-body p-4">
          ${error ? `<div class="alert alert-danger">${error}</div>` : ''}
          <form method="POST" action="/artista${artista ? `/edit/${artista.id}` : '/form'}">
            <input type="hidden" name="id" value="${artista?.id || ''}">
            
            <div class="mb-4">
              <label class="form-label fw-bold">Nombre <span class="text-danger">*</span></label>
              <input type="text" name="nombre" class="form-control form-control-lg" value="${artista?.nombre || ''}" required>
            </div>
            
            <div class="row">
              <div class="col-md-6 mb-4">
                <label class="form-label">País</label>
                <input type="text" name="pais" class="form-control" value="${artista?.pais || ''}">
              </div>
              <div class="col-md-6 mb-4">
                <label class="form-label">Género</label>
                <input type="text" name="genero" class="form-control" value="${artista?.genero || ''}">
              </div>
            </div>
            
            <div class="mb-4">
              <label class="form-label">Año formación</label>
              <input type="number" name="fecha_formacion" class="form-control" value="${artista?.fecha_formacion || ''}" min="1900" max="2026">
            </div>
            
            <div class="mb-4">
              <label class="form-label">Foto URL</label>
              <input type="url" name="foto" class="form-control" value="${artista?.foto || ''}">
              ${artista?.foto ? `<img src="${artista.foto}" class="img-thumbnail mt-2" style="max-width:200px">` : ''}
            </div>
            
            <div class="d-grid gap-2 d-md-flex">
              <button type="submit" class="btn btn-success btn-lg px-4"><i class="bi bi-check-lg"></i> Guardar</button>
              <a href="/artistas" class="btn btn-secondary btn-lg px-4">Cancelar</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script></body></html>`,

  detail: (artista, albumes) => `
<!DOCTYPE html>
<html><head><title>${artista.nombre}</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" rel="stylesheet">
</head><body>
${navbar()}
<div class="container mt-4">
  <div class="row">
    <div class="col-md-4 text-center">
      <img src="${artista.foto}" class="img-fluid rounded shadow" style="max-height:300px">
    </div>
    <div class="col-md-8">
      <h1>${artista.nombre}</h1>
      <p><strong>País:</strong> ${artista.pais}</p>
      <p><strong>Género:</strong> ${artista.genero}</p>
      <p><strong>Formación:</strong> ${artista.fecha_formacion}</p>
      <h4>Álbumes:</h4>
      <div class="row">${albumes.map(a => `<div class="col-6 col-md-4 mb-2"><span class="badge bg-secondary">${a.titulo} (${a.anio})</span></div>`).join('') || '<p class="text-muted">Sin álbumes</p>'}</div>
      <a href="/artistas" class="btn btn-primary mt-3">Volver</a>
    </div>
  </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script></body></html>`,

  notFound: () => `
<!DOCTYPE html>
<html><head><title>404</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head><body>
${navbar()}
<div class="container mt-5 text-center">
  <div class="alert alert-warning">
    <h1><i class="bi bi-exclamation-triangle"></i> Artista no encontrado</h1>
    <a href="/artistas" class="btn btn-primary">Ver artistas</a>
  </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script></body></html>`
};
