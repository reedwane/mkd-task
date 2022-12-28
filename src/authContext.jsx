import React, { useReducer } from "react";
import { useState } from "react";
import MkdSDK from "./utils/MkdSDK";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      //TODO
      const user = action.payload.user;
      localStorage.setItem("role", user?.role);
      localStorage.setItem("token", user?.token);
      return {
        ...state,
        isAuthenticated: true,
        user: user?.user_id,
        token: user?.token,
        role: user?.role,
      };

    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "LOGOUT",
    });
    window.location.href = "/" + role + "/login";
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    //TODO
    (async () => {
      const role = localStorage.getItem("role");

      if (role) {
        try {
          const check = await sdk.check(role);

          if (!check.error) {
            const user = JSON.parse(localStorage.getItem("userData"));
            dispatch({ type: "LOGIN", payload: { user } });
          } else {
            tokenExpireError(dispatch, "TOKEN_EXPIRED");
          }
        } catch (error) {
          tokenExpireError(dispatch, "TOKEN_EXPIRED");
        } finally {
          setLoading(false);
        }
      } else setLoading(false);
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {loading ? <div /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
