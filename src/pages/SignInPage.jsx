import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { UserContext } from "../contexts/UserContext";
import logo from "../Assets/logo.png";
/* import LoadingSpin from 'react-loader-spinner'; */

export default function SignInPage() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(UserContext)

  const navigate = useNavigate();

  function loginUser(e) {

    e.preventDefault();

    setLoading(true);
    const promise = axios.post(`${import.meta.env.VITE_API_URL}/`, {
      email: email,
      senha: senha
    });

    promise.then(response => {
      setLoading(false);
      const { token, usuario } = response.data
      console.log(response.data);
      setUser({ token, usuario })
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('nome', response.data.usuario)
      navigate('/home');
    })

    promise.catch(err => {
      setLoading(false);
      console.log(err);
      alert('Sentimos muito, mas correu um erro. Por favor, tente novamente!)');
    })
  }

  return (
    <SingInContainer>
      <form>
        <StyledImg src={logo} alt="img-logo"/>
        <input data-test="email" type={'text'} placeholder={'E-mail'} value={email} onChange={(e) => setEmail(e.target.value)} />
        <input data-test="password" type={'password'} placeholder={'Senha'} value={senha} onChange={(e) => setSenha(e.target.value)} />
        <button data-test="sign-in-submit" onClick={loginUser}>
          {loading ? (<div>Caregando...</div>) : (
            'Entrar'
          )
          }
        </button>
      </form>
      <Link to='/cadastro' >
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const StyledImg = styled.img`
  width: 350px; /* Defina o tamanho desejado */
  height: 350px; /* Defina o tamanho desejado *//* Ajuste o espaçamento inferior conforme necessário */
  margin-bottom: -50px;
`