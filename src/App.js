import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screens/Login';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';


//  Note
//  React Router DOM is an npm package that enables you to implement dynamic routing in a web app.
// It allows you to display pages and allow users to navigate them.
// It is a fully-featured client and server-side routing library for React. 
//React Router Dom is used to build single-page applications 
//i.e. applications that have many pages or components but the page is never
// refreshed instead the content is dynamically fetched based on the URL.
 
function App() {
  return (
    <CartProvider>

      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/creatuser" element={<Signup/>} />
          </Routes>
        </div>
      </Router>
      
      </CartProvider>
  );
}

export default App;
