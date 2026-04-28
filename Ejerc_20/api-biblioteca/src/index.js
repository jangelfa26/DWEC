import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import autoresRoutes from './modules/autores/autoresRoutes.js';
import librosRoutes from './modules/libros/librosRoutes.js';

import { notFound, errorHandler } from './utils/errorHandler.js';



const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/autores', autoresRoutes);
app.use('/api/libros', librosRoutes);

app.get('/', (req, res) => {
    res.json({ mensaje: 'API funcionando' });
});

app.use(notFound);
app.use(errorHandler);
if (process.env.NODE_ENV !== 'production') {
    app.listen(3000, () => {
        console.log('Servidor en http://localhost:3000');
    });
}
export default app;