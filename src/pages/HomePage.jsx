import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import TransactionItem from "./Transaction";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

export default function HomePage() {

  const navigate = useNavigate();
  const {user, setUser} = useContext(UserContext)
  const usuarioLogado = localStorage.getItem('nome')
  const token = localStorage.getItem('token')



/*   const [existingTransactions, setExistingTransactions] = useState(false); */
  const [transacoes, setTransacoes] = useState([]);
  const [total, setTotal] = useState(0)

  function deslogar() {
    localStorage.removeItem('nome')
    localStorage.removeItem('token')
    navigate('/')
  }


  function converterTotal(n){

    return Math.abs(n).toFixed(2).replace(".", ",");
  }


  useEffect(() => {

    if(!token){
      navigate('/')
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
        setTransacoes(res.data.listaFinal);
        setTotal(res.data.total)
        console.log(user)
        console.log(res.data)
      })
      .catch(err => console.log(err.message))
  }, [token])


  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name"  >Olá, {usuarioLogado}</h1>
        <BiExit data-test="logout" onClick={deslogar} />
      </Header>

      <TransactionsContainer>
        <ul>
          {!transacoes ? (<TranNull>Não há registros de<br /> entrada ou saída</TranNull>) : (
              <>
                  {transacoes?.map((transacao, indice) =>  <TransactionItem key={indice} transacao={transacao}/> )}
              </>
          )}
        </ul>

        {!transacoes ? '' : 
        <article>
          <strong>Saldo</strong>
          <Value data-test="total-amount"  color={total>= 0? "positivo" : "negativo"}>{converterTotal(total)}</Value>
        </article>}
      </TransactionsContainer>
      <ButtonsContainer>
        <button data-test="new-income" onClick={() => navigate('/nova-transacao/entrada')}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button data-test="new-expense" onClick={() => navigate('/nova-transacao/saida')}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const Transaction = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`
const TranNull = styled.div`

    margin-left: 20px;
    margin-right: 20px;
    font-size: 25px;
    font-family: 'Roboto', sans-serif;
    color: #868686;
`
  ;