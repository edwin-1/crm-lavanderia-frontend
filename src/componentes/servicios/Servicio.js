import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";

function Servicio({servicio}) {

    const {_id, nombre, precio, tipo} = servicio;

    //eliminar un servicio
    const eliminarServicio = id => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Un servicio eliminado no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'No, cancelar'
          }).then((result) => {
            if (result.value) {
              //eliminar en la rest api
              clienteAxios.delete(`/servicios/${id}`)
              .then(res => {
                if(res.status === 200){
                    Swal.fire(
                        'Eliminado',
                        res.data.mensaje,
                        'success'
                    )
                }
              })
            }
        })
    }

    return (
        <li className="producto">
            <div className="info-producto">
                <p className="nombre">{servicio.nombre}</p>
            </div>
            <div className="acciones">
                <Link to={`/servicios/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Servicio
                </Link>

                <button 
                    type="button" 
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => eliminarServicio(_id)}
                >
                    <i className="fas fa-times"></i>
                    Eliminar Servicio
                </button>
            </div>
        </li>
    )
}

export default Servicio;