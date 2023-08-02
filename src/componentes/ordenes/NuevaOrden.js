import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Swal from 'sweetalert2';
import FormBuscarServicio from './FormBuscarServicio';
import FormCantidadServicio from './FormCantidadServicio';

function NuevaOrden(props) {

    //obtener el id del cliente
    const { id } = useParams();
    //console.log(id);

    //state
    const [cliente, guardarCliente] = useState({});
    const [busqueda, guardarBusqueda] = useState('');
    const [servicios, guardarServicios] = useState([]);
    const [total, guardarTotal] = useState(0);

    //tipo = state, guadarTipo = funcion para guardar tipo
    const [tipo, guadarTipo] = useState({
        tipo: '',
    });

    //leer los datos del select 
    const actualizarState = e => {
        //almacenar lo que le usuario escribe en el state
        guadarTipo({
            //obtener una copia del state actual
            ...tipo,
            [e.target.name] : e.target.value
        })
    }

    //añade en la REST API un nuevo tipo
    const agregarTipo = e => {
        e.preventDefault();
    }

    useEffect(() => {

        //obtener el cliente
        const consultarApi = async () => {
            //consultar el cliente actual
            const resultado = await clienteAxios.get(`/clientes/${id}`);
            guardarCliente(resultado.data);
        }

        //llamar a la api
        consultarApi();

        //actualizar el total a pagar
        actualizarTotal();

    }, [servicios]);

    const buscarServicio = async e => {
        e.preventDefault();

        //obtener los servicios de la busqueda
        const resultadoBusqueda = await clienteAxios.post(`/servicios/busqueda/${busqueda}`);

        //si no hay resultados una alerta, contrario agregarlo al state
        if (resultadoBusqueda.data[0]) {

            let servicioResultado = resultadoBusqueda.data[0];
            //agregar la llave "servicio" (copia de id)
            servicioResultado.servicio = resultadoBusqueda.data[0]._id;
            servicioResultado.cantidad = 0;
            servicioResultado.kilo = 0;

            //ponerlo en el state
            guardarServicios([...servicios, servicioResultado]);

        } else {
            //no hay resultados
            Swal.fire({
                type: 'error',
                title: 'No Resultados',
                text: 'No hay resultados'
            })
        }
    }

    //almacenar una busqueda en el state
    const leerDatosBusqueda = e => {
        guardarBusqueda(e.target.value)
    }

    //actualizar la cantidad de servicios
    const restarServicios = i => {
        //copiar el arreglo original de servicios
        const todosServicios = [...servicios];

        //validar si esta en 0 no puede ir mas alla
        if (todosServicios[i].cantidad === 0) return;

        //decremento
        todosServicios[i].cantidad--;

        //almacenarlo en el state
        guardarServicios(todosServicios);
    }

    const aumentarServicios = i => {
        //copiar el arreglo para no mutar el original
        const todosServicios = [...servicios];

        //incremento
        todosServicios[i].cantidad++;

        //almacenarlo en el state
        guardarServicios(todosServicios);

    }

    const restarKilo = i => {
        //copiar el arreglo original de servicios
        const todosServicios = [...servicios];

        //validar si esta en 0 no puede ir mas alla
        if (todosServicios[i].kilo === 0) return;

        //decremento
        todosServicios[i].kilo--;

        //almacenarlo en el state
        guardarServicios(todosServicios);
    }

    const aumentarKilo = i => {
        //copiar el arreglo para no mutar el original
        const todosServicios = [...servicios];

        //incremento
        todosServicios[i].kilo++;

        //almacenarlo en el state
        guardarServicios(todosServicios);
    }

    //Eliminar un servicio del state
    const eliminarServicioOrden = id => {
        const todosServicios = servicios.filter(servicio => servicio.servicio !== id);

        guardarServicios(todosServicios);
    }

    //actualizar el total a pagar
    const actualizarTotal = () => {
        //si el arreglo de productos es igual a 0: el total es 00
        if (servicios.length === 0) {
            guardarTotal(0)
            return;
        }

        //calcular el nuevo total
        let nuevoTotal = 0;

        //recorret todos los servicios, sus kilos y precios
        servicios.map(servicio => nuevoTotal += (servicio.cantidad * 14 + servicio.kilo));

        //almacenar el total
        guardarTotal(nuevoTotal);
    }

    //almacena la orden en la base de datos
    const realizarPedido = async e => {
        e.preventDefault()

        //construir el objeto
        const orden = {
            "clientes": id,
            "orden": servicios,
            "total": total
        }

        console.log(orden);
    }

    return (
        <Fragment>
            <h2>Nuevo Pedido</h2>

            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>Nombre: {cliente.nombre} {cliente.apellido}</p>
                <p>Telefono: {cliente.telefono}</p>
            </div>

            <FormBuscarServicio
                buscarServicio={buscarServicio}
                leerDatosBusqueda={leerDatosBusqueda}
            />

            <ul className="resumen">
                {servicios.map((servicio, index) => (
                    <FormCantidadServicio
                        key={servicio.servicio}
                        servicio={servicio}
                        restarServicios={restarServicios}
                        aumentarServicios={aumentarServicios}
                        aumentarKilo={aumentarKilo}
                        restarKilo={restarKilo}
                        eliminarServicioOrden={eliminarServicioOrden}
                        agregarTipo={agregarTipo}
                        actualizarState={actualizarState}
                        index={index}
                    />
                ))}
            </ul>

            <p className="total">Total a pagar: <span>$ {total}</span></p>

            {total > 0 ? (
                <form onSubmit={realizarPedido}>
                    <input type="submit" className="btn btn-verde btn-block"
                        value="Realizar Pedido" />
                </form>
            ) : null}

            <div className="enviar">
                <input type="submit" className="btn btn-azul" value="Agregar Orden" />
            </div>

        </Fragment>
    )
}

export default NuevaOrden;