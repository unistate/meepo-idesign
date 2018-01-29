import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FlexHoverDirective } from './hover';

import { IDesignModule } from './design/design.module';
import { components, entryComponents, libraryComponents, PreviewComponents } from './components/index';

import { DESIGN_COMPONENTS } from 'meepo-idesign-share';
import { IpreviewComponent } from './preview/preview';
import { We7RouterModule } from 'meepo-we7-router';

import { both as flexBoth, entrys as flexEntrys, preview as flexPreview } from './components/weui-flex/public_api';
import { both as imageBoth, entrys as imageEntrys, preview as imagePreview } from './components/weui-image/public_api';


import { DESIGN_LIBRARYS, IDesignComponentModule } from 'meepo-idesign-share';

@NgModule({
  declarations: [
    AppComponent,
    IpreviewComponent,
    FlexHoverDirective,
    ...entryComponents,
    ...flexEntrys,
    ...imageEntrys
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([{
      path: '',
      pathMatch: 'full',
      redirectTo: 'design'
    }, {
      path: 'preview',
      component: IpreviewComponent
    }], { useHash: true }),
    IDesignModule.forRoot([{
      title: '任务大厅'
    }, {
      title: '发单页面'
    }, {
      title: '个人中心'
    }, {
      title: '跑腿认证'
    }]),
    FormsModule,
    ReactiveFormsModule,
    IDesignComponentModule.forRoot([], true)
  ],
  providers: [
    {
      provide: DESIGN_COMPONENTS,
      useValue: components,
      multi: true
    },
    {
      provide: DESIGN_LIBRARYS,
      useValue: [flexBoth, imageBoth],
      multi: true
    }
  ],
  entryComponents: [
    ...entryComponents,
    ...flexEntrys,
    ...imageEntrys
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
