import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import BlockLanganar from "./pages/block-langanar/block-langanar";
import NotFound from "./pages/notfound/NotFound";
import Details from "./pages/details/Details";
import Stuffs from "./pages/stuffs/Stuffs";
import { Tasks } from "./pages/tasks/Tasks";
import { Manager } from "./pages/managers/Managers";
const App = () => {
  const { token } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {token ? (
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/umumiy" element={<Details />} />
            <Route path="/block-langanar" element={<BlockLanganar />} />
            <Route path="/managerlar" element={<Manager />} />
            <Route path="/hodimlar" element={<Stuffs />} />
            <Route path="/vazifalar" element={<Tasks />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      ) : (
        <Login />
      )}
    </BrowserRouter>
  );
};

export default App;
