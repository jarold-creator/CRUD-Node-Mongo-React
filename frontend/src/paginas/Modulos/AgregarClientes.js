  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import ContentHeader from '../../componentes/ContentHeader';
  import Footer from '../../componentes/Footer';
  import Navbar from '../../componentes/Navbar';
  import SidebarContainer from '../../componentes/SidebarContainer';
  import APIInvoke from '../../archivoAPI/APIInvoke';
  import swal from 'sweetalert';

  const AgregarCliente = () => {
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [documento, setDocumento] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');

    const navigate = useNavigate();

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

      const response = await APIInvoke.invokePOST(`/api/clientes`, nuevoCliente);

      if (response.message === 'cliente agregado') {
        swal({
          title: 'Información',
          text: 'Cliente agregado correctamente.',
          icon: 'success',
          buttons: { confirm: { className: 'btn btn-primary' } }
        });

        setNombres('');
        setApellidos('');
        setDocumento('');
        setCorreo('');
        setTelefono('');
        setDireccion('');

        navigate('/clientes');
      } else {
        swal({
          title: 'Error',
          text: 'Error al agregar cliente.',
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
            titulo={"Agregar Cliente"}
            breadCrumb1={"Inicio"}
            breadCrumb2={"Agregar Cliente"}
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
                    Agregar Cliente
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

  export default AgregarCliente;
