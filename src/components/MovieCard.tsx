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

    return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
      <Link to={`/movie/${movie.id}`} className="flex-1">
        <div className="aspect-[2/3] overflow-hidden bg-slate-100">
          {movie.primaryImage?.url ? (
            <img
              src={movie.primaryImage.url}
              alt={movie.primaryTitle}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">
              Нет постера
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-bold text-slate-800 line-clamp-2 leading-tight h-10">
            {movie.primaryTitle}
          </h3>
        </div>
      </Link>

      <div className="p-4 pt-0">
        <button
          onClick={handleFavorites}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-all active:scale-95 ${
            favorite
              ? "bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {favorite ? "Удалить" : "В избранное"}
        </button>
      </div>
    </div>
  );
}