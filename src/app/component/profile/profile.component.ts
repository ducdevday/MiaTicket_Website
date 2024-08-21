import { Component } from '@angular/core';
import { MenuLayoutComponent } from '../../common/menu-layout/menu-layout.component';
import { CalendarModule } from 'primeng/calendar';
import { AvatarModule } from 'primeng/avatar';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MenuLayoutComponent,
    CalendarModule,
    AvatarModule,
    FileUploadModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  selectedFile: File | null = null;

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      this.previewImage(this.selectedFile);
    }
  }

  previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const avatarImage = document.querySelector('img') as HTMLImageElement;
      avatarImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
