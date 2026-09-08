import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import AppRouter from "./routes/AppRouter";
import SplashScreen from "./components/common/SplashScreen";

function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />

      {/* SplashScreen se mostrará primero y pingeará el backend */}
      {!isAppReady && <SplashScreen onFinish={() => setIsAppReady(true)} />}

      <div className={!isAppReady ? "h-screen overflow-hidden" : ""}>
        <AppRouter />
      </div>
    </>
  );
}

export default App;
