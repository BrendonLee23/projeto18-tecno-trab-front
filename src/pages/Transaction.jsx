import styled from "styled-components"



export default function TransactionItem({transacao}) {

/*     const {valor, descricao, tipo} = transacao */

    return (
        <Transaction>
            <div>
                <span>{transacao.registeredAt}</span>
                <strong data-test="registry-name">{transacao.description}</strong>
            </div>
            {transacao.type === "entrada" ? <Value data-test="registry-amount" color={"positivo"}>{transacao.value}</Value> :
            <Value data-test="registry-amount" color={"negativo"}>{transacao.value}</Value>
            }
            
        </Transaction>
    )
}

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

const Value = styled.div`
    font-size: 16px;
    text-align: right;
    color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
