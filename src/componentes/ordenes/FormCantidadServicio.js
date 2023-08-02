import React, { Fragment } from "react";

function FormCantidadServicio(props) {

    const { servicio, 
        restarServicios, 
        aumentarServicios, 
        restarKilo, 
        aumentarKilo, 
        index, 
        eliminarServicioOrden, 
    } = props;

    return (
        <Fragment>
            <li>
                <div className="texto-producto">
                    <p className="nombre">{servicio.nombre}</p>
                </div>
                <div className="acciones">
                    <div className="contenedor-cantidad">
                        <i className="fas fa-minus"
                            onClick={() => restarServicios(index)}
                        ></i>

                        <p>{servicio.cantidad}</p>

                        <i className="fas fa-plus"
                            onClick={() => aumentarServicios(index)}
                        ></i>

                        <i className="fas fa-minus"
                            onClick={() => restarKilo(index)}
                        ></i>
                        <p>{servicio.kilo}</p>

                        <i className="fas fa-plus"
                            onClick={() => aumentarKilo(index)}
                        ></i>

                    </div>

                    <button
                        type="button"
                        className="btn btn-rojo"
                        onClick={() => eliminarServicioOrden(servicio.servicio)}>
                        <i className="fas fa-minus-circle"></i>
                        Eliminar Orden
                    </button>
                </div>
            </li>
        </Fragment>
    )
}

export default FormCantidadServicio;