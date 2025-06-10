import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../core/services/storage.service';
import { Media } from '../../core/models/media.model';
import { CommonModule } from '@angular/common';
import { MediaCardComponent } from "../../shared/components/media-card/media-card.component";

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, MediaCardComponent],
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  list: Media[] = [];

  constructor(private storage: StorageService) {}

  ngOnInit(): void {
      this.list = this.storage.getList();
  }

  remove(id: string): void {
    this.storage.removeFromList(id);
    this.list = this.storage.getList();
  }
}
