import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { UserContext } from "../contexts/UserContext";
import logo from "../Assets/logo.png";
import {ThreeDots} from 'react-loader-spinner'
/* import LoadingSpin from 'react-loader-spinner'; */

export default function SignInPage() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext)

  const navigate = useNavigate();

  function loginUser(e) {

    e.preventDefault();

    setLoading(true);
    const promise = axios.post(`${import.meta.env.VITE_API_URL}/login`, {
      email: email,
      password: senha
    });

    promise.then(response => {
      setTimeout(() => {
        setLoading(false);
        const { token, userName } = response.data;
        console.log(response.data);
        setUser({ token, userName });
        localStorage.setItem('token', token);
        localStorage.setItem('userName', userName);
        navigate('/home');
      }, 4000);
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
          {loading ? (<ThreeDots
            height="30"
            width="50"
            color="#d7d7d7"
            position="center"
            secondaryColor='#222222'
            /* radius='4.5' */
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />) : (
            'Entrar'
          )
          }
        </button>
      </form>
      <StyledLink to='/signup' >
        Primeira vez? Cadastre-se!
      </StyledLink>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding-left: 35px;
  padding-right: 35px;
  padding-top: 20px;
  button{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  input:hover {
      opacity: 0.7;
  }
  button:hover{
    opacity: 0.8;
  }
`
const StyledImg = styled.img`
  width: 300px; /* Defina o tamanho desejado */
  height: 220px; /* Defina o tamanho desejado *//* Ajuste o espaçamento inferior conforme necessário */
  margin-top: -50px;
  position: relative;
  animation-name: example;
  animation-duration: 4s;
  animation-direction: reverse;
`
const StyledLink = styled(Link)`
  color: #818181; /* Defina a cor desejada */
  text-decoration: none; /* Remover sublinhado */
  font-size: 18px;
  :hover{
    opacity: 0.7;
  }
`;

