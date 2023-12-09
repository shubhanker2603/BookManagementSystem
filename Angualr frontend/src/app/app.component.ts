import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bookmanagementapp';
  shouldShowHeader: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    // Subscribe to the router events to detect route changes
    // this.router.events
    //   .pipe(filter(event => event instanceof NavigationEnd))
    //   .subscribe((event: NavigationEnd) => {
    //     // Check the current route and update shouldShowHeader accordingly
    //     this.shouldShowHeader = !event.url.includes('/login');
    //   });
    this.router.events
    .pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    )
    .subscribe((event: NavigationEnd) => {
      // Check the current route and update shouldShowHeader accordingly
      this.shouldShowHeader = !event.url.includes('/login');
    });
  }
}
