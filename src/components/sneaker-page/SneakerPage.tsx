import { useEffect, useState } from "react";
import {
  Button,
  Card,
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../API/api";
import "./style.css"; // Убедитесь, что подключили этот файл стилей

export function EditSneakerPage() {
  const { id } = useParams<{ id: string }>(); // Получаем ID из URL
  const navigate = useNavigate();

  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [condition, setCondition] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [ukSize, setUkSize] = useState<number | null>(null);
  const [usSize, setUsSize] = useState<number | null>(null);
  const [euSize, setEuSize] = useState<number | null>(null);
  const [fitting, setFitting] = useState<boolean>(false);
  const [article, setArticle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Проверка авторизации
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("access-token");
    if (!isAuthenticated) {
      navigate("/login"); // Если пользователь не авторизован, редиректим на /login
    }
  }, [navigate]);

  useEffect(() => {
    const fetchSneaker = async () => {
      try {
        const response = await api.getSneakerById(Number(id));
        setBrand(response.brand.brand);
        setModel(response.model);
        setColor(response.color);
        setCity(response.city);
        setPlace(response.place);
        setCondition(response.condition.condition);
        setPrice(response.price);
        setUkSize(response.uk_size);
        setUsSize(response.us_size);
        setEuSize(response.eu_size);
        setFitting(response.fitting);
        setArticle(response.article);
        setLoading(false);
      } catch (error) {
        setError("Ошибка загрузки данных");
        setLoading(false);
      }
    };

    fetchSneaker();
  }, [id]);

  const handleUpdateClick = async () => {
    try {
      await api.updateSneaker({
        id: Number(id),
        uk_size: ukSize,
        us_size: usSize,
        eu_size: euSize,
        brand,
        model,
        color,
        price,
        article,
        condition,
        city,
        place,
        fitting,
      });
      navigate("/");
    } catch (error) {
      setError("Ошибка обновления данных");
    }
  };

  const handleDeleteClick = async () => {
    try {
      await api.deleteSneaker(Number(id));
      navigate("/");
    } catch (error) {
      setError("Ошибка удаления кроссовка");
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
        }}
      >
        <Typography variant="h4" textAlign="center" mb="12px">
          Редактирование кроссовок
        </Typography>
        <form className="form">
          <TextField
            value={model}
            onChange={(e) => setModel(e.target.value)}
            variant="filled"
            label="Модель"
            fullWidth
            sx={{ mb: "24px" }}
          />
          <TextField
            value={color}
            onChange={(e) => setColor(e.target.value)}
            variant="filled"
            label="Цвет"
            fullWidth
            sx={{ mb: "24px" }}
          />
          <TextField
            value={city}
            onChange={(e) => setCity(e.target.value)}
            variant="filled"
            label="Город"
            fullWidth
            sx={{ mb: "24px" }}
          />
          <TextField
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            variant="filled"
            label="Место сделки"
            fullWidth
            sx={{ mb: "24px" }}
          />
          <FormControl fullWidth sx={{ mb: "24px" }}>
            <InputLabel>Состояние</InputLabel>
            <Select
              value={condition}
              variant="filled"
              onChange={(e) => setCondition(e.target.value as string)}
            >
              <MenuItem value="Новое">Новое</MenuItem>
              <MenuItem value="Б/У">Б/У</MenuItem>
            </Select>
          </FormControl>
          <TextField
            value={ukSize ?? ""}
            onChange={(e) => setUkSize(Number(e.target.value))}
            variant="filled"
            label="UK Размер"
            type="number"
            sx={{ mb: "24px" }}
          />
          <TextField
            value={usSize ?? ""}
            onChange={(e) => setUsSize(Number(e.target.value))}
            variant="filled"
            label="US Размер"
            type="number"
            sx={{ mb: "24px" }}
          />
          <TextField
            value={euSize ?? ""}
            onChange={(e) => setEuSize(Number(e.target.value))}
            variant="filled"
            label="EU Размер"
            type="number"
            sx={{ mb: "24px" }}
          />
          <FormControl variant="filled" sx={{ width: "100%", mb: "18px" }}>
            <InputLabel htmlFor="filled-adornment-amount">Цена</InputLabel>
            <FilledInput
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              type="number"
              id="filled-adornment-amount"
              endAdornment={<InputAdornment position="end">₽</InputAdornment>}
            />
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={fitting}
                onChange={(e) => setFitting(e.target.checked)}
              />
            }
            label={fitting ? "С примеркой" : "Без примерки"}
          />
          <TextField
            value={article}
            onChange={(e) => setArticle(e.target.value)}
            label="Артикуль"
            fullWidth
            variant="filled"
            sx={{ mb: "32px" }}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleUpdateClick}
            sx={{ mb: "16px" }}
          >
            Сохранить изменения
          </Button>
          <Button
            variant="outlined"
            fullWidth
            color="error"
            onClick={handleDeleteClick}
          >
            Удалить
          </Button>


          
        </form>

{/* Кнопка "Мои товары" внизу */}
<Button
            variant="contained"
            fullWidth
            sx={{
              // position: "fixed",
              // bottom: "24px",
              // left: "50%",
              // transform: "translateX(-50%)",
              width: "100%",
              mt: "16px"
            }}
            onClick={() => navigate("/")}
          >
            Мои товары
          </Button>
      </Card>


    </div>
  );
}

export default EditSneakerPage;
