import { Provider } from "react-redux";
import "./styles/globals.scss";
import Body from "./components/Body";
import Header from "./components/Header/Header";
import store from "./utils/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainContainer from "./components/MainContainer/MainContainer";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Cookies from 'js-cookie';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ComicDetail from "./components/ComicDetail/ComicDetail";

const onLoginSuccess = () => {
  window.location.href = '/';
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          {Cookies.get('accessToken') ? <Header /> : <></>}
          <Routes>
            <Route path="/login" element={<Login onLoginSuccess={onLoginSuccess} />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Body />}>
                <Route index element={<MainContainer />} />
                <Route path="info/:id" element={<ComicDetail />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
