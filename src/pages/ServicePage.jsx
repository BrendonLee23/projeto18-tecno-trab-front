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
    background-color: blue;
    width: 150px;
    height: 300px;
    margin:10px;
    gap: 25px;
    img{
        width: 90px;
        height: 90px;
    }
    h1{
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