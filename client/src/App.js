import Register from './components/Register'
import SignIn from './components/SignIn'
import Home from './components/Home'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </Router>
  )
}

export default App;
