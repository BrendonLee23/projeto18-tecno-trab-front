import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import { useState } from "react"
import { UserContext } from "./contexts/UserContext";
import GetServiceById from "./pages/GetServiceById";
import InsertService from "./pages/InsertService";
import { AuthProvider } from "./contexts/AuthContext"
import ServiceStatus from "./pages/ServiceStatus"
import ManageService from "./pages/ManageService"

export default function App() {

  const [user, setUser] = useState({});
  console.log(user);

  return (
    <PagesContainer>
      <BrowserRouter>
      <AuthProvider>
        <UserContext.Provider  value={{ user, setUser }} >
          <Routes>
            <Route path="/" element={<Navigate to="/login"/>} />
            <Route path="/login" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/home/:id" element={<GetServiceById />} />
            <Route path="/service/create" element={<InsertService />} />
            <Route path="/service/edit/status/:id" element={<ManageService />} />
          </Routes>
        </UserContext.Provider>
        </AuthProvider>
      </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  position: absolute;
  width: calc(90vw - 50px);
  display: flex;
  width: 100%;
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