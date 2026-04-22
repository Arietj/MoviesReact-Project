import Movieslist from "../components/MoviesList";
import { useFavorites } from "../context/favorites-context";
import { useEffect, useState } from "react";
import { getMoviesByIds } from "../services/api";

export default function Favorites() {
    const { favorites } = useFavorites();
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        if (favorites.length > 0) {
            getMoviesByIds(favorites)
                .then((data) => {
                    setMovies(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Ошибка при загрузке фильмов:", error);
                    setLoading(false);
                });
        } else {
            setMovies([]);
            setLoading(false);
        }
    }, [favorites]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">
                        ❤️ Мое избранное
                    </h1>
                    <div className="flex items-center gap-6">
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold bg-gradient-to-r from-rose-400 to-rose-600 bg-clip-text text-transparent">
                                {movies.length}
                            </span>
                            <span className="text-slate-600">
                                {movies.length === 1 ? "фильм" : movies.length < 5 ? "фильма" : "фильмов"}
                            </span>
                        </div>
                        <div className="h-8 w-px bg-slate-300"></div>
                        <p className="text-slate-600">
                            Коллекция фильмов, которые вам нравятся
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-lg text-slate-500">Загрузка фильмов...</div>
                    </div>
                ) : movies.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <div className="text-6xl mb-4">🎬</div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">
                            Избранное пусто
                        </h2>
                        <p className="text-slate-600 mb-6">
                            Добавляйте фильмы в избранное, чтобы собрать свою личную коллекцию
                        </p>
                        <a
                            href="/"
                            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            Найти фильмы
                        </a>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <Movieslist movies={movies} />
                    </div>
                )}
            </div>
        </div>
    );
}