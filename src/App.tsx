import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layouts/Layout";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contacts from "./components/pages/Contacts";
import Categories from "./components/pages/Categories";
import CardPage from "./components/pages/CardPage";
import { useEffect } from "react";
import SignIn from "./components/UI/organizms/Forms/SignIn";
import SignUp from "./components/UI/organizms/Forms/SignUp";
import Login from "./components/pages/Login";
import { tokenIsValid } from "./store/slices/userSlice";
import { useAppDispatch } from "./hooks/reduxHooks";

// import axios from "axios";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(tokenIsValid());
    }
  }, []);

  // const [query, setQuery] = useState<string>("men");

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://www.googleapis.com/books/v1/volumes?q=${query}&key=AIzaSyC-yxOlwf7o8AaBAhCqeONsinuv8WAs-qU`
  //     )
  //     .then((res) => console.log(res.data.items));
  // }, []);

  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/card/:id" element={<CardPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contacts />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:category" element={<Categories />} />
            <Route path="/search/:search" element={<Categories />} />
            <Route path="/sign-in" element={<Login children={<SignIn />} />} />
            <Route path="/sign-up" element={<Login children={<SignUp />} />} />
            {/* <Route path="*" element={<h1>not found 404</h1>} /> */}
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
