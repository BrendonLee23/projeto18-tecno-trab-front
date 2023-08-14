import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components"
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { BiExit } from "react-icons/bi"
import IconLogo from "../Assets/icon-logo.png";
import { AiOutlineArrowLeft } from "react-icons/ai"

export default function InsertService() {

  const navigate = useNavigate();
  const { user } = useContext(UserContext)
  const usuarioLogado = localStorage.getItem('userName')
  const token = localStorage.getItem('token')
  const [novoNome, setNovoNome] = useState('')
  const [novaImagem, setNovaImagem] = useState('')
  const [novaDescricao, setNovaDescricao] = useState('')

  function backToHome() {
    localStorage.getItem('token, data.token')
    navigate('/home')
  }

  function deslogar() {
    localStorage.removeItem('userName')
    localStorage.removeItem('token')
    navigate('/login')
  }

  useEffect(() => {

    localStorage.getItem('token, data.token')

  }, [token])

  function finalizeEdit(e) {
    e.preventDefault();

    if (!token) {
      navigate('/login');
      alert("Faça o login!");
      return;
    }

    const config = {
      headers: {
        "authorization": `Bearer ${token}`,
      },
    };

    const body = {
      name: novoNome,
      image: novaImagem,
      description: novaDescricao,
    };

    const promise = axios.post(`${import.meta.env.VITE_API_URL}/service/create`, body, config);

    promise
      .then((response) => {
        console.log(response.data);
        alert("Cadastro concluído com sucesso!!");
        navigate('/home');
      })
      .catch((err) => {
        console.log(err.message);
        alert("Erro ao realizar cadastro. Por favor, tente novamente!");
      });
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
      <ButtonsContainer>
        <button onClick={() => navigate('/home/')}>
          <AiOutlineArrowLeft size={30} />
          <h2>Voltar Para Home</h2>
        </button>
      </ButtonsContainer>
      <form onSubmit={finalizeEdit}>
        <input required type={'text'} placeholder={'Nome'} value={novoNome} onChange={(e) => setNovoNome(e.target.value)} />
        <input required type={'text'} placeholder={'Imagem'} value={novaImagem} onChange={(e) => setNovaImagem(e.target.value)} />
        <input required type={'text'} placeholder={'Descrição'} value={novaDescricao} onChange={(e) => setNovaDescricao(e.target.value)} />
        <button >Finalizar Cadastro</button>
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
  form{
    width: 1120px;
  }
`
const Header = styled.header`
    width: 100%;
    height: 60px;
    background-color: #969696;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding:15px;
    margin-bottom: 15px;
    font-size: 26px;
    color: white;
    cursor: default;
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
const ButtonsContainer = styled.section`
    display: flex;
    justify-content: space-between;
    width:100%;
    height: 150px;
    margin-bottom: 40px;
    padding-left: 400px;
    button {
        width: 130px;
        height: 110px;
        font-size: 22px;
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        h2 {
        font-size: 19px;
        font-weight: bold;
        }
    }
`