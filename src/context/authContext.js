const { createContext, useState, useEffect } = require("react");

export const authContext = createContext();




export function AuthProvider({children}){




    const [token, setToken] = useState(null)

    useEffect(function(){
      
      
        if (localStorage.getItem("tkn") !== null) {
          setToken(localStorage.getItem("tkn"));
        }

        

    },[])



return (
  <authContext.Provider value={{ token, setToken }}>
    {children}
  </authContext.Provider>
);

}


