import React, {Fragment} from "react";

//ROUTING
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

/** LAYOUT*/
import Header from "./componentes/layout/Header";
import Navegacion from "./componentes/layout/Navegacion";

/** COMPONENTES */
/** CLIENTE */
import Clientes from "./componentes/clientes/Clientes";
import NuevoCliente from "./componentes/clientes/NuevoCliente";
import EditarCliente from "./componentes/clientes/EditarCliente";

/** SERVICIO */
import Servicios from "./componentes/servicios/Servicios";
import NuevoServicio from "./componentes/servicios/NuevoServicio";
import EditarServicio from "./componentes/servicios/EditarServicio";

/** NUEVA ORDEN */
import Ordenes from "./componentes/ordenes/Ordenes";
import NuevaOrden from "./componentes/ordenes/NuevaOrden";

function App(){
  return(
    <Router>
      <Fragment>
        <Header />

        <div className="grid contenedor contenido-principal">
            <Navegacion />

            <main className="caja-contenido col-9">
              <Routes>
                <Route exact path="/" element={<Clientes/>} />
                <Route exact path="/clientes/nuevo" element={<NuevoCliente/>} />
                <Route exact path="/clientes/editar/:id" element={<EditarCliente/>} />

                <Route exact path="/servicios" element={<Servicios/>} />
                <Route exact path="/servicios/nuevo" element={<NuevoServicio/>} />
                <Route exact path="/servicios/editar/:id" element={<EditarServicio/>} />

                <Route exact path="/ordenes" element={<Ordenes/>} />
                <Route exact path="/ordenes/nuevo/:id" element={<NuevaOrden />} />
              </Routes>
            </main>
        </div>

      </Fragment>
    </Router>
  )
}

export default App;