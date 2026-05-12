import express from 'express';
import multer from 'multer';

import {
    getAlumnos,
    crearAlumno,
    eliminarAlumno
} from '../controllers/controladorAlumnos.js';

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage });

router.get('/', getAlumnos);

router.post('/', upload.single('imagen'), crearAlumno);

router.delete('/:id', eliminarAlumno);

export default router;