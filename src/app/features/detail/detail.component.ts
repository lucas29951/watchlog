import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OmdbService } from '../../core/services/omdb.service';
import { StorageService } from '../../core/services/storage.service';
import { CommonModule } from '@angular/common';
import { Media } from '../../core/models/media.model';
import { NotificationComponent } from '../../shared/components/notification/notification.component';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, NotificationComponent],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  media: any;
  isInLibrary: boolean = false;
  showNotification: boolean = false;
  notificationMessage: string = '';
  notificationType: 'is-success' | 'is-danger' | 'is-info' = 'is-success';

  constructor(
    private route: ActivatedRoute,
    private omdb: OmdbService,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');

      if (id) {
        this.omdb.getMediaDetails(id).subscribe(data => {
          this.media = data;

          const list = this.storage.getList();
          //const list: Media[] = saved ? JSON.parse(saved) : [];
          this.isInLibrary = list.some(m => m.imdbID === data.imdbID);
        });
      }
  }

  addToList(): void {
    this.storage.addToList(this.media);
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
      this.notificationMessage = 'Eliminado de la lista.';
      this.notificationType = 'is-danger';
    } else {
      list.push(this.media);
      this.notificationMessage = 'Agregado a la lista.';
      this.notificationType = 'is-success';
    }

    this.storage.saveList(list);
    this.isInLibrary = !this.isInLibrary;
    this.showNotification = true;
  }
}
