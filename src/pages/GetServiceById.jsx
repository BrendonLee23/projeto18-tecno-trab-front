import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import IconLogo from "../Assets/icon-logo.png";
import ServicePage from "./ServicePage";

export default function GetServiceById() {

    const navigate = useNavigate();
    const usuarioLogado = localStorage.getItem('userName')
    const token = localStorage.getItem('token')
    const [servicesById, setServicesById] = useState([])
    const { user } = useContext(UserContext)


    function deslogar() {
        localStorage.removeItem('userName')
        localStorage.removeItem('token')
        navigate('/login')
    }

    function backToHome(){
        navigate('/home')
    }


    useEffect(() => {

        if (!token) {
            navigate('/login')
            alert("Faça o login!")
            return
        }

        axios.get(`${import.meta.env.VITE_API_URL}/home/${user.userId}`)
            .then(res => {
                console.log(res.data, "vasco");
                setServicesById(res.data)
                localStorage.getItem('token, data.token')
            })
            .catch(err => console.log(err.message))
    }, [token]);

    return (
        <MyServicesContainer>
            <Header>
                <h1 data-test="user-name">Olá,  {usuarioLogado}</h1>
                <img onClick={backToHome} src={IconLogo} alt="icon-logo" />
                <div>
                    <BiExit data-test="logout" onClick={deslogar} />
                </div>
            </Header>
            {!servicesById ? <ServNull>Não há registros de serviços casdastrados. Cadastre um serviço abaixo.</ServNull> :
                <>
                    {servicesById?.map((service, i) => (<ServicePage key={i} nome={service.name} imagem={service.image} descricao={service.description} numero={service.phoneNumber} />))}
                </>
            }
        </MyServicesContainer>
    )
}

const MyServicesContainer = styled.div`
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
