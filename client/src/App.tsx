import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "./components/ui/toaster";
import Navbar from "./components/Navbar/Navbar";
import Search from "./pages/Search/Search";
import VideoDetails from "./pages/VideoDetails/VideoDetails";
import Videos from "./pages/Videos/Videos";
import Library from "./pages/Library/Library";
import EditVideo from "./pages/EditVideo/EditVideo";
import PlayList from "./pages/PlayList/PlayList";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Videos />} />
          <Route path="/library/:id" element={<Library />} />
          <Route path="/search" element={<Search />} />
          <Route path="/videos/:id" element={<VideoDetails />} />
          <Route path="/videos/:id/edit" element={<EditVideo />} />
          <Route path="/playlist/:id" element={<PlayList />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
