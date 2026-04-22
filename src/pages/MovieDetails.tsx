import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieById } from "../services/api";


export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        if (id) {
            getMovieById(id).then((data) => {
                setMovie(data);
            });
        }
    }, [id]);

    return (
        <div>
            <h1>{movie?.originalTitle}</h1>
            <img src={movie?.primaryImage?.url} alt={movie?.originalTitle} />
            <p>{movie?.plot?.plotText?.plainText}</p>
        </div>
    );
}