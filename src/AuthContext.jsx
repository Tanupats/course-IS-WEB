import {createContext,useState} from "react";

export const AuthData = createContext();

function Context({children}){

   
    const [message,setMessage] = useState("test");
    const [isLogin,setIsLogin] = useState();

    return (
        <AuthData.Provider 
            value={{message,setMessage,isLogin,setIsLogin}}>
            {children}
        </AuthData.Provider>
    );


}

export default Context;




