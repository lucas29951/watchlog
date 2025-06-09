export interface Media {
    imdbID: string;
    Title: string;
    Year: string;
    Type: 'movie' | 'series' | 'anime';
    Poster: string;
    Rating: number;
    Genre: string;
    Director: string;
    Plot: string;
}