import { Route, Routes } from "react-router-dom"
// import { Login } from "./components/auth/Login.jsx"
// import { Register } from "./components/auth/Register.jsx"
import { ApplicationViews } from "./components/views/ApplicationViews.jsx"
// import { Authorized } from "./components/views/Authorized.jsx"

export const App = () => {
  return (
    <Routes>
      {/* <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> */}

      <Route path="*" element={
        // <Authorized>
          <ApplicationViews />
        // </Authorized>
        }
      />
    </Routes>
  )
}