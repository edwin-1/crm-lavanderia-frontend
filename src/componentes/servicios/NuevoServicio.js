import React, { useState, Fragment } from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import { useNavigate } from "react-router-dom";

function NuevoServicio() {

    const navigate = useNavigate();

    //Servicios = state, guardarServicios = funcion para guardar servicio
    const [servicio, guardarServicio] = useState({
        nombre: '',
        precio: '',
        tipo: ''
    });

    //leer los datos del formulario
    const actualizarState = async e => {
        //almacenar lo que el usuario escribe en el state
        guardarServicio({
            //obtener una copia del state actual
            ...servicio,
            [e.target.name] : e.target.value
        })
    }

    //añade en la REST API un nuevo servicio
    const agregarServicio = async e => {
        e.preventDefault();

        //enviar peticion      
        try {

           const res =  await clienteAxios.post('/servicios', servicio,{  
            });

            //lanzar una alerta de satisfaccion
            if(res.status === 200){
                Swal.fire(
                    'Se agrego el servicio correctamente',
                    res.data.mensaje,
                    'success'
                )
            }

            //redireccionar
            navigate('/servicios');

        } catch (error) {
            console.log(error);
            //lanzar alerta de error
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: 'Vuelva a intentarlo'
            })
        }
    }

    return (
        <Fragment>
            <h2>Nuevo Servicio</h2>

            <form 
                onSubmit={agregarServicio}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Producto" 
                    name="nombre" onChange={actualizarState} />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Servicio" 
                    onClick={agregarServicio}/>
                </div>
            </form>
        </Fragment>
    )
}

export default NuevoServicio;