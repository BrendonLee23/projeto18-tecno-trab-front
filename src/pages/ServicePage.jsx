import styled from "styled-components"
import { AiOutlinePhone } from "react-icons/ai"

export default function ServicePage(props) {

    const { nome, imagem, descricao, numero } = props;

    return (
        <ServiceUnity>
            <img src={imagem} alt="img-service" />
            <h1>{nome}</h1>
            <h2>{descricao}</h2>
            <ContactDiv>
                <AiOutlinePhone size={30} />
                <h2>{numero}</h2>
            </ContactDiv>
        </ServiceUnity>
    )
}

const ServiceUnity = styled.div`
    background-color: #9696a3;
    width: 245px;
    height: 350px;
    margin:30px 13px 30px 13px;
    gap: 20px;
    border-radius: 10%;
    display: flex;
    flex-direction: column;
    padding: 30px;
    img{
        border-radius: 10%;
        width: 250px;
        height: 190px;
    }
    h1{
        position: start;
        font-size: 15px;
        font-weight: bold;
    }
    h2{
        font-size:12px;
    }
`
const ContactDiv = styled.div`
    display: flex;
`