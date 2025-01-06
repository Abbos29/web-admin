import { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Grid,
  CardContent,
  CardActions,
  Button,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../API/api";
import "./style.css"; // Убедитесь, что вы подключаете файл стилей

interface Sneaker {
  id: number;
  uk_size: number;
  us_size: number;
  eu_size: number;
  brand: { brand: string };
  model: string;
  color: string;
  price: number;
  article: string;
  condition: { condition: string };
  city: string;
  place: string;
  fitting: boolean;
  vendor: {
    first_name: string;
    last_name: string;
    vk_account: string;
    telegram_account: string;
  };
  photoUrl?: string; // Добавлено поле для URL фотографии
}

export function SneakersPage() {
  const [sneakers, setSneakers] = useState<Sneaker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Для навигации

  // Проверка авторизации
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("access-token");
    if (!isAuthenticated) {
      navigate("/login"); // Если пользователь не авторизован, редиректим на /login
    }
  }, [navigate]);

  useEffect(() => {
    const fetchSneakers = async () => {
      try {
        const response = await api.getSneakers();
        setSneakers(response.sneakers);
        setLoading(false);
      } catch (error) {
        setError("Ошибка загрузки данных");
        setLoading(false);
      }
    };

    fetchSneakers();
  }, []);

  const getBrandImage = (brand: string) => {
    // Логика выбора изображения бренда
    switch (brand.toLowerCase()) {
      case "nike":
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png";
      case "adidas":
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Adidas_2022_logo.svg/150px-Adidas_2022_logo.svg.png";
      case "yezzy":
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Adidas_Yeezy_Logo.png/250px-Adidas_Yeezy_Logo.png";
      case "asics":
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Asics_Logo.svg/220px-Asics_Logo.svg.png";
      case "jordan":
        return "https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Jumpman_logo.svg/200px-Jumpman_logo.svg.png";
      case "new balance":
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/New_Balance_logo.svg/180px-New_Balance_logo.svg.png";
      default:
        return "https://e7.pngegg.com/pngimages/261/801/png-clipart-logo-brand-shoe-font-sneaker-icon-logo-outdoor-shoe.png"; // Заглушка для других брендов
    }
  };

  if (loading) {
    return <Typography>Загрузка...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div className="wrapper"> {/* Фон с градиентом применяется к контейнеру */}
      <Grid container spacing={3} sx={{ padding: "24px" }}>
        {sneakers.map((sneaker) => (
          <Grid item xs={12} sm={6} md={4} key={sneaker.id}>
            <Card elevation={4}>
              {/* Отображение фотографии в зависимости от бренда */}
              <CardMedia
                component="img"
                height="140"
                image={getBrandImage(sneaker.brand.brand)} // Вставляем изображение в зависимости от бренда
                alt={`${sneaker.brand.brand} ${sneaker.model}`}
                sx={{
                  padding: '10px',
                  objectFit: "contain", // Это свойство гарантирует, что логотип будет корректно масштабироваться и обрезаться
                  height: "140px", // Фиксированная высота
                  width: "90%", // Ширина по размеру контейнера
                }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {sneaker.brand.brand} {sneaker.model}
                </Typography>
                <Typography>Цвет: {sneaker.color}</Typography>
                <Typography>Цена: {sneaker.price} ₽</Typography>
                <Typography>
                  Размеры (UK/US/EU): {sneaker.uk_size}/{sneaker.us_size}/
                  {sneaker.eu_size}
                </Typography>
                <Typography>Состояние: {sneaker.condition.condition}</Typography>
                <Typography>Артикуль: {sneaker.article || "Не указан"}</Typography>
                <Typography>Город: {sneaker.city}</Typography>
                <Typography>Место сделки: {sneaker.place}</Typography>
                <Typography>
                  Примерка: {sneaker.fitting ? "С примеркой" : "Без примерки"}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/edit/${sneaker.id}`)} // Навигация на страницу редактирования
                >
                  Редактировать
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        fullWidth
        sx={{
          position: "fixed",
          bottom: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
        }}
        onClick={() => navigate("/add")}
      >
        Добавить новую пару
      </Button>
    </div>
  );
}

export default SneakersPage;
