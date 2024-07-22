import { Provider } from "react-redux";
import "./styles/globals.scss";
import Body from "./components/Body";
import Header from "./components/Header/Header"; 
import store from "./utils/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainContainer from "./components/MainContainer/MainContainer";   
import Watchpage from "./components/Watchpage";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const onLoginSuccess = () => {
  window.location.href = '/';
};

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login onLoginSuccess={onLoginSuccess} />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Body />}>
                <Route index element={<MainContainer />} />
                <Route path="watch" element={<Watchpage />} />
                <Route path="watch/:id" element={<Watchpage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
