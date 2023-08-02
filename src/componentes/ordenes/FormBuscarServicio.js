import React from "react";

function FormBuscarServicio(props){
    
    return(
        
        <form 
            onSubmit={props.buscarServicio}
        >
            <legend>Busca un Producto y agrega una cantidad</legend>

            <div className="campo">
                <label>Servicios:</label>
                <input type="text" placeholder="Nombre Servicio" name="servicios" 
                onChange={props.leerDatosBusqueda}/>
            </div>

            <input type="submit" className="btn btn-azul btn-block"
            value="Buscar servicio" />

        </form>
    )

}

export default FormBuscarServicio;