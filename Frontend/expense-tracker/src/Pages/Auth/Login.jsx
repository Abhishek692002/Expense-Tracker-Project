import React, { useState } from "react";
import AuthLayout from "../../Components/layouts'/AuthLayout";
import { useNavigate } from "react-router-dom";
import Input from "../../Components/layouts'/Inputs/Input";

import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";

const Login = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setpassword ] = useState("");
    const [ error, setError ] = useState(null);

    const navigate = useNavigate();

    //handle login  form Submit

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!password) {
            setError("Please enter the password.");
            return;
        }

        setError("");
        //Login Api call
    };
    return (
        <AuthLayout>
            <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-balck ">
                    {" "}
                    Welcome Back{" "}
                </h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">
                    Please enter your details to log in
                </p>

                <form onSubmit={handleLogin}>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email Address"
                        placeholder="john@example.com"
                        type="text"
                    />

                    <Input
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        label="Password "
                        placeholder="Min 8 Characters"
                        type="password"
                    />

                    {error && (
                        <p className="text-red-500 text-x5 pb-2.5">{error}</p>
                    )}
                    <button type="submit" className="btn-primary">
                        LOGIN
                    </button>

                    <p className="text-[13px] text-slate-800 mt-3">
                        Don't have an account?
                        <Link className="" to="/signup">
                            SignUp
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default Login;
