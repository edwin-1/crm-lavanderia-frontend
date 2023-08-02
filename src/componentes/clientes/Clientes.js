import React, {useEffect, useState, Fragment} from "react";

//importar cliente axios
import clienteAxios from "../../config/axios";

import Cliente from "./Cliente";

import { Link } from "react-router-dom";

//importancion de spinner
import Spinner from '../layout/Spinner'

function Clientes(){

    //trabajar con state
    //clientes = state, guardarCliente = funcion para guardar el state
    const [clientes, guardarClientes ] = useState([]);
 
    //Query a la api
    const consultarApi = async () => {
        const clientesConsulta = await clienteAxios.get('/clientes');
        
        //colocar el resultado en el state
        guardarClientes(clientesConsulta.data);
    }

    //use effect es similar componentidmount y willmount
    useEffect(() => {
        consultarApi();
    }, [clientes] );

    //spinner de carga
    if(!clientes.length) return <Spinner />

    return (
        <Fragment>

            <h1>Clientes</h1>

            <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente"> 
                <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>

            <ul className="listado-clientes"> 
                {clientes.map(cliente => (
                    <Cliente
                        key={cliente._id}
                        cliente={cliente}
                    />
                ))}
            </ul>
        </Fragment>
    )
}

export default Clientes;