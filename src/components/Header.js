import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";
import lang from "../utils/languageConstants";




const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const showGptSearch = useSelector(store => store.gptSearch.showGptSearch);
    const selectedLanguage = useSelector(store => store.config.lang); 

    const handleSignOut = () => {
        signOut(auth).then(() => {

        }).catch((error) => {
            navigate("/error");
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(
                    addUser({
                        uid: uid,
                        email: email,
                        displayName: displayName,
                        photoURL: photoURL,
                    })
                );
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
        });
        //Unsubscribe when component unmounts
        return () => unsubscribe();
    }, []);

    const handleGptSearchClick = () => {
        //Toggle Gpt button
        dispatch(toggleGptSearchView());
    }

    const langChange = useRef();

    const handleLangChange = (e) => {
        dispatch((changeLanguage(langChange.current.value))); // we can also use e.target.value
    }

    return (
        <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
            <img
                className="w-44 mx-auto md:mx-0"
                src={LOGO}
                alt="logo"
            />
            {user && (
                <div className="flex p-2 justify-between">
                    {
                        <select className="p-1  text-sm md:p-2 m-2 bg-gray-700 text-white"
                            onChange={handleLangChange}
                            ref={langChange}
                        >
                            {SUPPORTED_LANGUAGES.map((lang) =>
                                <option key={lang.identifier}
                                    value={lang.identifier}>{lang.name}
                                </option>)
                            }
                        </select>
                    }

                    <button className="py-1 px-1 text-sm md:py-2 px-2 mx-4 my-2 bg-purple-700 text-white rounded-lg"
                        onClick={handleGptSearchClick}
                    >
                        {lang[selectedLanguage].gptSearch}
                    </button>
                    <img className="w-[5%] md:w-12 h-12" alt="usericon" src={user?.photoURL} />
                    <button onClick={handleSignOut} className="text-sm md:font-bold text-white ">
                        ({lang[selectedLanguage].signOut})
                    </button>
                </div>
            )}
        </div>
    )
}

export default Header