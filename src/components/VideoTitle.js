import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";

const VideoTitle = ({ title, overview }) => {

    const selectedLanguage = useSelector(store => store.config.lang);
    return (
        <div className="w-screen aspect-video pt-[20%] px-20 absolute text-white bg-gradient-to-r from-black">
            <h1 className=" text-4xl font-bold">{title}</h1>
            <p className="py-6 text-sm w-1/3">{overview}</p>
            <div className="">
                <button className=" bg-white text-black p-3 px-12 text-xl  rounded-lg hover:opacity-80 ">
                    {lang[selectedLanguage].playButton}
                </button>
                <button className="mx-2 bg-gray-500 text-white p-3 px-12 text-xl bg-opacity-50 rounded-lg hover:opacity-100">
                    {lang[selectedLanguage].moreInfo}
                </button>

            </div>
        </div>
    )
}

export default VideoTitle