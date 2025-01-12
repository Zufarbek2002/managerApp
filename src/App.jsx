import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
const App = () => {
  localStorage.setItem('token', JSON.stringify('asdf3212sd1f3213'))
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      {token ? (
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      ) : (
        <Login />
      )}
    </BrowserRouter>
  );
};

export default App;
