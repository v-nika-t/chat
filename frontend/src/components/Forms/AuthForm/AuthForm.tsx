import React, { useState, ChangeEvent } from "react";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import styles from "./AuthForm.module.scss";
import { Alert } from "antd";
import { useAuth } from "../../../hooks/useAuth";

function AuthForm() {
  const { setAuth, setName, name, auth } = useAuth();
  const [status, setStatus] = useState<"error" | "">("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (typeof value === "string") setName(e.target.value);
  };

  const login = () => {
    if (!name) {
      setStatus("error");
      return;
    }
    setStatus("");
    sessionStorage.setItem("auth", name);
    setAuth(true);
  };

  return (
    <div className={styles.wrapper}>
      <Input mb={20} value={name} onChange={onChange} status={status} />
      {status === "error" && <Alert message="Please enter name" type="error" />}
      <Button onClick={login} mt={20}>
        Login
      </Button>
    </div>
  );
}

export default AuthForm;
