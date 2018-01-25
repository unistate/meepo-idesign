import {
    Component, OnInit, ViewChild, ElementRef,
    Host, Optional, Injectable, Output, EventEmitter,
    InjectionToken
} from '@angular/core';
import { HostBinding, ViewEncapsulation } from '@angular/core';
import { DesignLibraryProp, DesignHistoryProp } from './types';
import { guid } from './uuid';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { DesignService } from './design.service';
// 设置
@Component({
    selector: 'design-setting',
    templateUrl: './design-setting.html'
})
export class DesignSettingComponent implements OnInit {
    @HostBinding('class.meepo-design-setting') _setting: boolean = true;
    item: DesignLibraryProp;
    constructor() { }
    ngOnInit() { }
    setSetting(com: DesignLibraryProp) {
        this.item = com;
    }
}
// 预览
@Component({
    selector: 'design-preview',
    templateUrl: './design-preview.html'
})
export class DesignPreviewComponent implements OnInit {
    @HostBinding('class.meepo-design-preview') _preview: boolean = true;
    @Output() onClick: EventEmitter<any> = new EventEmitter();
    components: DesignLibraryProp[] = [];
    historys: DesignHistoryProp[];
    constructor(
        private history: DesignService
    ) { }
    ngOnInit() {
        // 最后一次操作
        this.historys = this.history.getHistory();
        this.history.data$.subscribe(res => {
            res.map(r => {
                const com = this.history.getComponentByName(r.name);
                r.preview = com.preview;
                r.setting = com.setting;
            });
            this.components = res;
        });
        if (this.historys.length > 0) {
            this.history.data$.next(this.historys[0].data);
        }
    }
    _onClick(e: DesignLibraryProp) {
        this.onClick.emit(e);
    }
    _showMore(e: DesignLibraryProp) {
        console.log('显示操作提示');
    }
    addComponent(name: string) {
        const com = this.history.getComponentByName(name);
        try {
            com.uuid = guid();
            this.components.push(com);
            this.updateCache();
        } catch (err) {
            console.log('undefined err', err);
        }
    }
    removeComponent(uuid: string) {
        let idx: number = 0;
        this.components.map((com: DesignLibraryProp, index: number) => {
            if (com.uuid === uuid) {
                idx = index;
            }
        });
        this.components.splice(idx, 1);
        this.updateCache();
    }
    updateCache() {
        const now = new Date();
        const components = JSON.stringify(this.components)
        const history: DesignHistoryProp = {
            name: now.toISOString(),
            data: JSON.parse(components)
        };
        this.historys.unshift(history);
        this.history.updateHistory(this.historys);
    }
}
// 组件库
@Component({
    selector: 'design-library',
    templateUrl: './design-library.html'
})
export class DesignLibraryComponent implements OnInit {
    @HostBinding('class.meepo-design-library') _library: boolean = true;
    components: DesignLibraryProp[] = [];
    constructor(
        private history: DesignService
    ) { }
    ngOnInit() {
        this.history.setComponents();
        this.components = this.history.allComponents;
    }
}
// 操作历史
@Component({
    selector: 'design-history',
    templateUrl: './design-history.html'
})
export class DesignHistoryComponent implements OnInit {
    @HostBinding('class.meepo-design-history') _history: boolean = true;
    items: DesignHistoryProp[] = [];
    constructor(
        public history: DesignService
    ) {
        this.items = this.getLocal();
    }
    ngOnInit() {
        this.history.history$.subscribe(res => {
            this.items = res;
        });
    }

    getLocal(): DesignHistoryProp[] {
        return this.history.getHistory();
    }

    backToHistory(item: DesignHistoryProp) {
        this.history.backToHistory(item);
    }
}



// 容器
@Component({
    selector: 'design',
    templateUrl: './design.html',
    styleUrls: ['./design.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DesignComponent implements OnInit {
    @HostBinding('class.meepo-design') _design: boolean = true;

    @ViewChild(DesignSettingComponent) _setting: DesignSettingComponent;
    @ViewChild(DesignLibraryComponent) _library: DesignLibraryComponent;
    @ViewChild(DesignPreviewComponent) _preview: DesignPreviewComponent;
    @ViewChild(DesignHistoryComponent) _history: DesignHistoryComponent;

    constructor() { }
    ngOnInit() {

     }

    setSetting(com: DesignLibraryProp) {
        this._setting.setSetting(com);
    }
}