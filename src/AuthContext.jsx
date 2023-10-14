import {createContext,useState} from "react";

export const AuthData = createContext();

function Context({children}){
    let auth = localStorage.getItem("auth")
   
    const [message,setMessage] = useState("test");
    const [isLogin,setIsLogin] = useState(auth || "nologin");

    return (
        <AuthData.Provider 
            value={{message,setMessage,isLogin,setIsLogin}}>
            {children}
        </AuthData.Provider>
    );


}

export default Context;




