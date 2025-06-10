import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OmdbService } from '../../core/services/omdb.service';
import { StorageService } from '../../core/services/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  media: any;

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
        });
      }
  }

  addToList(): void {
    this.storage.addToList(this.media);
  }
}
