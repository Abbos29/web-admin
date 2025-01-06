import {
  Checkbox,
  Card,
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
  FormControlLabel,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import "./style.css"; // Ensure that your CSS file includes necessary styles
import DoNotStepIcon from "@mui/icons-material/DoNotStep";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../API/api";

interface CreateSneakersLot {
  brand: string;
  model: string;
  color: string;
  city: string;
  place: string;
  condition: string;
  uk_size: number;
  us_size: number;
  eu_size: number;
  price: number;
  fitting: boolean;
  article: string;
}

export function AddPage() {
  const navigate = useNavigate();
  const [brand, setBrand] = useState<string>("");
  const [brands, setBrands] = useState<{ id: number; name: string }[]>([]);
  const [model, setModel] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [condition, setCondition] = useState<string>("");
  const [conditions, setConditions] = useState<{ id: number; name: string }[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [ukSize, setUkSize] = useState<number | null>(null);
  const [usSize, setUsSize] = useState<number | null>(null);
  const [euSize, setEuSize] = useState<number | null>(null);
  const [fitting, setFitting] = useState<boolean>(false);
  const [article, setArticle] = useState<string>("");

  // Проверка авторизации
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("access-token");
    if (!isAuthenticated) {
      navigate("/login"); // Если пользователь не авторизован, редиректим на /login
    }
  }, [navigate]);

  const fir = [
    { name: "Модель", value: model, setState: setModel },
    { name: "Цвет", value: color, setState: setColor },
    { name: "Город", value: city, setState: setCity },
    { name: "Место сделки", value: place, setState: setPlace },
    { name: "Артикуль", value: article, setState: setArticle },
  ];

  const handleChangeFitting = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFitting(event.target.checked);
  };

  const handleSubmitClick = async () => {
    const data: CreateSneakersLot = {
      brand,
      model,
      color,
      city,
      place,
      condition,
      price,
      uk_size: ukSize ?? 0,
      us_size: usSize ?? 0,
      eu_size: euSize ?? 0,
      fitting,
      article,
    };

    try {
      const response = await api.createSneakersLot(data);
      console.log("Sneakers Lot Created:", response);
      navigate("/");
    } catch (error) {
      console.error("Failed to create sneakers lot:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const brandsData = await api.getBrands();
        setBrands(brandsData.brands);
        const conditionsData = await api.getConditions();
        setConditions(conditionsData.conditions);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="wrapper"> {/* Background gradient applied to the wrapper */}
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
          Новая пара
        </Typography>
        <form className="form">
          {fir.map((article, i) => (
            <TextField
              key={i}
              value={article.value}
              onChange={(e) => article.setState(e.target.value)}
              variant="filled"
              label={article.name}
              fullWidth
              sx={{ mb: "24px" }}
            />
          ))}

          <FormControl fullWidth>
            <InputLabel>Бренд</InputLabel>
            <Select
              value={brand}
              variant="filled"
              onChange={(e) => setBrand(e.target.value as string)}
            >
              {brands.map((brand) => (
                <MenuItem key={brand.id} value={brand.name}>
                  {brand.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ m: "24px 0" }}>
            <InputLabel>Состояние</InputLabel>
            <Select
              value={condition}
              variant="filled"
              onChange={(e) => setCondition(e.target.value as string)}
            >
              {conditions.map((condition) => (
                <MenuItem key={condition.id} value={condition.name}>
                  {condition.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <p style={{ margin: "0 0 8px 0", fontWeight: 600 }}>Размеры</p>
          <div className="size" style={{ marginBottom: "24px" }}>
            <TextField
              value={ukSize ?? ""}
              onChange={(e) => setUkSize(Number(e.target.value))}
              variant="filled"
              label="UK"
              type="number"
              sx={{ width: "33%" }}
            />
            <TextField
              value={usSize ?? ""}
              onChange={(e) => setUsSize(Number(e.target.value))}
              variant="filled"
              label="US"
              type="number"
              sx={{ width: "33%" }}
            />
            <TextField
              value={euSize ?? ""}
              onChange={(e) => setEuSize(Number(e.target.value))}
              variant="filled"
              label="EU"
              type="number"
              sx={{ width: "33%" }}
            />
          </div>
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
            sx={{ height: "56px", mb: "18px", ml: "2px" }}
            control={
              <Checkbox
                checked={fitting}
                onChange={handleChangeFitting}
                icon={<DoNotStepIcon sx={{ color: "red" }} />}
                checkedIcon={<DoNotStepIcon sx={{ color: "green" }} />}
                sx={{ transform: "scale(1.33)" }}
              />
            }
            label={fitting ? "С примеркой" : "Без примерки"}
          />
          <Button variant="contained" fullWidth onClick={handleSubmitClick}>
            Добавить
          </Button>
        </form>

        {/* "Мои товары" button */}
        <Button
          variant="outlined"
          fullWidth
          sx={{ mt: "16px" }}
          onClick={() => navigate("/")}
        >
          Мои товары
        </Button>
      </Card>
    </div>
  );
}

export default AddPage;
