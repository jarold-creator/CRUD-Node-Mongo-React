import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import APIInvoke from '../../archivoAPI/APIInvoke'
import swal from 'sweetalert';

const MostrarClientes = () => {

  const [clientes, setClientes] = useState([]);

  //obtiene los clientes
  const getClientes = async () => {
    const response = await APIInvoke.invokeGET(`/api/clientes`);

    setClientes(response.cliente);
  }

  useEffect(() => {
    getClientes();
  }, [])

  //eliminar clientes
  const eliminarClientes = async (e, idCliente) => {
    
    const response = await APIInvoke.invokeDELETE(`/api/clientes/${idCliente}`);

    if (response.msg === 'Cliente eliminado') {
      
      const msg = `El Cliente fue borrado correctamente.`;
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
      getClientes(); //actualizar la lista de clientes al eliminar
    } else {
      //mostar mensaje de error
      const msg = "El Cliente no fue borrado correctamente.";
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
          titulo={"Listado de Clientes"}
          breadCrumb1={"Inicio"}
          breadCrumb2={"Clientes"}
          ruta1={"/home"}
        />

        <section className="content">

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <Link 
                to={"/clientes/agregar"} 
                className="btn btn-block btn-primary btn-sm"
                title='Aca puede crear clientes'
                >
                Crear Clientes
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
                    <th className="text-center align-middle" style={{ width: '15%' }}>Nombres</th>
                    <th className="text-center align-middle" style={{ width: '15%' }}>Apellidos</th>
                    <th className="text-center align-middle" style={{ width: '15%' }}>Documento</th>
                    <th className="text-center align-middle" style={{ width: '20%' }}>Correo</th>
                    <th className="text-center align-middle" style={{ width: '10%' }}>Telefono</th>
                    <th className="text-center align-middle" style={{ width: '15%' }}>Direccion</th>
                    <th className="text-center align-middle" style={{ width: '10%' }}>Opciones</th>
                  </tr>
                </thead>
                <tbody className="text-center align-middle" >
                  {clientes.map((cliente, index) => (
                    <tr key={index}>
                      <td className="text-center align-middle"> {cliente.nombres} </td>
                      <td className="text-center align-middle"> {cliente.apellidos} </td>
                      <td className="text-center align-middle"> {cliente.documento} </td>
                      <td className="text-center align-middle"> {cliente.correo} </td>
                      <td className="text-center align-middle"> {cliente.telefono} </td>
                      <td className="text-center align-middle"> {cliente.direccion} </td>
                      <td>
                        <Link
                          to={`/clientes/editar/${cliente._id}`}
                          className="btn btn-outline-success m-1 fa-lg rounded-circle"
                          title='Editar Cliente'
                        >
                          <i className='fa-solid fa-pen'></i>
                        </Link>
                        <Link
                          to={`/clientes/eliminar/${cliente._id}`}
                          className="btn btn-outline-danger m-1 fa-lg"
                          title='Eliminar Cliente'
                          onClick={(e) => { e.preventDefault(); eliminarClientes(e, cliente._id) }}
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

export default MostrarClientes;