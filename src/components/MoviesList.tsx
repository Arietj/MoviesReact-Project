import MovieCard from "./MovieCard";

export default function Movieslist({movies}) { 
   
    return(<div className='grid grid-cols-4 gap-2'>
        {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie}/>
        ))}
    </div>)
}