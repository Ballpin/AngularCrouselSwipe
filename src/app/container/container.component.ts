import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  // constant for swipe action: left or right
  SWIPE_ACTION = {LEFT: 'swiperight', RIGHT: 'swipeleft'};

  @ViewChild('carousel') carousel;
  @ViewChild('carouselInner') carouselInner;
  @ViewChild('sticky') sticky;

  private setWidth() {
    const children = this.carouselInner.nativeElement.children;
    const childWidth = children[0].offsetWidth;
    const containerWidth = (childWidth * children.length) + 10;
    this.carouselInner.nativeElement.style.width = containerWidth + 'px';
    this.carousel.nativeElement.style.width = `${childWidth}px`;

    for (const el of children) {
      el.style.width = childWidth + 'px';
    }
  }

  swipe(target, action) {
    const containerWidth = this.carousel.nativeElement.offsetWidth;
    const style = window.getComputedStyle(target);
    const matrix = new WebKitCSSMatrix(style.webkitTransform);
    const index = Array.from(target.parentNode.children).indexOf(target);


    if (action === this.SWIPE_ACTION.LEFT && index === 1) {
      target.classList.add('animate');
      target.style.transform = `translateX(${-containerWidth}px)`;

      target.classList.add('animate');
      target.style.transform = `translateX(${(0)}px)`;

      target.previousElementSibling.classList.add('animate');
      target.previousElementSibling.style.transform = `translateX(${(matrix.m41 + containerWidth) + 4}px)`;

    } else if (action === this.SWIPE_ACTION.RIGHT && index === 0) {
      console.log('right');
      target.classList.add('animate');
      target.style.transform = `translateX(${-containerWidth}px)`;

      target.nextElementSibling.classList.add('animate');
      target.nextElementSibling.style.transform = `translateX(${-containerWidth - 4}px)`;
    }
  }

  showPane(index) {

  }

  constructor() { }

  ngOnInit() {
    this.setWidth();
  }

}
