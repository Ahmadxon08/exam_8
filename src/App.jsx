import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import View from "./pages/view/View";
import PlayList from "./pages/playlists/PlayList";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins/:id" element={<View />} />
        <Route path="/playList/:id" element={<PlayList />} />
      </Routes>
    </div>
  );
};

export default App;
