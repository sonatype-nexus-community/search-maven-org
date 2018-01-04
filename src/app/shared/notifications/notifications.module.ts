import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from "./notification.service";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [NotificationService]
})
export class NotificationsModule {
}
