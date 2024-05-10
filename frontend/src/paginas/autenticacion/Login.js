import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import APIInvoke from '../../archivoAPI/APIInvoke.js';
import swal from 'sweetalert';

const Login = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    email: '',
    password: ''
  });

  const { email, password } = usuario;
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const IniciarSesion = async () => {
    if (password.length < 10) {
      const men = 'La contraseña debe tener al menos 10 caracteres';
      swal({
        title: 'Error',
        text: men,
        icon: 'error',
        buttons: {
          confirm: {
            text: 'OK',
            value: true,
            visible: true,
            className: 'btn btn-danger',
            closeModal: true
          }
        }
      });
    } else {
      const data = {
        email: usuario.email,
        password: usuario.password
      };

      const response = await APIInvoke.invokePOST('/api/auth', data);
      const mensaje = response.message;

      if (mensaje === 'el usuario no existe' || mensaje === 'contraseña no valida') {
        const msg = 'No es posible iniciar sesión, verifica tus credenciales';
        swal({
          title: 'Error',
          text: msg,
          icon: 'error',
          buttons: {
            confirm: {
              text: 'OK',
              value: true,
              visible: true,
              className: 'btn btn-danger',
              closeModal: true
            }
          }
        });
      } else {
        const jwt = response.token;
        localStorage.setItem('token', jwt);
        navigate('/Home');
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    IniciarSesion();
  };

  useEffect(() => {
    document.getElementById('email').focus();
  }, []);

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <Link to="#">
            <b>Iniciar</b> Sesión
          </Link>
        </div>

        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Bienvenido, Puedes Ingresar</p>
            <form onSubmit={onSubmit}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">                
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                />

                <div className="input-group-append">
                  <div className="input-group-text">
                    <span
                      className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                      onClick={togglePasswordVisibility}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                </div>
              </div>

              <div className="social-auth-links text-center mb-3">
                <button type="submit" className="btn btn-block btn-primary">
                  Ingresar
                </button>
                <Link to="/Registro" className="btn btn-block btn-danger">
                  Crear Cuenta
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;