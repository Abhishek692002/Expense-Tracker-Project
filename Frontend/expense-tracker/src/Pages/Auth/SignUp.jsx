import React, { useState } from "react";
import AuthLayout from "../../Components/layouts'/AuthLayout";
import { useNavigate } from "react-router-dom";
import Input from "../../Components/layouts'/Inputs/Input";

import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelecter from "../../Components/layouts'/Inputs/ProfilePhotoSelecter";
const SignUp = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullname, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(null);

    // const [image, setImage] = useState(null);
    const [error, setError] = useState(null);

    const naviagte = useNavigate();

    //handle Sign Up Form Submit
    const handleSignUp = async (e) => {
        e.preventDefault();

        let profileImageUrl = ""
        if (!fullname) {
            setError("Please enter your name.");
            return;
        }
 
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.")
            return;
        }

        if (!password) {
            setError("Please enter the password.")
            return;
        }

        setError("");

        //SignUp API Call
    };
    return (
        <AuthLayout>
            <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">
                    Create an Account
                </h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">
                    Join us today entering your details below
                </p>
                <form onSubmit={handleSignUp}>
                    <ProfilePhotoSelecter
                        image={profilePic}
                        setImage={setProfilePic}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            value={fullname}
                            onChange={(e) => setFullName(e.target.value)}
                            label="Full Name"
                            placeholder="John"
                            type="text"
                        />

                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email Address"
                            placeholder="john@example.com"
                            type="text"
                        />
                        <div className="col-span-2">
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                label="Password "
                                placeholder="Min 8 Characters"
                                type="password"
                            />
                        </div>
                    </div>
                    {error && (
                        <p className="text-red-500 text-x5 pb-2.5">{error}</p>
                    )}
                    <button type="submit" className="btn-primary">
                        SIGN UP
                    </button>

                    <p className="text-[13px] text-slate-800 mt-3">
                        Already have an account?{" "}
                        <Link className="" to="/login">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default SignUp;
