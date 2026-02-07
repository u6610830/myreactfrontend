import { Routes, Route } from "react-router-dom";
import RequireAuth from "./middleware/RequireAuth";
import ItemManagement from "./pages/ItemManagement";
import Login from "./components/Login";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/items"
        element={
          <RequireAuth>
            <ItemManagement />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
