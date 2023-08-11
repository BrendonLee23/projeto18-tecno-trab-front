import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import { useState } from "react"
import { UserContext } from "./contexts/UserContext"
import InsertTransactionsPage from "./pages/InsertTransactionPage"
import OutTransactionsPage from "./pages/OutTransactionPage"

export default function App() {

  const [user, setUser] = useState({});

  return (
    <PagesContainer>
      <BackgroundImage />
      <BrowserRouter>
        <UserContext.Provider  value={{user, setUser}} >
          <Routes>
            <Route path="/login'" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage />} />
{/*             <Route path="/nova-transacao/entrada" element={<InsertTransactionsPage />} />
            <Route path="/nova-transacao/saida" element={<OutTransactionsPage />} /> */}
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  position: relative;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://papers.co/wallpaper/papers.co-se16-soft-programming-gradation-blur-41-iphone-wallpaper.jpg");
/*   filter: blur(10px); */ /* Ajuste o valor do desfoque conforme necessário */
  z-index: -1; /* Coloca o elemento de fundo atrás do conteúdo */
`