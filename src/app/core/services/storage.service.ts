import { Injectable } from '@angular/core';
import { Media } from '../models/media.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private key = 'watchlog-list';

  getList(): Media[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  saveList(list: Media[]): void {
    localStorage.setItem(this.key, JSON.stringify(list));
  }

  addToList(item: Media): void {
    const list = this.getList();

    if (!list.some(m => m.imdbID === item.imdbID)) {
      list.push(item);
      this.saveList(list);
    }
  }

  removeFromList(id: string): void {
    const list = this.getList().filter(m => m.imdbID !== id);
    this.saveList(list);
  }
}
