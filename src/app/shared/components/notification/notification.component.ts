import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {

  @Input() message: string = '';
  @Input() type: 'is-success' | 'is-danger' | 'is-info' = 'is-info';
  @Output() close = new EventEmitter<void>();

  ngOnInit(): void {
    setTimeout(() => this.close.emit(), 3000);
  }
}
