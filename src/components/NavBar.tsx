import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-slate-900 text-white px-6 py-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          MovieStore
        </Link>
        
        <div className="flex gap-6">
          <Link to="/" className="hover:text-blue-400 transition">
            Поиск
          </Link>
          <Link to="/favorites" className="hover:text-blue-400 transition">
            Избранное
          </Link>
        </div>
      </div>
    </nav>
  );
}