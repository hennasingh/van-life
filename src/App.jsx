import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About'
import './App.css'

function App() {

  return (
    <BrowserRouter>
        <header className="site-header">
          <Link className="site-logo" to="/">#VANLIFE</Link>           
          <nav>
            <Link to="/about">About</Link>
         </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
