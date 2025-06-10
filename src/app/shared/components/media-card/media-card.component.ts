import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Media } from '../../../core/models/media.model';

@Component({
  selector: 'app-media-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.css']
})
export class MediaCardComponent {

  @Input() media!: Media;

  constructor(private router: Router) {}

  goToDetail(): void {
    this.router.navigate(['/detail', this.media.imdbID]);
  }
}
