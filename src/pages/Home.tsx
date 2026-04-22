import { useEffect, useState } from 'react';
import { boardMovies, searchMovies } from '../services/api';
import SearchBar from '../components/SearchBar';
import MoviesList from '../components/MoviesList';

    export default function Home() {
        const [movies, setMovies] = useState([]);

        useEffect (() =>{
            boardMovies().then(data => {
                setMovies(data.titles);
            });
        }, []);

        const handleSearch = (query) => {
            searchMovies(query).then(data => {
                setMovies(data.titles);
            });
        };

       

        return (
            <div className='max-w-6xl mx-auto px-4 py-10'>
              <div className='mb-12 text-center'>
                <h1 className='text-4xl font-extrabold text-slate-900 mb-4'>Поиск Популярных Фильмов</h1>
                <p className='text-lg text-slate-600 mb-8 max-w-2xl mx-auto'>Здесь вы можете найти информацию о фильмах</p>
                <SearchBar onSearch={handleSearch}/>
              </div>
                
                <MoviesList  movies={movies} />
            </div>
        );
    }