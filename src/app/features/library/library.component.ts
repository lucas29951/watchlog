import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../core/services/storage.service';
import { Media } from '../../core/models/media.model';
import { CommonModule } from '@angular/common';
import { MediaCardComponent } from "../../shared/components/media-card/media-card.component";
import { NotificationComponent } from '../../shared/components/notification/notification.component';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, MediaCardComponent, NotificationComponent],
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  list: Media[] = [];
  viewMode: 'grid' | 'list' = 'grid';
  showNotification: boolean = false;
  notificationMessage: string = '';

  constructor(private storage: StorageService) {}

  ngOnInit(): void {
      this.list = this.storage.getList();
  }

  remove(id: string): void {
    this.storage.removeFromList(id);
    this.list = this.storage.getList();
  }

  removeFromLibrary(id: string): void {
    this.list = this.list.filter(item => item.imdbID !== id);
    this.storage.saveList(this.list);

    this.notificationMessage = 'Elemento eliminado de la lista.';
    this.showNotification = true;
  }

  switchView(mode: 'grid' | 'list') {
    this.viewMode = mode;
  }

  getRatingColor(rating: number): string {
    if (rating >= 7) return 'green';
    if (rating >= 5) return 'yellow';
    return 'red';
  }
}
