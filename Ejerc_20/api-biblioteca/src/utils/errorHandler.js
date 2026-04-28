export function errorHandler(err, req, res, next) {
  console.error('Error:', err);

  const status = err.status || 500;

  res.status(status).json({
    error: err.message || 'Error interno del servidor'
  });
}

export function notFound(req, res, next) {
  res.status(404).json({
    error: 'Ruta no encontrada'
  });
}