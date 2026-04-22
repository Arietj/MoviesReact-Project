import Movieslist from "../components/MoviesList";
import { useFavorites } from "../context/favorites-context";
import { useEffect, useState } from "react";
import { getMoviesByIds } from "../services/api";

export default function Favorites() {
    const { favorites } = useFavorites();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getMoviesByIds(favorites).then((data) => {
            setMovies(data);
        });
    }, [favorites]);

    return (
        <div>
            <Movieslist movies={movies} />
            
        </div>
    );
}