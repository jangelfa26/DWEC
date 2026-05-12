import pool from '../config/db.js';

import s3 from '../config/s3.js';

import {
    PutObjectCommand,
    DeleteObjectCommand
} from "@aws-sdk/client-s3";

import crypto from 'crypto';

import path from 'path';

export const getAlumnos = async (req, res) => {

    try {

        const [rows] = await pool.query('SELECT * FROM alumno');

        res.json(rows);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};

export const crearAlumno = async (req, res) => {

    try {

        const { nombre, apellidos, localidad } = req.body;

        const archivo = req.file;

        if (!archivo) {

            return res.status(400).json({
                error: 'No hay imagen'
            });
        }

        const extension = path.extname(archivo.originalname);

        const nuevoNombre = `${crypto.randomUUID()}${extension}`;

        await s3.send(new PutObjectCommand({

            Bucket: process.env.AWS_BUCKET_NAME,

            Key: nuevoNombre,

            Body: archivo.buffer,

            ContentType: archivo.mimetype,

            ACL: 'public-read'

        }));

        await pool.query(
            `INSERT INTO alumno(nombre, apellidos, localidad, imagen)
             VALUES (?, ?, ?, ?)`,
            [nombre, apellidos, localidad, nuevoNombre]
        );

        res.json({
            mensaje: 'Alumno creado'
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};

export const eliminarAlumno = async (req, res) => {

    try {

        const { id } = req.params;

        // BUSCAR IMAGEN
        const [rows] = await pool.query(
            'SELECT imagen FROM alumno WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {

            return res.status(404).json({
                error: 'Alumno no encontrado'
            });
        }

        const nombreImagen = rows[0].imagen;
        await s3.send(new DeleteObjectCommand({

            Bucket: process.env.AWS_BUCKET_NAME,

            Key: nombreImagen

        }));

        await pool.query(
            'DELETE FROM alumno WHERE id = ?',
            [id]
        );

        res.json({
            mensaje: 'Alumno eliminado'
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};