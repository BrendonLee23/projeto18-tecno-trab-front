import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
/* import LoadingSpin from 'react-loader-spinner'; */
import { useState } from "react";
import axios from "axios";

export default function SignUpPage() {



  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  console.log(nome)
  const navigate = useNavigate();

  function refreshOnError() {
    window.location.reload(false);
  }

  function registerUser(e) {

    e.preventDefault();
    
    if(senha !== confirm){
      alert("Digite a mesma senha")
      return
    }

    setLoading(true);
    const promise = axios.post(`${import.meta.env.VITE_API_URL}/cadastro`, {
      email: email,
      nome: nome,
      senha: senha,
      confirm: confirm
    });

    promise.then(response => {
      setLoading(false);
      const { data } = response;
      console.log(data);
      navigate('/');
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
        <MyWalletLogo />
        <input data-test="name" type={'text'} placeholder={'Nome'} value={nome} onChange={(e) => setNome(e.target.value)} />
        <input data-test="email" type={'email'} placeholder={'E-mail'} value={email} onChange={(e) => setEmail(e.target.value)} />
        <input data-test="password" type={'password'} placeholder={'Senha'} value={senha} onChange={(e) => setSenha(e.target.value)} />
        <input data-test="conf-password" type={'password'} placeholder={'Confirme a senha'} value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        <button data-test="sign-up-submit" >
          {loading ? (<div>Caregando...</div>) : (
            'CADASTRAR'
          )
          }
        </button>
      </form>

      <Link to='/'>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
