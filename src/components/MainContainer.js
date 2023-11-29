import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBg from "./VideoBg";

const MainContainer = () => {
    const movies = useSelector(store => store?.movies?.nowPlayingMovies);
    
    if(!movies) return;
    const randomMoviePicking = Math.floor(Math.random() * movies?.length);
    const mainMovie = movies[randomMoviePicking];
    // console.log(mainMovie,'main')

    const {original_title, overview, id} = mainMovie;

    return (
        <div className="pt-[30%] bg-black md:p-0">
            <VideoTitle
                title={original_title}
                overview={overview}
            />
            <VideoBg movieId={id}/>
        </div>
    )
}

export default MainContainer;