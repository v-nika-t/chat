import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { Spin } from "antd";
import { Main, Room } from "./pages/index";
import styles from "./App.module.scss";
import { useAuth } from "./hooks/useAuth";

function App() {
  const [loadingApp, setLoadingApp] = useState(true);
  const { auth, setAuth, setName } = useAuth();

  useEffect(() => {
    const name = sessionStorage.getItem("auth");
    if (name) {
      setName(name);
      setAuth(true);
    }
    setLoadingApp(false);
  }, []);

  return (
    <BrowserRouter>
      {loadingApp ? (
        <div className={styles.wrapper}>
          <Spin size="large" />
        </div>
      ) : (
        <Routes>
          {!auth && <Route path="/" element={<Main />} />}
          {auth && <Route path="/room" element={<Room />} />}
          <Route
            path="/*"
            element={<Navigate replace to={auth ? "/room" : "/"} />}
          />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
