import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const VideoBg = ({ movieId }) => {
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
    }

    useEffect(() => {
        getMovieVideos();
    }, []);


    return (
        <div>
            <iframe
                width="560"
                height="315"
                src={"https://www.youtube.com/embed/X4d_v-HyR4o?si=ka9KURuVP4VmZyRg"}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen>
            </iframe>
        </div>
    )
}

export default VideoBg