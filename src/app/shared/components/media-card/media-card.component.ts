import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Media } from '../../../core/models/media.model';
import { OmdbService } from '../../../core/services/omdb.service';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-media-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.css']
})
export class MediaCardComponent implements OnInit {

  @Input() media!: Media;
  isInLibrary: boolean = false;

  constructor(
    private router: Router,
    private omdb: OmdbService,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
      this.omdb.getMediaDetails(this.media.imdbID).subscribe( data => {
        this.media = data;

        const list = this.storage.getList();
        this.isInLibrary = list.some(m => m.imdbID === data.imdbID);
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

  toggleLibrary(): void {
    let list = this.storage.getList();

    if (this.isInLibrary) {
      list = list.filter(item => item.imdbID !== this.media.imdbID);
    } else {
      list.push(this.media);
    }

    this.storage.saveList(list);
    this.isInLibrary = !this.isInLibrary;
  }
}
