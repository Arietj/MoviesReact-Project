import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieById } from "../services/api";
import { useFavorites } from "../context/favorites-context";


export default function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
    const [movie, setMovie] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            setLoading(true);
            getMovieById(id).then((data) => {
                setMovie(data);
                setLoading(false);
            }).catch((error) => {
                console.error("Ошибка загрузки фильма:", error);
                setLoading(false);
            });
        }
    }, [id]);

    const handleFavorites = () => {
        if (movie) {
            if (isFavorite(movie.id)) {
                removeFromFavorites(movie.id);
            } else {
                addToFavorites(movie.id);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl text-slate-500">Загрузка...</div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <div className="text-xl text-slate-500">Фильм не найден</div>
                <button 
                    onClick={() => navigate("/")}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Вернуться на главную
                </button>
            </div>
        );
    }

    const year = movie.startYear || "N/A";
    const rating = movie.rating?.aggregateRating || "N/A";
    const runtimeMins = movie.runtimeSeconds ? Math.round(movie.runtimeSeconds / 60) : "N/A";
    const genres = movie.genres || [];
    const favorite = isFavorite(movie.id);
    const description = movie.plot || "Описание недоступно";

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
            <button
                onClick={() => navigate(-1)}
                className="fixed top-24 left-6 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow z-10"
            >
                ← Назад
            </button>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    <div className="md:col-span-1">
                        <div className="sticky top-24">
                            <div className="aspect-[2/3] overflow-hidden rounded-lg shadow-lg mb-6">
                                {movie.primaryImage?.url ? (
                                    <img
                                        src={movie.primaryImage.url}
                                        alt={movie.primaryTitle}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 text-slate-400">
                                        Нет постера
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={handleFavorites}
                                className={`w-full py-3 px-4 rounded-lg font-bold transition-all active:scale-95 text-lg ${
                                    favorite
                                        ? "bg-rose-500 text-white hover:bg-rose-600 shadow-lg"
                                        : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
                                }`}
                            >
                                {favorite ? "❤️ В избранном" : "🤍 В избранное"}
                            </button>
                        </div>
                    </div>

                    
                    <div className="md:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-8">
                            
                            <h1 className="text-4xl font-bold text-slate-800 mb-2">
                                {movie.primaryTitle}
                            </h1>
                            {movie.originalTitle && movie.originalTitle !== movie.primaryTitle && (
                                <p className="text-lg text-slate-500 mb-4">
                                    {movie.originalTitle}
                                </p>
                            )}

                            {/* Основная информация - красивый инфоблок */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg border border-slate-200">
                                {/* Рейтинг */}
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <span className="text-3xl text-yellow-400">★</span>
                                        <span className="text-2xl font-bold text-slate-800">
                                            {rating !== "N/A" ? parseFloat(rating).toFixed(1) : "N/A"}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 font-medium">Рейтинг</p>
                                </div>

                                {/* Год */}
                                <div className="text-center">
                                    <div className="mb-2">
                                        <span className="text-2xl font-bold text-slate-800">{year}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 font-medium">Год</p>
                                </div>

                                {/* Длительность */}
                                {runtimeMins !== "N/A" && (
                                    <div className="text-center">
                                        <div className="mb-2">
                                            <span className="text-2xl font-bold text-slate-800">{runtimeMins}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 font-medium">Минут</p>
                                    </div>
                                )}

                                {/* Жанры (количество) */}
                                {genres.length > 0 && (
                                    <div className="text-center">
                                        <div className="mb-2">
                                            <span className="text-2xl font-bold text-blue-600">{genres.length}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 font-medium">Жанров</p>
                                    </div>
                                )}
                            </div>

                            {/* Жанры - подробнее */}
                            {genres.length > 0 && (
                                <div className="mb-8 pb-8 border-b border-slate-200">
                                    <h3 className="text-sm font-semibold text-slate-600 uppercase mb-4">🎭 Жанры</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {genres.map((genre: string) => (
                                            <span
                                                key={genre}
                                                className="px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-lg text-sm font-semibold border border-blue-200 hover:shadow-md transition-shadow"
                                            >
                                                {genre}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}


                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    📖 Описание
                                </h3>
                                <p className="text-slate-600 leading-relaxed text-justify bg-slate-50 p-4 rounded-lg border border-slate-200">
                                    {description}
                                </p>
                            </div>

                            {/* Актёры */}
                            {(movie.stars?.length > 0) && (
                                <div className="pt-8 border-t border-slate-200">
                                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                        🎬 В главных ролях
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {movie.stars?.slice(0, 6).map((star: any, idx: number) => (
                                            <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
                                                {star.primaryImage?.url && (
                                                    <img 
                                                        src={star.primaryImage.url} 
                                                        alt={star.displayName}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                )}
                                                <span className="text-sm font-semibold text-slate-700">
                                                    {star.displayName || star.id}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}