import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MatNativeDateModule} from '@angular/material/core';
import {ExampleModule} from '@gsa-sam/components-examples';

import {SdsDocsApp} from './sds-docs-app';
import {HomepageModule} from './pages/homepage';
import {SDS_DOCS_ROUTES} from './routes';
import {ComponentListModule} from './pages/component-list';
import {ComponentViewerModule} from './pages/component-viewer/component-viewer';
import {ComponentCategoryListModule} from './pages/component-category-list/component-category-list';
import {ComponentSidenavModule} from './pages/component-sidenav/component-sidenav';
import {ComponentPageTitle} from './pages/page-title/page-title';
import {ComponentHeaderModule} from './pages/component-page-header/component-page-header';

import {StackBlitzButtonModule} from './shared/stack-blitz';
import {NavBarModule} from './shared/navbar';

import {DocumentationItems} from './shared/documentation-items/documentation-items';
import {DocViewerModule} from './shared/doc-viewer/doc-viewer-module';
import {
  CanActivateComponentSidenav
} from './pages/component-sidenav/component-sidenav-can-load-guard';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ExampleModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    RouterModule.forRoot(SDS_DOCS_ROUTES, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      relativeLinkResolution: 'corrected'
    }),
    ComponentCategoryListModule,
    ComponentHeaderModule,
    ComponentListModule,
    ComponentSidenavModule,
    ComponentViewerModule,
    DocViewerModule,
    HomepageModule,
    NavBarModule,
    StackBlitzButtonModule,
  ],
  declarations: [SdsDocsApp],
  providers: [
    ComponentPageTitle,
    DocumentationItems,
    CanActivateComponentSidenav,
    {provide: LocationStrategy, useClass: PathLocationStrategy},
  ],
  bootstrap: [SdsDocsApp],
})
export class AppModule {}
