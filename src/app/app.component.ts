import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  showToolbar = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit() {
    /* para que aparesca en una sla ruta
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activatedRoute.children[0].data.subscribe((data) => {
          if (data?.['toolbar']) {
            this.showToolbar = data?.['toolbar'];
            // Asegurarse de que el componente ToolbarComponent está cargado
            // y disponible en la plantilla
          }
        });
      }
    });
    */
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (!!this.tokenStorageService.getToken()) {
          this.showToolbar = true;
        } else {
          this.showToolbar = false;
        }
      }
    });
  }
}
