import { API_OPTIONS } from '../utils/constants'
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import {addPopularMovies} from "../utils/movieSlice";
import { useSelector } from 'react-redux';
const usePopularMovies = () => {
    const dispatch = useDispatch();
    const popularMovies = useSelector(store => store.movies.popularMovies)

    const getPopularMovies = async () => {
        const data = await fetch(
            'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
            API_OPTIONS)
        const json = await data.json();
        console.log(json.results);
        dispatch(addPopularMovies(json.results));
    }

    useEffect(() => {
       !popularMovies && getPopularMovies();
    }, []);

}

export default usePopularMovies;