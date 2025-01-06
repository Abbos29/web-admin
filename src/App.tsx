import { Navigate } from 'react-router-dom';
import './App.css';
import AddPage from './components/add-page/AddPage';

function App() {

  if (!localStorage.getItem('token')) return <Navigate to='login' replace={true} />

  return (
    <div className="app">
      App page
    </div>
  );
}

export default App;
