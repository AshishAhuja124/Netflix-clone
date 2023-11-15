import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/validate";

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMesssage] = useState();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    const handleButtonClick = () => {
        //Validate the data first
        // console.log(email.current.value);
        // console.log(password);
        const message = checkValidateData(email.current.value, password.current.value, name.current.value);
        console.log(message);
        setErrorMesssage(message);
    }

    return (
        <div>
            <Header />
            <div className="absolute">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/77d35039-751f-4c3e-9c8d-1240c1ca6188/cf244808-d722-428f-80a9-052acdf158ec/IN-en-20231106-popsignuptwoweeks-perspective_alpha_website_large.jpg"
                    alt="logo" />
            </div>

            <form className="bg-black absolute p-12 w-4/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
                onSubmit={(e) => e.preventDefault()}
            >
                <div>
                    <h1 className="text-2xl py-4">
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </h1>

                    {!isSignInForm && (
                        <input type="text"
                            ref={name}
                            placeholder="Full Name"
                            className="p-4 my-4 w-full bg-gray-700">
                        </input>
                    )}


                    <input type="email"
                        ref={email}
                        placeholder="Enter your Email"
                        className="p-4 my-4 w-full bg-gray-700">
                    </input>

                    <input type="password"
                        ref={password}
                        placeholder="Password"
                        className="p-4 my-4 w-full bg-gray-700">
                    </input>

                    <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
                    <button
                        className="p-4 my-4 bg-red-700 w-full rounded-lg"
                        onClick={handleButtonClick}
                    >
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </button>

                    <p className="py-2 cursor-pointer" onClick={toggleSignInForm}>
                        {isSignInForm ? "New to Netlix?..Sign Up Now" : "Already a User? Sign In Now"}
                    </p>

                </div>


            </form>
        </div>
    )
}

export default Login;