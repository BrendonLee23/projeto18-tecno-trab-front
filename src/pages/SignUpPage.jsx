import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components";
import logo from "../Assets/logo.png";
import { useState } from "react";
import axios from "axios";
import {MutatingDots} from 'react-loader-spinner'

export default function SignUpPage() {



  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirm, setConfirm] = useState('');
  const [born, setBorn] = useState(''); // New state for birthdate
  const [address, setAddress] = useState(''); // New state for address
  const [phoneNumber, setPhoneNumber] = useState(''); // New state for phone number
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  function refreshOnError() {
    window.location.reload(false);
  }

  function registerUser(e) {

    e.preventDefault();

    if (senha !== confirm) {
      alert("Digite a mesma senha")
      return
    }

    setLoading(true);
    const promise = axios.post(`${import.meta.env.VITE_API_URL}/signup`, {
      name: nome,
      email: email,
      password: senha,
      confirmPassword: confirm,
      born: born, // Use the born state
      address: address, // Use the address state
      phoneNumber: phoneNumber // Use the phoneNumber state
    });

    promise.then(response => {
      setLoading(false);
      const { data } = response;
      console.log(data);
      navigate('/login');
    })

    promise.catch(err => {
      setLoading(false);
      console.log(err);
      alert('Sentimos muito, mas correu um erro. Por favor, tente novamente!');
      refreshOnError();
    })

  }

  return (
    <SingUpContainer>
      <form onSubmit={registerUser} >
        <StyledImg src={logo} alt="img-logo" />
        <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
        <input type="password" placeholder="Confirme a senha" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        <input type="date" placeholder="Data de Nascimento" value={born} onChange={(e) => setBorn(e.target.value)} />
        <input type="text" placeholder="Endereço" value={address} onChange={(e) => setAddress(e.target.value)} />
        <input type="tel" placeholder="Número de Telefone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        <button data-test="sign-up-submit" >
          {loading ? (<MutatingDots
            height="100"
            width="100"
            color="#6a6a6a"
            secondaryColor='#cacaca'
            radius='12.5'
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />) : (
            'CADASTRAR'
          )
          }
        </button>
      </form>

      <StyledLink to='/login'>
        Já tem uma conta? Entre agora!
      </StyledLink>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 0;
  margin: 0 auto;
  input{
    height: 10px;
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