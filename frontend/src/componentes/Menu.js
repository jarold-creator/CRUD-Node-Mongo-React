import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li className="nav-item">
                    <Link to={"/home"} className="nav-link">
                    <i className="fa-solid fa-house-chimney-window"></i>
                        <p className='mx-2'>Inicio</p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/clientes"} className="nav-link">
                        <i className="fa-solid fa-people-roof"></i>
                        <p className='mx-2'>Clientes</p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/productos"} className="nav-link">
                        <i className="fa-solid fa-people-carry-box"></i>
                        <p className='mx-2'>Productos</p>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Menu;
