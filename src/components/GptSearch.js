import GptMovieSuggestions from "./GptMovieSuggestions"
import GptSearchBar from "./GptSearchBar"
import { BG_LOGO } from "../utils/constants";

const GptSearch = () => {
  return (
    <div>
      <div className="fixed -z-10">
        <img className="h-screen object-cover md:h-screen w-screen"
          src={BG_LOGO}
          alt="bg-logo"
        />
      </div>
      <div  className=""> 
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>

    </div>
  )
}

export default GptSearch