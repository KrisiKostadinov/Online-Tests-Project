import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import UserContext from './context/UserContext';

function App() {

  const [userContext, setUserContext] = useState({ email: 'test@test.com' });

  return (
    <div className="App">
      <UserContext.Provider value={{ userContext, setUserContext }}>
        <Router>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Dashboard />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
