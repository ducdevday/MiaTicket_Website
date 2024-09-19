import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  Router,
  ActivatedRoute,
  NavigationEnd,
} from '@angular/router';
import { ToastService } from './service/toast.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmService } from './service/confirm.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProcessingService } from './service/processing.service';
import { ProcessingComponent } from './common/processing/processing.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    RouterModule,
    ToastModule,
    ConfirmDialogModule,
    ProcessingComponent,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    ToastService,
    MessageService,
    ConfirmService,
    ConfirmationService,
    ProcessingService,
  ],
})
export class AppComponent {
  title = 'MiaTicket.UI';
  showHeader = true;
  showFooter = true;
  showSearchBar = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        let currentRoute = this.activatedRoute.root;
        while (currentRoute.firstChild) {
          currentRoute = currentRoute.firstChild;
        }
        this.showHeader = currentRoute.snapshot.data['showHeader'] !== false;
        this.showFooter = currentRoute.snapshot.data['showFooter'] !== false;
        this.showSearchBar =
          currentRoute.snapshot.data['showSearchBar'] !== false;
      });
  }
}
