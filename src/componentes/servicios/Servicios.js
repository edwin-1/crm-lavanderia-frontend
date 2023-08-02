import React, {useEffect, useState, Fragment, useReducer} from "react";
import { Link  } from "react-router-dom";
//importancion de axios
import clienteAxios from "../../config/axios";

import Servicio from "./Servicio";

//importancion de spinner
import Spinner from '../layout/Spinner'

function Servicios(){

    //Servicios = state, guardarServicios = funcion para guardar servicio
    const [servicios, guardarServicios] = useState([]);

    //useEffect para consultar api cuando llegue
    useEffect(() => {
        
        //Query a la api
        const consultarApi = async () => {
            const serviciosConsulta = await clienteAxios.get('/servicios')
            guardarServicios(serviciosConsulta.data);
        }

        //llamando a la api
        consultarApi();

    }, [servicios]);

    //spinner de carga
    if(!servicios.length) return <Spinner />

    return (
        <Fragment>
            <h1>Servicios</h1>

            <Link to={"/servicios/nuevo"} className="btn btn-verde nvo-cliente"> 
                <i className="fas fa-plus-circle"></i>
                Nuevo Servicio
            </Link>

            <ul className="listado-productos">
                {servicios.map(servicio => (
                    <Servicio
                        key={servicio._id}
                        servicio={servicio}
                    />
                ))}
            </ul>
        </Fragment>
    )
}

export default Servicios;