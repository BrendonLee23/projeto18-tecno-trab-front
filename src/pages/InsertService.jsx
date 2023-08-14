import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components"
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { BiExit } from "react-icons/bi"
import IconLogo from "../Assets/icon-logo.png";

export default function InsertService() {

  const navigate = useNavigate();
  const { user } = useContext(UserContext)
  const usuarioLogado = localStorage.getItem('userName')
  const token = localStorage.getItem('token')
  console.log(user.token)
  const [novoNome, setNovoNome] = useState()
  const [novaImagem, setNovaImagem] = useState()
  const [novaDescricao, setNovaDescricao] = useState()

  function backToHome(){
    navigate('/home')
  }

  function deslogar() {
    localStorage.removeItem('userName')
    localStorage.removeItem('token')
    navigate('/login')
  }

  function finalizeEdit() {
    console.log('teste');
}

  useEffect(() => {

    if (!token) {
      navigate('/login')
      alert("Faça o login!")
      return
    }

    localStorage.getItem('token, data.token')

  }, [token])

  function finalizeEdit(e) {

    e.preventDefault();

    const config = {
      headers: {
        "authorization": `Bearer ${token}`,
      }
    }

    const body = {
      valor: valor,
      descricao: descricao
    }

    const promise = axios.post(`${import.meta.env.VITE_API_URL}/service/create`, body, config);

    promise.then(response => {
      console.log(response.data);
      localStorage.getItem('token, data.token')
      /* navigate('/home'); */
    })

    promise.catch(err => {
      console.log(err.message);
      alert('Erro ao realizar transação. Por favor, tente novamente!)');
    })
  }



  return (
    <ContainerEdit>
      <Header>
        <h1 data-test="user-name">Olá,  {usuarioLogado}</h1>
        <img onClick={backToHome} src={IconLogo} alt="icon-logo" />
        <div>
          <BiExit data-test="logout" onClick={deslogar} />
        </div>
      </Header>
      <form onSubmit={finalizeEdit}>
        <input type={'text'} placeholder={'Nome'} value={novoNome} onChange={(e) => setNovoNome(e.target.value)} />
        <input type={'text'} placeholder={'Imagem'} value={novaImagem} onChange={(e) => setNovaImagem(e.target.value)} />
        <input type={'text'} placeholder={'Descrição'} value={novaDescricao} onChange={(e) => setNovaDescricao(e.target.value)} />
        <button >Salvar Edição</button>
      </form>
    </ContainerEdit>
  )
}

const ContainerEdit = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`
const Header = styled.header`
    width: 100%;
    height: 60px;
    background-color: #969696;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding:15px;
    margin-bottom: 15px;
    font-size: 26px;
    color: white;
    gap:400px;
    img{
    width: 48px;
    height: 48px;
    cursor: pointer;
    padding-right: 80px;
    }
    div{
    cursor: pointer;
    }
`