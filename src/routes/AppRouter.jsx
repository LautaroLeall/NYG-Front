import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          {/* Aquí iremos agregando /el-club, /rugby, etc. */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
