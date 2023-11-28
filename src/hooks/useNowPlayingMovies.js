import { API_OPTIONS } from '../utils/constants'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import {addNowPlayingMovies} from "../utils/movieSlice";

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();

    const nowPlayingMovies = useSelector(store => store.movies.nowPlayingMovies)

    const getNowPlayingMovies = async () => {
        const data = await fetch(
            'https://api.themoviedb.org/3/movie/now_playing?page=1',
            API_OPTIONS)
        const json = await data.json();
        console.log(json.results);
        dispatch(addNowPlayingMovies(json.results));
    }

    useEffect(() => {
        //make an api call only if we dont have movies in the store
        !nowPlayingMovies && getNowPlayingMovies(); 
    }, []);

}

export default useNowPlayingMovies;