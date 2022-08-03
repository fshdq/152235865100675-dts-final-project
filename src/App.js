import { Route, Routes } from "react-router-dom";
import "./App.css";

import WithoutNav from "./layouts/WithoutNav";
import WithNav from "./layouts/WithNav";

import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";

import Browse from "./views/Browse";
import BrowseResult from "./views/BrowseResult";

import GameDetails from "./views/GameDetails";
import { AuthContextProvider } from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";

import Profile from "./views/Profile/Profile";
import MyLibrary from "./views/Profile/MyLibrary";
import MyWishlist from "./views/Profile/MyWishlist";
import MyFavorite from "./views/Profile/MyFavorite";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route element={<WithoutNav />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<WithNav />}>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />}>
              <Route path=":genre_slug" element={<BrowseResult />} />
            </Route>
            <Route path="/game/:slug" element={<GameDetails />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            >
              <Route
                path="my-library"
                element={
                  <ProtectedRoute>
                    <MyLibrary />
                  </ProtectedRoute>
                }
              />
              <Route
                path="my-wishlists"
                element={
                  <ProtectedRoute>
                    <MyWishlist />
                  </ProtectedRoute>
                }
              />
              <Route
                path="my-favorites"
                element={
                  <ProtectedRoute>
                    <MyFavorite />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
