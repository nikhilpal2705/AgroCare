import Register from './components/Register'
import SignIn from './components/SignIn'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </Router>
  )
}

export default App;
