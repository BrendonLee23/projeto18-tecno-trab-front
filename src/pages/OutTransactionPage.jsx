import axios from "axios";
import { useContext, useState } from "react";
import styled from "styled-components"
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function OutTransactionsPage() {


    const [valor, setValor] = useState('');
    const [descricao, setDescricao] = useState('');
    const { user } = useContext(UserContext)
    const usuarioLogado = localStorage.getItem('nome')
    const token = localStorage.getItem('token')
    console.log(user.token)

    const navigate = useNavigate();

    function adicionarSaida(e) {

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

        const promise = axios.post(`${import.meta.env.VITE_API_URL}/nova-transacao/saida`, body, config);

        promise.then(response => {
            console.log(response.data);
            localStorage.getItem('token, data.token')
            navigate('/home');
        })

        promise.catch(err => {
            console.log(err.message);
            alert('Erro ao realizar transação. Por favor, tente novamente!)');
        })
    }



    return (
        <Saida>
            <h1>Nova Saída</h1>
            <form onSubmit={adicionarSaida}>
                <input required  data-test="registry-amount-input" type={'text'} placeholder={'Valor'} value={valor} onChange={(e) => setValor(e.target.value)} />
                <input required  data-test="registry-name-input" type={'text'} placeholder={'Descrição'} value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                <button data-test="registry-save">Salvar saída</button>
            </form>
        </Saida>
    )
}

const Saida = styled.main`
    height: calc(100vh - 50px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    h1 {
    align-self: flex-start;
    margin-bottom: 40px;
    }
`
