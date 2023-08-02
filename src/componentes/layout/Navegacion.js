import React from "react";

import { Link } from "react-router-dom";

const Navegacion = () => (
    <aside className="sidebar col-3">
        <h2>Administración</h2>

        <nav className="navegacion">
            <Link to={"/"} className="clientes">Clientes</Link>
            <Link to={"/servicios"} className="productos">Servicios</Link>
            <Link to={"/ordenes"} className="pedidos">Ordenes</Link>
        </nav>
    </aside>
);

export default Navegacion;