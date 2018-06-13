"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var HomeViewComponent = /** @class */ (function () {
    function HomeViewComponent(_elementRef) {
        this._elementRef = _elementRef;
    }
    HomeViewComponent.prototype.ngOnInit = function () {
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
    };
    HomeViewComponent = __decorate([
        core_1.Component({
            selector: 'marcswilson-home-view',
            templateUrl: './home-view.component.html',
            styleUrls: ['./home-view.component.scss']
        })
    ], HomeViewComponent);
    return HomeViewComponent;
}());
exports.HomeViewComponent = HomeViewComponent;
//# sourceMappingURL=home-view.component.js.map