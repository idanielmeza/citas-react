import React, {Fragment, useState} from 'react';
import {v4 as uuid} from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    // Crear State de Citas
    const [cita, actualizarCita] = useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:'',
    });

    const [error, actualziarError] = useState(false);

    //Funcion que se ejecuta cada que el usuario escribe un input

    const actualizarState = (e)=>{

        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        })

    }

    //Extraer los valores

    const {mascota,propietario,fecha,hora,sintomas} = cita;

    //Cuando el usuario envia el Formulario

    const submitCita = (e)=>{
        e.preventDefault();

        // Validar campos
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){

            actualziarError(true);
            return;

        }
        //Eliminar mensaje de error
        actualziarError(false);

        //Asignar un ID
        cita.id = uuid();

        //Crear la cita
        crearCita(cita);


        //Reiniciar el form
        actualizarCita({
            mascota:'',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''
        })
    }

    return ( 
        <Fragment>

            <h2>Crear Cita</h2>

            { error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}

            <form
                onSubmit={submitCita}
            >
                <label>Nombre de la Mascota</label>
                <input
                    type='text'
                    name='mascota'
                    className='u-full-width'
                    placeholder='Nombre de la Mascota'
                    onChange={actualizarState}
                    value={mascota}
                />

                <label>Nombre de la Dueño</label>
                <input
                    type='text'
                    name='propietario'
                    className='u-full-width'
                    placeholder='Nombre de la Dueño'
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input
                    type='date'
                    name='fecha'
                    className='u-full-width'
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora</label>
                <input
                    type='time'
                    name='hora'
                    className='u-full-width'
                    onChange={actualizarState}
                    value={hora}
                />
                <label>Sintomas</label>
                <textarea
                    className='u-full-width'
                    name='sintomas'
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>
                <button
                    type='submit'
                    className='u-full-width button-primary'
                >Agregar Cita</button>
            </form>

        </Fragment>


     );
}
Formulario.propTypes ={
    crearCita: PropTypes.func.isRequired
}

export default Formulario;