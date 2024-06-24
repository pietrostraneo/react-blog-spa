import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header/Header";
import Feed from "./components/Feed/Feed";
import Login from "./components/Login/Login";
import PostDetails from './components/PostDetails/PostDetails';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <header>
          <Header />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/post/:slug" element={<PostDetails />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
