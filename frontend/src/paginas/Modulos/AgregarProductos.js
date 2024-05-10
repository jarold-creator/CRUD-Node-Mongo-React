import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import APIInvoke from '../../archivoAPI/APIInvoke';
import swal from 'sweetalert';

const AgregarProducto = () => {
  const [nombre, setNombre] = useState('');
  const [presentacion, setPresentacion] = useState('');
  const [marca, setMarca] = useState('');
  const [fechaVence, setFechaVence] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoProducto = {
      nombre,
      presentacion,
      marca,
      fechaVence,
      cantidad,
      precio
    };

    const response = await APIInvoke.invokePOST(`/api/productos`, nuevoProducto);

    if (response.message === 'producto agregado') {
      swal({
        title: 'Información',
        text: 'Producto agregado correctamente.',
        icon: 'success',
        buttons: { confirm: { className: 'btn btn-primary' } }
      });

      setNombre('');
      setPresentacion('');
      setMarca('');
      setFechaVence('');
      setCantidad('');
      setPrecio('');

      navigate('/productos');
    } else {
      swal({
        title: 'Error',
        text: 'Error al agregar producto.',
        icon: 'error',
        buttons: { confirm: { className: 'btn btn-danger' } }
      });
    }
  };

  return (
    <div className="wrapper">
      <Navbar />
      <SidebarContainer />
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Agregar Producto"}
          breadCrumb1={"Inicio"}
          breadCrumb2={"Agregar Producto"}
          ruta1={"/home"}
        />
        <section className="content">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>

                {/* Primera fila */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Nombre:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder='Ingrese Nombre Producto'
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Presentación:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder='Ingrese la Presentación'
                        value={presentacion}
                        onChange={(e) => setPresentacion(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Segunda fila */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Marca:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder='Ingrese Marca'
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Fecha Vencimiento:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder='Ingrese Fecha de vencimiento'
                        value={fechaVence}
                        onChange={(e) => setFechaVence(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Tercera fila */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Cantidad:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder='Ingrese Cantidad'
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Precio:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder='Ingrese el precio'
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Agregar Producto
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AgregarProducto;
