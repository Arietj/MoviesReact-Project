import { Link } from "react-router-dom";
import { useFavorites } from "../context/favorites-context";
import type React from "react";


export default function MovieCard({ movie }: { movie: any }) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
    
    const handleFavorites = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if(isFavorite(movie.id)) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie.id);
        }
    };

    const favorite = isFavorite(movie.id);
    const year = movie.startYear || "N/A";
    const rating = movie.rating?.aggregateRating || "N/A";
    const genres = (movie.genres || []).slice(0, 2);

    return (
    <div className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <Link to={`/movie/${movie.id}`} className="flex-1 block">
        <div className="aspect-[2/3] overflow-hidden bg-slate-100 relative group">
              {movie.primaryImage?.url ? (
                    <>
                      <img
                        src={movie.primaryImage.url}
                        alt={movie.primaryTitle}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-bold text-lg">Смотреть</span>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 bg-gradient-to-br from-slate-100 to-slate-200">
              Нет постера
            </div>
          )}
        </div>

        <div className="p-3">
          <h3 className="font-bold text-slate-800 line-clamp-2 leading-tight text-sm">
            {movie.primaryTitle}
          </h3>
          
         
          {genres.length > 0 && (
            <div className="flex gap-1 mt-2 mb-2 flex-wrap">
              {genres.map((genre: string) => (
                <span key={genre} className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                  {genre}
                </span>
              ))}
            </div>
          )}
          
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-slate-500">{year}</span>
            {rating !== "N/A" && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                <span className="text-xs font-semibold text-slate-700">{parseFloat(rating).toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </Link>

      <div className="p-3 pt-0">
        <button
          onClick={handleFavorites}
          className={`w-full py-2 px-3 rounded-lg font-medium text-sm transition-all active:scale-95 ${
            favorite
              ? "bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {favorite ? "❤️ Удалить" : "🤍 В избранное"}
        </button>
      </div>
    </div>
  );
}