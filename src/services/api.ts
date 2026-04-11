const API = "https://imdbapi.dev";

export const searchMovies = async (query: string, limit = 50) => {
    const res = await fetch(`${API}/search/titles?query=${query}&limit=${limit}`);
    return res.json();
}

export const getMovieById = async (id: string) => {
    const res = await fetch(`${API}/titles/${id}`);
    return res.json();  
}