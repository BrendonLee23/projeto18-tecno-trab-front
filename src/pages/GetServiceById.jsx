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
    const [novoNome, setNovoNome] = useState()
    const [novaImagem, setNovaImagem] = useState()
    const [novaDescricao, setNovaDescricao] = useState()

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

        /*         const config = {
                    headers: {
                        "authorization": `Bearer ${token}`,
                    }
                } */

        /*         const body = {
                    name: novoNome,
                    image: novaImagem,
                    description: novaDescricao
                    } */

        axios.get(`${import.meta.env.VITE_API_URL}/home/${user.userId}`)
            .then(res => {
                console.log(res.data, "vasco");
                setServicesById(res.data)
            })
            .catch(err => console.log(err.message))
    }, [token]);

    return (
        <EditContainer>
            <Header>
                <h1 data-test="user-name">Olá,  {usuarioLogado}</h1>
                <img src={IconLogo} alt="icon-logo" />
                <div>
                    <BiExit data-test="logout" onClick={deslogar} />
                </div>
            </Header>
            {!servicesById ? <ServNull>Não há registros de serviços casdastrados. Cadastre um serviço abaixo.</ServNull> :
                <>
                    {servicesById?.map((service, i) => (<ServicePage key={i} nome={service.name} imagem={service.image} descricao={service.description} numero={service.phoneNumber} />))}
                </>
            }
            <form onSubmit={finalizeEdit}>
                <input type={'text'} placeholder={'Nome'} value={novoNome} onChange={(e) => setNovoNome(e.target.value)} />
                <input type={'text'} placeholder={'Imagem'} value={novaImagem} onChange={(e) => setNovaImagem(e.target.value)} />
                <input type={'text'} placeholder={'Descrição'} value={novaDescricao} onChange={(e) => setNovaDescricao(e.target.value)} />
                <button >Salvar Edição</button>
            </form>
        </EditContainer>
    )
}

const EditContainer = styled.div`
    background-color: green;
    width: 100%;
    height: auto;
`

const Header = styled.header`
    width: 110%;
    height: 30px;
    background-color: #969696;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    margin-bottom: 15px;
    font-size: 26px;
    color: white;
    img{
    width: 48px;
    height: 48px;
    margin-right: 80px;
    }
    div{
    cursor: pointer;
    }
`