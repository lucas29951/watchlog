import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Media } from '../../../core/models/media.model';
import { OmdbService } from '../../../core/services/omdb.service';

@Component({
  selector: 'app-media-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.css']
})
export class MediaCardComponent implements OnInit {

  @Input() media!: Media;

  constructor(
    private router: Router,
    private omdb: OmdbService
  ) {}

  ngOnInit(): void {
      this.omdb.getMediaDetails(this.media.imdbID).subscribe( data => {
        this.media = data;
      });
  }

  goToDetail(): void {
    this.router.navigate(['/detail', this.media.imdbID]);
  }

  getRatingColor(rating: number): string {
    if (rating >= 7) return 'green';
    if (rating >= 5) return 'yellow';
    return 'red';
  }
}
