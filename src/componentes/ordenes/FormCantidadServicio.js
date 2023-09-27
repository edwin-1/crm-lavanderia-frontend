import React, { Fragment, useState } from "react";

function FormCantidadServicio(props) {

    const options = ['Invididual', 'Matrimonial', 'Queen', 'King']

    const onOptionChangeHandler = (event) => {
        console.log(event.target.value);
    }

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
            <pre>
                {JSON.stringify(servicio, null, 3)}
            </pre>
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

                        <select name="tipo" onChange={onOptionChangeHandler}>
                            <option value="">--Seleccionar--</option>
                            
                            {options.map((option, index) => {
                                return <option key={index}>
                                    {option}
                                </option>
                            })}
                        </select>

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
