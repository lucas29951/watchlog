import { Component } from '@angular/core';
import { OmdbService } from '../../core/services/omdb.service';
import { Media } from '../../core/models/media.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MediaCardComponent } from "../../shared/components/media-card/media-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, MediaCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  query: string = '';
  results: Media[] = [];
  movies: Media[] = [];
  series: Media[] = [];
  animes: Media[] = [];
  searched = false;
  activeTab: 'movie' | 'series' | 'anime' = 'movie';

  constructor(private omdb: OmdbService) {}

  search(): void {
    if (!this.query) return;

    this.omdb.searchMedia(this.query).subscribe(res => {
      this.searched = true;
      this.results = res.Search?.map((item: any) => ({
        imdbID: item.imdbID,
        Title: item.Title,
        Year: item.Year,
        Type: item.Type,
        Poster: item.Poster,
        imdbRating: item.imdbRating,
        Genre: item.Genre,
        Director: item.Director,
        Plot: item.Plot
      })) || [];

      this.movies = this.results.filter(m => m.Type === 'movie');
      this.series = this.results.filter(m => m.Type === 'series');
      this.animes = this.results.filter(m => m.Type === 'anime');
    });
  }

  setTab(tab: 'movie' | 'series' | 'anime') {
    this.activeTab = tab;
  }
}
