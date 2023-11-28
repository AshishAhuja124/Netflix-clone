import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieSlice";
const useMovieTrailer = (movieId) => {

    const dispatch = useDispatch();
    const trailerVideo = useSelector(store => store.movies.trailerVideo);

    //fetch trailer background & updating the store with trailer video data
    const getMovieVideos = async () => {
        const data = await fetch(
            'https://api.themoviedb.org/3/movie/' + movieId + '/videos',
            API_OPTIONS
        );
        const json = await data.json();

        const filterTrailer = json.results.filter(video => video.type === 'Trailer');
        const trailer = filterTrailer.length ? filterTrailer[0] : json.results[0];
        dispatch(addTrailerVideo(trailer))
    }

    useEffect(() => {
       !trailerVideo && getMovieVideos();
    }, []);
}

export default useMovieTrailer;