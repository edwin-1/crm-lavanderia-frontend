import React, {Fragment, useState} from "react";
import clienteAxios from "../../config/axios";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function NuevoCliente({history}){

    const navigate = useNavigate();

    //cliente = state, guardarCliente = funcion para guardar cliente
    const[cliente, guardarCliente] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: ''
    });

    //leer los datos del formulario
    const actualizarState = e => {
        //almacenar lo que el usuario escribe en el state
        guardarCliente({
            //obtener una copia del state actual
            ...cliente,
            [e.target.name] : e.target.value
        })
    }

    //añade en la REST API un nuevo cliente
    const agregarCliente = e => {
        e.preventDefault();

        //enviar peticion
        clienteAxios.post('/clientes', cliente)
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
                    'Se agrego el cliente correctamente',
                    res.data.mensaje,
                    'success'
                )
            }

            //redireccionar
            navigate('/');
        });
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

            <h1>Nuevo Cliente</h1>

            <form onSubmit={agregarCliente}>

                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Cliente" name="nombre" 
                    onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Apellido Cliente" name="apellido"
                    onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Email Cliente" name="email"
                    onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel" placeholder="Teléfono Cliente" name="telefono"
                    onChange={actualizarState} />
                </div>

                <div className="enviar">
                    <input type="submit" 
                    className="btn btn-azul" value="Agregar Cliente"
                    disabled={ validarCliente() } onClick={agregarCliente}/>
                </div>

            </form>

        </Fragment>
    )
}

//HOC, es una funcion que tome un componente y retorna un nuevo componente
export default NuevoCliente;