import { Component, ElementRef, OnInit } from '@angular/core';
import pose from 'popmotion-pose';

@Component({
  selector: 'marcswilson-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {
  private _elementRef: ElementRef;
  constructor(_elementRef: ElementRef) {
    this._elementRef = _elementRef;
  }

  ngOnInit() {
    // const config = {
    //   open: {
    //     scale: 1,
    //     opacity: 1,
    //     transition: {
    //       duration: 300
    //     }
    //   },
    //   closed: {
    //     opacity: 0,
    //     scale: 0,
    //     transition: {
    //       duration: 100
    //     }
    //   },
    //   initialPose: 'closed'
    // };
    // const el = this._elementRef.nativeElement.querySelector('#profilePic');
    // const poser = pose(el, config);
    // poser.set('open');
  }

}
