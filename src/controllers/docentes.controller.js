const docentes = require('../../datos/docentes.json');

const getAllDocentes = (req, res) =>{
    res.status(200).json(docentes);
}

const getDocenteByLegajo = (req, res) =>{
    const legajo = req.params.legajo;
    const resultado = docentes.find(docentes => docentes.legajo == legajo);
    if (resultado) {
        res.status(200).json(resultado).status(200);
    }else{
        res.status(400).json({mensaje: `El docente con DNI = ${dni} no fue encontrado`});
    }
}

const deleteDocenteByDni = (req, res) => {
    const dni = req.params.dni;
    const indice = docentes.findIndex(docentes => docentes.dni == dni)
    if (indice==-1) {
        res.status(404).json(
            {
                resultado: "La operacion de borrado no pudo ser realizada",
                mensaje: `El docente con DNI ${dni} no fue encontrado`
            }
        )
    }else {
        const docente = docentes[indice];
        const resultado = docentes.splice(indice,1);
        res.status(200).json(
            {
                resultado: "La operacion de borrado pudo realizarse con exito",
                docente: docente
            }
        )
    }
}

const createDocente = (req, res) =>{
    const docentesData = req.body;
    const existe = docentes.find(docente => docente.dni ==docentesData.dni)
    if (!existe) {
        if (! docentesData.tiene) {
            
        }
    }
}

module.exports = {
    getAllDocentes,
    getDocenteByDni,
    deleteDocenteByDni,
    createDocente,
    //updateDocente
}