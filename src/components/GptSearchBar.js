import { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openAi";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";


const GptSearchBar = () => {

    const dispatch = useDispatch();
    const selectedLanguage = useSelector(store => store.config.lang);
    const searchText = useRef(null);

    //Search movie in TMDb
    const searchMovieInTMDB = async (movie) => {
        const data = await fetch(
            "https://api.themoviedb.org/3/search/movie?query=" +
            movie +
            "&include_adult=false&language=en-US&page=1",
            API_OPTIONS
        );
        const json =  await data.json();
        return json.results;
    }

    const handleGptSearchClick = async () => {
        console.log(searchText.current.value)
        //Make an api call to GPT api and get movie results
        const gptquery = "Act as a Movie recommendation system and suggest some movies for the query" +
                            searchText.current.value + 
                            " only give me names of 5 movies, comma separated like the example result given ahead. Example result: Gadar, Sholay, Don, Golmaal, Fukrey"
        
        const gptResults = await openai.chat.completions.create({
            messages: [{ role: 'user', content:  gptquery}],
            model: 'gpt-3.5-turbo',
        });
        if(!gptResults.choices) {
            return "Hey you dont have movies"
        }
        console.log(gptResults.choices?.[0]?.message?.content);
        const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

        //for each movie i will search TMDB search api
        const promisedArray = gptMovies.map(movie => searchMovieInTMDB(movie));

        const tmdbResults = await Promise.all(promisedArray);
        console.log(tmdbResults);

        dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}))
    }   




    return (
        <div className="pt-[10%] flex justify-center">
            <form className="w-1/2 grid grid-cols-12"
                onSubmit={(e) => e.preventDefault()}
            >
                <input type="text"
                    ref={searchText}
                    className="p-4 m-4 col-span-9"
                    placeholder={lang[selectedLanguage].gptSearchPlaceholder}>
                </input>
                <button className="py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3"
                    onClick={handleGptSearchClick}
                >
                    {lang[selectedLanguage].search}
                </button>
            </form>
        </div>
    )
}

export default GptSearchBar