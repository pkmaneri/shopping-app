import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/home';
import Vendor from './components/vender';
import Dashboard from './components/dashboard';

function App() {
  if (localStorage.getItem("id") == null) {
    return (
      <BrowserRouter>
        <Route  path="/" component={Home}/>
        <Route exact path="/login" component={Vendor} />
      </BrowserRouter>
    )
  } else {
    return (
      <BrowserRouter>
        <Route path="/dashboard" component={Dashboard} />
      </BrowserRouter>
    )
  }
}
  
export default App;
