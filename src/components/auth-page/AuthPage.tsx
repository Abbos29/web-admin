import { Box, Stack, Typography, TextField, Button, Card, Link } from "@mui/material";
import { FC, useState } from "react";
import { Navigate } from "react-router-dom";
import "./style.css";
import api, { LoginDto } from "../../API/api";

const AuthPage: FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isAuth, setIsAuth] = useState<boolean>(
    Boolean(localStorage.getItem("access-token"))
  );

  async function signIn(cred: LoginDto) {
    return api.login(cred).then((auth) => {
      console.log(auth);
      setIsAuth(Boolean(auth.token));
      localStorage.setItem("access-token", auth.token);

      // Релоад страницы после установки токена
      window.location.reload();
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn({ telegram: login, password: password })
      .then(() => {
        setIsAuth(true);
      })
      .catch((er) => {
        console.log(er);
        setError("Неправильный логин или пароль");
      });
  };

  const clickSubmit = () => {
    signIn({
      telegram: login,
      password: password,
    })
      .then(() => {
        setIsAuth(true);
      })
      .catch((er) => {
        console.log(er);
        setError("Неправильный логин или пароль");
      });
  };

  // Перенаправление на главную страницу, если авторизация успешна
  if (isAuth) {
    return <Navigate to="/add" />;
  }

  return (
    <div className="wrapper">
      <Card
        elevation={10}
        sx={{
          width: "40vw",
          height: {
            xs: "clamp(50vh, 80vw, 70vh)",
            sm: "clamp(60vh, 75vw, 80vh)",
            md: "70vh",
          },
          margin: "10vh auto",
          minWidth: "320px",
          maxWidth: "700px",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: "clamp(1.5rem, 5vw, 2.5rem)",
                sm: "clamp(2rem, 4vw, 3rem)",
                md: "clamp(2.5rem, 3vw, 3.5rem)",
              },
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            LfSafeSearch-Admin
          </Typography>
          <TextField
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            variant="filled"
            label="Логин"
            sx={{ width: "80%" }}
          ></TextField>
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="filled"
            label="Пароль"
            type="password"
            sx={{ width: "80%" }}
          ></TextField>
          <Button variant="contained" onClick={clickSubmit}>
            Войти
          </Button>
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Ссылка на страницу регистрации */}
          <Link
            href="/registration"
            sx={{
              marginTop: "16px",
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            Регистрация
          </Link>
        </form>
      </Card>
    </div>
  );
};

export default AuthPage;
