import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Ngrx
import { Store } from '@ngrx/store';
import * as CarouselActions from './store/carousel.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {

  private initialIndex = 0;
  private currentIndex = 0;

  private readonly PAGES: string[] = [
    'home',
    'overview',
    'page1'
  ];

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router
  ) {
    this.currentIndex = this.initialIndex;
  }

  ngOnInit = (): void => {

  }

  /**
   * @Procedure to slide to te right
   */
  slideRight = () => {
    this
      .increment()
      // .goPage()
      .dispatchChain();
  }

  /**
   * @Procedure to slide to the left
   */
  slideLeft = () => {
    this
      .decrement()
      // .goPage()
      .dispatchChain();
  }

  /**
   * @Chainable
   */
  increment = () => {
    this.currentIndex++;
    if (!this.PAGES[this.currentIndex]) {
      this.currentIndex = 0;
    }
    return this;
  }

  /**
  * @Chainable
  */
  decrement = () => {
    this.currentIndex--;
    if (!this.PAGES[this.currentIndex]) {
      this.currentIndex = this.PAGES.length - 1;
    }
    return this;
  }

  /**
   * @Chainable
   */
  goPage = () => {
    this.router.navigateByUrl(this.PAGES[this.currentIndex]);
    return this;
  }

  /**
   * @Chainable dispatch method
   */
  dispatchChain = () => {
    this.store.dispatch(new CarouselActions.SlideToPage(this.currentIndex, this.router));
    return this;
  }
}
