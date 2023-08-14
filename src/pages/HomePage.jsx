import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineTool, AiOutlineFolder, AiOutlineForm } from "react-icons/ai"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import IconLogo from "../Assets/icon-logo.png";
import ServicePage from "./ServicePage";

export default function HomePage() {

  const navigate = useNavigate();
  const usuarioLogado = localStorage.getItem('userName')
  const token = localStorage.getItem('token')
  const [services, setServices] = useState([])

  function deslogar() {
    localStorage.removeItem('userName')
    localStorage.removeItem('token')
    navigate('/login')
  }

  function backToHome(){
    localStorage.getItem('token, data.token')
    navigate('/home')
  }

  useEffect(() => {

    if (!token) {
      navigate('/login')
      alert("Faça o login!")
      return
    }


    const config = {
      headers: {
        "authorization": `Bearer ${token}`,
      }
    }


    axios.get(`${import.meta.env.VITE_API_URL}/home`, config)
      .then(res => {
        const result = [...services, res.data]
        setServices(result);
        localStorage.getItem('token, data.token')
      })
      .catch(err => console.log(err.message))
  }, [token])

  function capitalizeFirstLetter(sentence) {
    return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();
  }

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá,  {usuarioLogado}</h1>
        <img onClick={backToHome} src={IconLogo} alt="icon-logo" />
        <div>
          <BiExit data-test="logout" onClick={deslogar} />
        </div>
      </Header>
      <ButtonsContainer>
        <button onClick={() => navigate('/home/:id')}>
          <AiOutlineFolder  size={30} />
          <h2>{capitalizeFirstLetter('MEUS SERVIÇOS')}</h2>
        </button>
        <button onClick={() => navigate('/service/create')}>
          <AiOutlineForm size={30} />
          <h2>{capitalizeFirstLetter('Cadastrar Serviços')}</h2>
        </button>
        <button onClick={() => navigate('/nova-transacao/entrada')}>
          <AiOutlineTool size={30} />
          <h2>{capitalizeFirstLetter('Gerenciar Serviços')}</h2>
        </button>
      </ButtonsContainer>
      <ServicesContainer>
        {!services ? (<ServNull>Não há registros de serviços casdastrados por você.</ServNull>) :
          <>
            {services[0]?.map((service, i) => (<ServicePage key={i} nome={service.name} imagem={service.image} descricao={service.description} numero={service.phoneNumber} />))}
          </>
        }
      </ServicesContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 100px;
`
const Header = styled.header`
    width: 100%;
    height: 133px;
    background-color: #969696;
    display: flex;
    align-items: center;
    justify-content:  space-around;
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
const ServicesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  height:800px;
  margin-top: 80px;
  padding-top: 25px;

`

const ButtonsContainer = styled.section`
  display: flex;
  width:400px;
  height: 50px;
  gap: 30px;
  margin-top: 60px;
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: center;
    h2 {
      font-size: 19px;
      font-weight: bold;
    }
  }
`


