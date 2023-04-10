const { json } = require('express');
const docentes = require('../../datos/docentes.json');

const getAllDocentes = (req, res) => {
    res.status(200).json(docentes);
}

const getDocenteByLegajo = (req, res) => {
    const legajo = req.params.legajo;
    const resultado = docentes.find(docentes => docentes.legajo == legajo);
    if (resultado) {
        res.status(200).json(resultado).status(200);
    } else {
        res.status(400).json({ mensaje: `El docente con legajo ${legajo} no fue encontrado` });
    }
}

const deleteDocenteByLegajo = (req, res) => {
    const legajo = req.params.legajo;
    const indice = docentes.findIndex(docentes => docentes.legajo == legajo)
    if (indice == -1) {
        res.status(404).json(
            {
                resultado: "La operacion de borrado no pudo ser realizada",
                mensaje: `El docente con legajo ${legajo} no fue encontrado`
            }
        )
    } else {
        const docente = docentes[indice];
        const resultado = docentes.splice(indice, 1);
        res.status(200).json(
            {
                resultado: "La operacion de borrado pudo realizarse con exito",
                docente: docente
            }
        )
    }
}

const createDocente = (req, res) => {
    const docentesData = req.body;
    const existe = docentes.find(docente => docente.legajo == docentesData.legajo)
    if (!existe) {
        if (!docentesData.legajo) {
            res.status(400).json(
                {
                    mensaje: "Falta completar legajo"
                }
            )
        } else if (!docentesData.nombre) {
            res.status(400).json({
                mensaje: "Falta completar nombre"
            })
        }
        if (docentesData.concursado && !docentesData.carrera) {
            res.status(400).json({
                mensaje: "No se puede tener curso, sin antes tener una carrera y materia asignadas"
            })
        } else if (docentesData.materias && !docentesData.concursado) {
            res.status(400).json({
                mensaje: "No se puede agregar materia/s, sin antes tener una carrera y curso asignados"
            })
        } else if ((docentesData.concursado && docentesData.carrera) && !docentesData.materias) {
            res.status(400).json({
                mensaje: "No se puede agregar carrera y curso, sin tambien agregar materia/s"
            })
        } else {
            docentes.push(docentesData)
            res.status(201).json({
                mensaje: "Docente creado con exito"
            })
        }
    } else {
        res.status(400).json({
            mensaje: `El docente con legajo ${docentesData.legajo} ya existe`
        })
    }
}

const updateDocente = (req, res) => {
    const legajo = req.params.legajo
    const docentesData = req.body
    const indice = docentes.findIndex(docentes => docentes.legajo == legajo)

    if (indice >= 0) {
            if (docentesData.legajo) {
                docentes[indice].legajo = docentesData.legajo
            } if (docentesData.nombre) {
                docentes[indice].nombre = docentesData.nombre
            } if (docentesData.carrera) {
                docentes[indice].carrera = docentesData.carrera
            } if (docentesData.concursado) {
                docentes[indice].concursado = docentesData.concursado
            } if (docentesData.materias){
                docentes[indice].materias = docentesData.materias
            }
            res.status(201).json({ "docente actualizado": docentes[indice] });
    } else {
        res.status(404).json({
            resultado: "La operacion de modificar no pudo ser realizada",
            mensaje: `El docente con legajo ${legajo} no fue encontrado`
        })
    }

    function comprobarIngresado(){
        if (docentesData.legajo && typeof docentesData.legajo !== 'number') {
            
        }
    }
}



module.exports = {
    getAllDocentes,
    getDocenteByLegajo,
    deleteDocenteByLegajo,
    createDocente,
    updateDocente
}