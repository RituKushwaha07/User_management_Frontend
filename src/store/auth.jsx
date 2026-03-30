
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [isLoding, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);
  const authorizationToken = `Bearer ${token}`;



  const API = import.meta.env.VITE_APP_URI_API;
  
  //function to stored the token in local storage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  //   this is the get the value in either true or false in the original state of token
  let isLoggedIn = !!token;
  console.log("token", token);
  console.log("isLoggedin ", isLoggedIn);

  //   to check whether is loggedIn or not
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };



  const userAuthentication = async (req, res) => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization:  authorizationToken,
        },
      })

      if (response.ok) {
        const data = await response.json();
        console.log("user data", data.userData);
        setUser(data.userData);
        setIsLoading(false);
      }else{
        console.log("Error fetching user data");
        setIsLoading(false);        
      }
    } catch (error) {
      console.error("Error  fetching user data");

    }

  }


  //to fetch  the services data fromm the database

  const getServices = async () => {
    try {
      // const response = await fetch("http://localhost:5000/api/data/service", {
      //   method: "GET",
      // });

      const response = await fetch(`${API}/api/data/service`,{
        method: "GET",
      })
 
      if(response.ok){
        const data = await response.json();
        console.log(data.msg);
        setServices(data.msg);
      
      }


    } catch (error) {
        console.log(`services frontend error: ${error}`);
        
    }

  }


  useEffect(() => {
    getServices();
    userAuthentication();
  }, []);



  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, services, authorizationToken, isLoding,}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
