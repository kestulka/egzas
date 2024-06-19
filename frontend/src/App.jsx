import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./Components/Register/RegisterPage";
import LoginPage from "./Components/Login/LoginPage";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import AdList from "./Components/AdList/AdList";
import FavoriteAdsList from "./Components/FavoriteAdsList/FavoriteAdsList";
import MyAds from "./Components/UserAds/UserAdsList";
import CreateAd from "./Components/AdAdd/CreateAdd";
import CreateCategory from "./Components/CategoryAdd/CreateCategory";
import BlockAdPage from "./Components/Admin/BlockAdPage";
import BlockUserPage from "./Components/Admin/BlockUserPage";

const App = () => {
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/createAd" element={<CreateAd />} />
        <Route path="/createCategory" element={<CreateCategory />} />
        <Route path="/blockAdPage" element={<BlockAdPage />} />
        <Route path="/blockUserPage" element={<BlockUserPage />} />
        <Route path="/favoriteAds" element={<FavoriteAdsList user={user} />} />
        <Route path="/myAds" element={<MyAds />} />
        <Route
          path="*"
          element={
            <>
              <Header user={user} onCategorySelect={handleCategorySelect} />
              <AdList selectedCategory={selectedCategory} />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
