import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly storageKey = 'prefer-theme';
  private darkClass = 'dark-theme';

  constructor() {
    const theme = localStorage.getItem(this.storageKey);

    if (theme === 'dark') {
      this.enableDark();
    } else {
      this.enableLight();
    }
  }

  toggleTheme(): void {
    document.body.classList.contains(this.darkClass) ? this.enableLight() : this.enableDark();
  }

  enableDark(): void {
    document.body.classList.add(this.darkClass);
    localStorage.setItem(this.storageKey, 'dark');
  }

  enableLight(): void {
    document.body.classList.remove(this.darkClass);
    localStorage.setItem(this.storageKey, 'light');
  }

  isDarkMode(): boolean {
    return document.body.classList.contains(this.darkClass);
  }
}
