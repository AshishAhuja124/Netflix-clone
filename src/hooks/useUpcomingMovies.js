import { API_OPTIONS } from '../utils/constants'
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import { addUpcomingMovies } from "../utils/movieSlice";
import { useSelector } from 'react-redux';

const useUpcomingMovies = () => {
    const dispatch = useDispatch();
    const upcomingMovies = useSelector(store => store.movies.upcomingMovies)


    const getTopRatesMovies = async () => {
        const data = await fetch(
            'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
            API_OPTIONS)
        const json = await data.json();
        console.log(json.results);
        dispatch(addUpcomingMovies(json.results));
    }

    useEffect(() => {
        !upcomingMovies && getTopRatesMovies();
    }, []);

}

export default useUpcomingMovies;