import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineTool, AiOutlineFolder, AiOutlineForm } from "react-icons/ai"
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import IconLogo from "../Assets/icon-logo.png";
import ServicePage from "./ServicePage";
import useAuth from "../contexts/UseAuth";
import { UserContext } from "../contexts/UserContext";

export default function HomePage() {

  const { user } = useContext(UserContext)
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const { auth } = useAuth()



  function deslogar() {
    localStorage.removeItem('userName')
    localStorage.removeItem('auth')
    navigate('/login')
  }

  function backToHome() {
    navigate('/home')
  }

  useEffect(() => {

    if (!auth) {
      navigate('/login')
      alert("Faça o login!")
      return
    }


    const config = {
      headers: {
        "authorization": `Bearer ${auth}`
      }
    }


    axios.get(`${import.meta.env.VITE_API_URL}/home`, config)
      .then(res => {
        setServices(res.data);

      })
      .catch(err => console.log(err.message))
  }, [auth])

  function capitalizeFirstLetter(sentence) {
    return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();
  }

  const availableServices = services.filter(service => service.isAvailable === true);

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá,  {user.userName}</h1>
        <img onClick={backToHome} src={IconLogo} alt="icon-logo" />
        <div>
          <BiExit data-test="logout" onClick={deslogar} />
        </div>
      </Header>
      <ButtonsContainer>
        <button onClick={() => navigate('/home/:id')}>
          <AiOutlineFolder size={30} />
          <h2>{capitalizeFirstLetter('MEUS SERVIÇOS')}</h2>
        </button>
        <button onClick={() => navigate('/service/create')}>
          <AiOutlineForm size={30} />
          <h2>{capitalizeFirstLetter('Cadastrar Serviços')}</h2>
        </button>
        <button onClick={() => navigate('/service/edit/status/:id')}>
          <AiOutlineTool size={30} />
          <h2>{capitalizeFirstLetter('Gerenciar Serviços')}</h2>
        </button>
      </ButtonsContainer>
      <ServicesContainer>
        {!services ? (<ServNull>Não há registros de serviços casdastrados por você.</ServNull>) :
          <>
            {availableServices?.map((service, i) => (<ServicePage key={i} nome={service.name} imagem={service.image} descricao={service.description} numero={service.phoneNumber} />))}
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


