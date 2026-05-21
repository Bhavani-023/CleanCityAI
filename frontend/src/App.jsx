import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {

  return (

    <div className="overflow-x-hidden">

      <BrowserRouter>

        {/* TOASTER */}

        <Toaster

          position="top-right"

          reverseOrder={false}

          toastOptions={{

            style: {

              background: "#111827",

              color: "#fff",

              border: "1px solid rgba(255,255,255,0.1)",

              borderRadius: "16px",

              padding: "16px",

            },

          }}

        />

        {/* ROUTES */}

        <Routes>

          <Route
            path="/"
            element={<Landing />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

        </Routes>

      </BrowserRouter>

    </div>

  );

}

export default App;