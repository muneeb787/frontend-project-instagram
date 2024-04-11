// import { useEffect, useState } from 'react';
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
// import {Switch} from "react-router-dom";
import layoutRouter from "./routes/layout";
import PrivateRoute from "./routes/protectedroute";
// import ProtectedRoute from "./routes/protectedroute";
import Layout from "./layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Login from "./modules/auth/login";
import NonLayoutRoutes from "./routes/nonLayoutRoutes.jsx";

function App() {
  return (
    <>
      <ToastContainer position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />

      <Routes>
        {
          NonLayoutRoutes.map((ele) => <Route key={ele.path} path={ele.path} element={ele.element} />)
        }

        {/* <Route path="/" element={<PrivateRoute />}> */}
        <Route element={<Layout />}>

          {layoutRouter.map((ele) => (
            <Route key={ele.path} path={ele.path} element={<PrivateRoute>{ele.element}</PrivateRoute>} />
          ))}
        </Route>
        {/* </Route> */}
      </Routes>

    </>
  );
}

export default App;
