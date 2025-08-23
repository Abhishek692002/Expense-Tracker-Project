import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import Home from "./Pages/Dashboard/Home";
import Income from "./Pages/Dashboard/Income";
import Expense from "./Pages/Dashboard/Expense";
import UserProvider from "./Context/userContext";
import { Toaster } from "react-hot-toast";
const App = () => {
    return (
        <UserProvider>
            <div>
                <Router>
                    <Routes>
                        <Route path="/" element={<Root />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/dashboard" element={<Home />} />
                        <Route path="/income" element={<Income />} />
                        <Route path="/expense" element={<Expense />} />
                    </Routes>
                </Router>
            </div>

            <Toaster
                toastOptions={{
                    className: "",
                    style: {
                        fontSize: "13px",
                    },
                }}
            />
        </UserProvider>
    );
};

export default App;

const Root = () => {
    //Check is token exists in local storage
    const isAuthenticated = !!localStorage.getItem("token");
    //redirect to daseboard if authicated,otherwise to login
    return isAuthenticated ? (
        <Navigate to="/dashboard" />
    ) : (
        <Navigate to="/login" />
    );
};
