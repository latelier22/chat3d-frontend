import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AvatarPage from "./pages/Home";
import CubePage from "./pages/Cube";
import ImageSearch from "./pages/SearchImage";
import Coque from "./pages/Coque"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<AvatarPage />} />
          <Route path="cube" element={<CubePage />} />
          <Route path="google" element={<ImageSearch />} />
          <Route path="coque" element={<Coque />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
