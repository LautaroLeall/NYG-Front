import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";
import ClubHub from "../pages/club/ClubHub";
import Historia from "../pages/club/Historia";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/el-club" element={<ClubHub />} />
          <Route path="/el-club/historia" element={<Historia />} />
          {/* Futuras rutas de la Épica 2 */}
          {/* <Route path="/el-club/timeline" element={<Timeline />} /> */}
          {/* <Route path="/el-club/palmares" element={<Palmares />} /> */}
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center min-h-[60vh]">
                <h2 className="text-2xl font-bold text-gray-500">
                  Página en construcción (404)
                </h2>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
