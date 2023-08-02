import React, {Fragment, useState, useEffect} from "react";
import clienteAxios from "../../config/axios";
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

function EditarCliente(props){

    const navigate = useNavigate();

    //obtener el id
    const {id} = useParams();
    //console.log(id);

    //cliente = state, datosCliente = funcion para guardar cliente
    const[cliente, datosCliente] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: ''
    });

    //Query a la api
    const consultarApi = async () => {
        const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);

        //colocar en el state
        datosCliente(clienteConsulta.data);
    }

    //useEffect, cuando el formulario carga
    useEffect(() => {
        consultarApi();
    }, [])

    //leer los datos del formulario
    const actualizarState = e => {
        //almacenar lo que el usuario escribe en el state
        datosCliente({
            //obtener una copia del state actual
            ...cliente,
            [e.target.name] : e.target.value
        })
    }

    //envia una peticion por axios para actualizar el cliente
    const actualizarCliente = e => {
        e.preventDefault();

        //enviar peticion por axios
        clienteAxios.put(`/clientes/${cliente._id}`, cliente)
            .then(res => {
                //validar si hay errores de mongo
                if(res.data.code === 11000){
                    Swal.fire({
                        type: 'error',
                        title: 'Hubo un error',
                        text: 'Ese cliente ya esta registrado'
                    })
                }else{
                    Swal.fire(
                        'Correcto',
                        'Se actualizó correctamente',
                        'success'
                    )
                }

                //redirreccionar
                navigate('/');          
            })
    }

    //validar el formulario
    const validarCliente = () =>{
        //Destruturing
        const {nombre, apellido, email, telefono} = cliente;

        //revisar que las propiedades del state tengan contenido
        let valido = !nombre.length || !apellido.length || !email.length || !telefono.length;

        //return true o false
        return valido;
    }

    return(
        <Fragment>

            <h1>Editar Cliente</h1>

            <form onSubmit={actualizarCliente}>

                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Cliente" name="nombre" 
                    onChange={actualizarState} 
                    value={cliente.nombre}/>
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Apellido Cliente" name="apellido"
                    onChange={actualizarState} 
                    value={cliente.apellido}/>
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Email Cliente" name="email"
                    onChange={actualizarState} 
                    value={cliente.email}/>
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel" placeholder="Teléfono Cliente" name="telefono"
                    onChange={actualizarState} 
                    value={cliente.telefono}/>
                </div>

                <div className="enviar">
                    <input type="submit" 
                    className="btn btn-azul" value="Guardar Cambios"
                    disabled={ validarCliente() } onSubmit={ actualizarCliente }/>
                </div>

            </form>

        </Fragment>
    )
}

//HOC, es una funcion que tome un componente y retorna un nuevo componente
export default EditarCliente;