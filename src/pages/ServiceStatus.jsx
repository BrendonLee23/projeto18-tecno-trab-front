import styled from "styled-components";
import { AiOutlineCheckSquare } from "react-icons/ai"

export default function ServiceStatus(props) {

    const { nome, descricao } = props;

    return (
        <ServiceUnity>
            <DivInfos>
                <h1>{nome}</h1>
                <h2>{descricao}</h2>
            </DivInfos>
            <StatusButtom>
            <AiOutlineCheckSquare color="green" size={60} />
            </StatusButtom>
        </ServiceUnity>
    )
}

const ServiceUnity = styled.div`
    background-color: #9696a3;
    width: 700px;
    height: 100px;
    margin:30px 13px 30px 13px;
    gap: 20px;
    border-radius: 5px;
    display: flex;
    padding: 30px;
    display: flex;
    justify-content: space-between;
`
const DivInfos = styled.div`        
    h1{
    position: start;
    font-size: 20px;
    font-weight: bold;
    margin-bottom:30px;
    }
    h2{
        font-size:15px;
    }
`
const StatusButtom = styled.div`
    margin-top: 15px;
    display: flex;
    flex-direction: center ;
    width: 100px;
    height: 100px;
`
