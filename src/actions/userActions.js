import axios from 'axios';
import { GET_ERRORS } from './types';
import setJWTToken from '../utils/setJWTToken';

export const createUser = (newUser, history)=>async dispatch =>{
    try{
        await axios.post("/api/users/register",newUser);
        history.push("/login");
        dispatch ({
       type :GET_ERRORS,
       payload:{}
        });
    }catch (err){
        dispatch ({
            type :GET_ERRORS,
            payload:err.response.data
             });
    }
}

export const login = (loginRequest, history )=> async dispatch =>{
    try {
        const res = await axios.post("/api/users/login" , loginRequest);
        const {token} = res.data;
        localStorage.setItem("jwtToken",token);
        setJWTToken(token);
        
        history.push("/dashboard");
        window.location.href = "/";

    }catch(err){
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}
export const logout = () =>{
    localStorage.removeItem("jwtToken");
    window.location.href = "/";
}