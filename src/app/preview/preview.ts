import { Component, OnInit, KeyValueDiffers, ElementRef, Renderer2 } from '@angular/core';
import { ReactComponent } from 'ng-react-component';
import { DesignPropsService } from 'meepo-idesign-share';

@Component({
    selector: 'ipreview',
    templateUrl: './preview.html',
    styleUrls: ['./preview.scss']
})
export class IpreviewComponent extends ReactComponent<any, any> {
    constructor(
        differs: KeyValueDiffers,
        public history: DesignPropsService,
        render: Renderer2,
        ele: ElementRef
    ) {
        super(differs, ele, render);
    }
    ngOnInit() {
        this.history.backToHistory();
    }
    onStateChange() { }
    onPropsChange() { }
}
