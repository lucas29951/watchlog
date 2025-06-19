export interface Media {
    imdbID: string;
    Title: string;
    Year: string;
    Type: 'movie' | 'series' | 'anime';
    Poster: string;
    imdbRating?: number;
    Genre: string;
    Director: string;
    Plot: string;
}