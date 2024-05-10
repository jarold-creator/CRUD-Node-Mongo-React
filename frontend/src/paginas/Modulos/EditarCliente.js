import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import APIInvoke from '../../archivoAPI/APIInvoke';
import swal from 'sweetalert';

const EditarCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [documento, setDocumento] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoCliente = {
      nombres,
      apellidos,
      documento,
      correo,
      telefono,
      direccion
    };

    const response = await APIInvoke.invokePUT(`/api/clientes/${id}`, nuevoCliente);

    if (response.message === 'cliente actualizado') {
      swal({
        title: 'Información',
        text: 'Cliente actualizado correctamente.',
        icon: 'success',
        buttons: { confirm: { className: 'btn btn-primary' } }
      });

      setNombres('');
      setApellidos('');
      setDocumento('');
      setCorreo('');
      setTelefono('');
      setDireccion('');

      await navigate('/clientes');
    } else {
      swal({
        title: 'Error',
        text: 'Error al actualizar cliente.',
        icon: 'error',
        buttons: { confirm: { className: 'btn btn-danger' } }
      });
    }
  };

  // Obtener datos del cliente en función del ID
  useEffect(() => {
    const fetchClient = async () => {
      const response = await APIInvoke.invokeGET(`/api/clientes/${id}`);
      if (response.cliente) {
        setNombres(response.cliente.nombres);
        setApellidos(response.cliente.apellidos);
        setDocumento(response.cliente.documento);
        setCorreo(response.cliente.correo);
        setTelefono(response.cliente.telefono);
        setDireccion(response.cliente.direccion);
      }
    };

    fetchClient();
  }, [id]);

  return (
    <div className="wrapper">
      <Navbar />
      <SidebarContainer />
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Editar Cliente"}
          breadCrumb1={"Inicio"}
          breadCrumb2={"Editar Cliente"}
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
                      <label>Nombres:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder='Ingrese Nombres'
                        value={nombres}
                        onChange={(e) => setNombres(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Apellidos:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder='Ingrese Apellidos'
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Segunda fila */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Documento:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder='Ingrese Numero Documento'
                        value={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Correo:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder='Ingrese Correo'
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Tercera fila */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Telefono:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder='Ingrese Telefono'
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Direccion:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder='Ingrese una Dirección'
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Actualizar Cliente
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

export default EditarCliente;