import { Routes, Route } from "react-router-dom";
import ItemManagement from "./pages/ItemManagement";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/items" element={<ItemManagement />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
