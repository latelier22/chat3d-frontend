import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AvatarPage from "./pages/Home";
import CubePage from "./pages/Cube";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<AvatarPage />} />
          <Route path="cube" element={<CubePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
