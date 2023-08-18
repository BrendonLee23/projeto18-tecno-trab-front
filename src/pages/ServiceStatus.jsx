import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import useAuth from "../contexts/UseAuth";

export default function ServiceStatus(props) {

    const { id, nome, descricao } = props;
    const {auth} = useAuth()

    function deletarServico() {
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

        axios.post(`${import.meta.env.VITE_API_URL}/service/delete/${id}`, config)
            .then(res => {
                console.log("Serviço deletado!")
                window.location.reload()
            })
            .catch(err => console.log(err.message))
    }

return (
    <ServiceUnity>
        <DivInfos>
            <h1>{nome}</h1>
            <h2>{descricao}</h2>
        </DivInfos>
        <AiOutlineClose color="red" size={90} />
        <StatusButtom  onClick={deletarServico}>
            <h1>Deletar Serviço</h1>
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
    h1{
        font-size: 26px;
    }
    margin-top: 15px;
    display: flex;
    flex-direction: center ;
    width: 100px;
    height: 100px;
`
