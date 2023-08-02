import React, {Fragment, useState, useEffect} from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from '../layout/Spinner';

function EditarServicio(){

    const navigate = useNavigate();

    //obtener el id
    const {id} = useParams();
    //console.log(id);

    //cliente = state, datosServicio = funcion para guardar servicio
    const[servicio, guardarServicio] = useState({
        nombre: '',
        precio: '',
        tipo: ''
    });


    //useEffect, cuando el formulario carga
    useEffect(() => {
        //Query o consulta a la api
        const consultarApi = async () =>{
            const servicioConsulta = await clienteAxios.get(`/servicios/${id}`);
            guardarServicio(servicioConsulta.data)
        }

        consultarApi();
    }, [])

    //editar un servicio en la base de datos
    const editarServicio = async e => {
        e.preventDefault();

        //enviar peticion      
        try {

           const res =  await clienteAxios.put(`/servicios/${id}`, servicio,{  
            });

            //lanzar una alerta de satisfaccion
            if(res.status === 200){
                Swal.fire(
                    'Se Edito el servicio correctamente',
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

    //leer los datos del formulario
    const actualizarState = async e => {
        //almacenar lo que el usuario escribe en el state
        guardarServicio({
            //obtener una copia del state actual
            ...servicio,
            [e.target.name] : e.target.value
        })
    }

    //extraer los valores del state
    const {nombre, precio, tipo} = servicio;

    if(!nombre) return <Spinner />

    return (

        <Fragment>

            <h2>Editar Servicio</h2>

            <form onSubmit={editarServicio}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Producto" 
                    name="nombre" onChange={actualizarState} 
                    defaultValue={nombre}/>
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Editar Servicio" 
                    onSubmit={editarServicio}/>
                </div>
            </form>
        </Fragment>
    )
}

export default EditarServicio;