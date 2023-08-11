import styled from "styled-components";
import logo from "../Assets/logo.png";

export default function MyWalletLogo() {
    return (
        <>
            <StyledImg src={logo} alt="img-logo"/>
        </>
    )
}

const StyledImg = styled.img`
    width: 40px;
    height: 40px;
`

/* const Text = styled.h1`
    font-family: 'Saira Stencil One', cursive;
    font-weight: 400;
    font-size: 32px;
` */

