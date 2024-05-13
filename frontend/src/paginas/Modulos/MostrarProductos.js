import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import APIInvoke from '../../archivoAPI/APIInvoke'
import swal from 'sweetalert';

const MostrarProductos = () => {

  const [productos, setProductos] = useState([]);

  //obtiene los productos
  const getProductos = async () => {
    const response = await APIInvoke.invokeGET(`/api/productos`);

    setProductos(response.productos);
  }

  useEffect(() => {
    getProductos();
  }, [])

  //eliminar clientes
  const eliminarProductos = async (e, idProducto) => {
    
    const response = await APIInvoke.invokeDELETE(`/api/productos/${idProducto}`);

    if (response.msg === 'producto eliminado') {
      
      const msg = `El producto fue eliminado correctamente.`;
      swal({
        title: 'Información',
        text: msg,
        icon: 'success',
        buttons: {
          confirm: {
            text: 'Ok',
            value: true,
            visible: true,
            className: 'btn btn-primary',
            closeModal: true
          }
        }
      });
      getProductos(); //actualizar la lista de productos al eliminar
    } else {
      //mostar mensaje de error
      const msg = "El producto no fue borrado correctamente.";
      swal({
        title: 'Error',
        text: msg,
        icon: 'error',
        buttons: {
          confirm: {
            text: 'Ok',
            value: true,
            visible: true,
            className: 'btn btn-danger',
            closeModal: true
          }
        }
      });
    }

  }

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <SidebarContainer></SidebarContainer>
      <div className="content-wrapper">

        <ContentHeader
          titulo={"Listado de Productos"}
          breadCrumb1={"Inicio"}
          breadCrumb2={"Clientes"}
          ruta1={"/home"}
        />

        <section className="content">

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <Link 
                to={"/productos/agregar"} 
                className="btn btn-block btn-primary btn-sm"
                title='Aca puede crear productos'
                >
                Crear Productos
                </Link>
              </h3>
              <div className="card-tools">
                <button 
                type="button" 
                className="btn btn-tool" 
                data-card-widget="collapse" 
                title="Collapse"
                >
                  <i className="fas fa-minus" />
                </button>
                <button 
                type="button" 
                className="btn btn-tool" 
                data-card-widget="remove" 
                title="Remove">
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>
            <div className="card-body">
              <table className="table table-bordered table-striped table-responsive table-sm">
                <thead>
                  <tr>
                    <th className="text-center align-middle" style={{ width: '15%' }}>Nombre</th>
                    <th className="text-center align-middle" style={{ width: '15%' }}>Presentacion</th>
                    <th className="text-center align-middle" style={{ width: '15%' }}>Marca</th>
                    <th className="text-center align-middle" style={{ width: '20%' }}>Fecha Vencimiento</th>
                    <th className="text-center align-middle" style={{ width: '10%' }}>Cantidad</th>
                    <th className="text-center align-middle" style={{ width: '15%' }}>Precio</th>
                    <th className="text-center align-middle" style={{ width: '10%' }}>Opciones</th>
                  </tr>
                </thead>
                <tbody className="text-center align-middle" >
                  {productos.map((producto, index) => (
                    <tr key={index}>
                      <td className="text-center align-middle"> {producto.nombre} </td>
                      <td className="text-center align-middle"> {producto.presentacion} </td>
                      <td className="text-center align-middle"> {producto.marca} </td>
                      <td className="text-center align-middle"> {producto.fechaVence} </td>
                      <td className="text-center align-middle"> {producto.cantidad} </td>
                      <td className="text-center align-middle"> {producto.precio} </td>
                      <td>
                        <Link
                          to={`/productos/editar/${producto._id}`}
                          className="btn btn-outline-success m-1 fa-lg rounded-circle"
                          title='Editar Producto'
                        >
                          <i className='fa-solid fa-pen'></i>
                        </Link>
                        <Link
                          to={`/productos/eliminar/${producto._id}`}
                          className="btn btn-outline-danger m-1 fa-lg"
                          title='Eliminar Producto'
                          onClick={(e) => { e.preventDefault(); eliminarProductos(e, producto._id) }}
                        >
                          <i className='fa-solid fa-trash-can'></i>
                        </Link>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>

            </div>
          </div>

        </section>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default MostrarProductos;