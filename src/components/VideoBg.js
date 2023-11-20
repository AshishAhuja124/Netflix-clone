import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import {useDispatch, useSelector} from "react-redux";
import {addTrailerVideo} from "../utils/movieSlice"

const VideoBg = ({ movieId }) => {
    const dispatch = useDispatch();
    const trailerVideo = useSelector(store => store?.movies?.trailerVideo);
    //fetch trailer background
    const getMovieVideos = async () => {
        const data = await fetch(
            'https://api.themoviedb.org/3/movie/'+ movieId + '/videos',
            API_OPTIONS
        );
        const json = await data.json();

        const filterTrailer = json.results.filter(video => video.type === 'Trailer');
        const trailer = filterTrailer.length ? filterTrailer[0] : json.results[0];
        console.log(trailer);
        dispatch(addTrailerVideo(trailer))
    }

    useEffect(() => {
        getMovieVideos();
    }, []);


    return (
        <div>
            <iframe
                width="560"
                height="315"
                src={"https://www.youtube.com/embed/" +trailerVideo?.key}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen>
            </iframe>
        </div>
    )
}

export default VideoBg