import { GetObjectCommand } from '@aws-sdk/client-s3';

import express from 'express';

import cors from 'cors';

import alumnosRoutes from './routes/rutasAlumnos.js';

import s3 from './config/s3.js';


const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static('public'));

app.use('/api/alumnos', alumnosRoutes);


app.get('/imagen/:key', async (req, res) => {

    try {

        const comando = new GetObjectCommand({

            Bucket: process.env.AWS_BUCKET_NAME,

            Key: req.params.key
        });

        const respuesta = await s3.send(comando);

        res.setHeader(
            'Content-Type',
            respuesta.ContentType || 'image/jpeg'
        );

        respuesta.Body.pipe(res);

    } catch (error) {

        console.log(error);

        res.status(404).send('Imagen no encontrada');
    }
});

const PORT = 3000;

app.listen(PORT, () => {

    console.log(`Servidor iniciado en puerto ${PORT}`);
});