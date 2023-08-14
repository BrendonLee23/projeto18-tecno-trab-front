import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";
import useAuth from "../contexts/UseAuth";

export default function ManageService() {

    const navigate = useNavigate();
    const [servicesById, setServicesById] = useState([])
    const { user } = useContext(UserContext)
    const { auth } = useAuth()

    function deslogar() {
        localStorage.removeItem('userName')
        localStorage.removeItem('auth')
        navigate('/login')
    }

    function backToHome() {
        navigate('/home')
    }

    useEffect(() => {

        if (!auth) {
            navigate('/login')
            alert("Faça o login!")
            return
        }

        axios.get(`${import.meta.env.VITE_API_URL}/home/${user.userId}`)
            .then(res => {
                console.log(res.data, "vasco");
                setServicesById(res.data)
            })
            .catch(err => console.log(err.message))
    }, [auth]);

    return (
        <ManageContatiner>

        </ManageContatiner>
    )
}

const ManageContatiner = styled.div`
    width: 100%;
    height: calc(100vh - 50px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`
