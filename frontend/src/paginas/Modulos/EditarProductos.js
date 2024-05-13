import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import APIInvoke from '../../archivoAPI/APIInvoke';
import swal from 'sweetalert';

const EditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [presentacion, setPresentacion] = useState('');
  const [marca, setMarca] = useState('');
  const [fechaVence, setFechaVence] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nuevoProducto = {
      nombre,
      presentacion,
      marca,
      fechaVence,
      cantidad,
      precio
    };

    const response = await APIInvoke.invokePUT(`/api/productos/${id}`, nuevoProducto);

    if (response.message === 'producto actualizado') {
      swal({
        title: 'Información',
        text: 'Producto actualizado correctamente.',
        icon: 'success',
        buttons: { confirm: { className: 'btn btn-primary' } }
      });

      setNombre('');
      setPresentacion('');
      setMarca('');
      setFechaVence('');
      setCantidad('');
      setPrecio('');

      await navigate('/productos');
    } else {
      swal({
        title: 'Error',
        text: 'Error al actualizar producto.',
        icon: 'error',
        buttons: { confirm: { className: 'btn btn-danger' } }
      });
    }
  };

  // Obtener datos del producto en función del ID
  useEffect(() =>{
    const fetchProduct = async ()=>{
      const response = await APIInvoke.invokeGET(`/api/productos/${id}`);
      if(response.productos){
        setNombre(response.productos.nombre);
        setPresentacion(response.productos.presentacion);
        setMarca(response.productos.marca);
        setFechaVence(response.productos.fechaVence);
        setCantidad(response.productos.cantidad);
        setPrecio(response.productos.precio);
      }
    };
    fetchProduct();
  },[id]);

  return (
    <div className="wrapper">
      <Navbar />
      <SidebarContainer />
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Editar Producto"}
          breadCrumb1={"Inicio"}
          breadCrumb2={"Editar Producto"}
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
                        onChange={(event)=>setNombre(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Presentación:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder='Ingrese Presentación'
                        value={presentacion}
                        onChange={(event) => setPresentacion(event.target.value)}
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
                        onChange={(event)=> setMarca(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Fecha de Vencimiento:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder='Ingrese fecha de vencimiento'
                        value={fechaVence}
                        onChange={(event) => setFechaVence(event.target.value)}
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
                        placeholder='Ingrese Cantidad Producto'
                        value={cantidad}
                        onChange={(event) => setCantidad(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Precio:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder='Ingrese Precio Producto'
                        value={precio}
                        onChange={(event) => setPrecio(event.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Actualizar Producto
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

export default EditarProducto;