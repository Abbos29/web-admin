import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  Card,
  TextField,
  Button,
  Typography,
  Link,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./style.css"; // Ensure this is updated to include the gradient
import api from "../../API/api";

export function SignUpPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);

  const navigate = useNavigate();

  // Check if the user is authenticated by verifying the access token
  const isAuth = Boolean(localStorage.getItem("access-token"));

  // Redirect if the user is authenticated
  if (isAuth) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async () => {
    setLoading(true);
    setMessage(null); // Reset message on new submission

    const data = {
      user_name: userName,
      email: email,
      telegram: telegram,
      password: password,
    };

    try {
      const response = await api.signUp(data);
      if (response.message) {
        setMessage(response.message);
        setLink(response.link); // Set the verification link if successful
      }
    } catch (error) {
      setMessage("Ошибка регистрации. Попробуйте снова.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper"> {/* This will apply the gradient background */}
      <Card
        elevation={8}
        sx={{
          width: "80%",
          m: "12px auto",
          p: "24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "680px",
          marginTop: "10vh", // Отступ сверху, чтобы сместить карточку вниз
        }}
      >
        <Typography variant="h4" textAlign="center" mb="12px">
          Регистрация
        </Typography>
        <form>
          {/* Поля ввода, стилизованные как на странице логина */}
          <TextField
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            label="Имя пользователя"
            fullWidth
            variant="filled" // Стилизация с заливкой
            sx={{
              mb: "16px",
              "& .MuiFilledInput-root": {
                backgroundColor: "#f5f5f5", // Цвет фона поля
              },
              "& .MuiInputLabel-root": {
                color: "#000", // Цвет текста метки
              },
              "& .MuiFilledInput-underline:before": {
                borderBottom: "1px solid #3f51b5", // Цвет нижней границы
              },
            }}
          />
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Электронная почта"
            type="email"
            fullWidth
            variant="filled"
            sx={{
              mb: "16px",
              "& .MuiFilledInput-root": {
                backgroundColor: "#f5f5f5",
              },
              "& .MuiInputLabel-root": {
                color: "#000",
              },
              "& .MuiFilledInput-underline:before": {
                borderBottom: "1px solid #3f51b5",
              },
            }}
          />
          <TextField
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            label="Телеграм"
            fullWidth
            variant="filled"
            sx={{
              mb: "16px",
              "& .MuiFilledInput-root": {
                backgroundColor: "#f5f5f5",
              },
              "& .MuiInputLabel-root": {
                color: "#000",
              },
              "& .MuiFilledInput-underline:before": {
                borderBottom: "1px solid #3f51b5",
              },
            }}
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Пароль"
            type="password"
            fullWidth
            variant="filled"
            sx={{
              mb: "16px",
              "& .MuiFilledInput-root": {
                backgroundColor: "#f5f5f5",
              },
              "& .MuiInputLabel-root": {
                color: "#000",
              },
              "& .MuiFilledInput-underline:before": {
                borderBottom: "1px solid #3f51b5",
              },
            }}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Зарегистрироваться"}
          </Button>
        </form>

        {message && (
          <Snackbar
            open={true}
            message={message}
            autoHideDuration={6000}
            onClose={() => setMessage(null)}
          />
        )}

        {link && (
          <Typography mt="12px">
            Перейдите в телеграм и отправьте боту ваш токен верификации:{" "}
            <Link href={"https://" + link} target="_blank" color="primary">
              Перейти в бот
            </Link>
          </Typography>
        )}

        {/* Ссылка на страницу логина */}
        <Typography mt="16px">
          Уже есть аккаунт?{" "}
          <Link href="/login" color="primary">
            Войти в систему
          </Link>
        </Typography>
      </Card>
    </div>
  );
}

export default SignUpPage;
