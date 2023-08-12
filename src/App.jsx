import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import { useState } from "react"
import { UserContext } from "./contexts/UserContext";

export default function App() {

  const [user, setUser] = useState({});

  return (
    <PagesContainer>
{/*       <BackgroundImage /> */}
      <BrowserRouter>
        <UserContext.Provider  value={{user, setUser}} >
          <Routes>
            <Route path="/" element={<Navigate to="/login"/>} />
            <Route path="/login" element={<SignInPage />} />
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
  position: absolute;
  width: calc(100vw - 50px);
  display: flex;
`
/* const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80vh;
  background-image: url("https://papers.co/wallpaper/papers.co-se16-soft-programming-gradation-blur-41-iphone-wallpaper.jpg");

  z-index: -1;
` */