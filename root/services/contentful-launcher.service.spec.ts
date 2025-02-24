import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { FeatureModulesService, ScriptLoader } from '@spartacus/core';
import { defaultContentfulConfig } from '../config/default-contentful-config';
import { ContentfulConfig } from '../config/contentful-config';
import { ContentfulLauncherService } from './contentful-launcher.service';
import { of } from 'rxjs';

class MockLocation {
  path() {
    return '';
  }
}

class MockScriptLoader {
  public embedScript(): void {}
}

class MockFeatureModulesService implements Partial<FeatureModulesService> {
  isConfigured = () => true;
  resolveFeature = () => of(undefined);
}

describe('ContentfulLauncherService', () => {
  let contentfulLauncherService: ContentfulLauncherService;
  let location: Location;
  let scriptLoader: ScriptLoader;
  let featureModules: FeatureModulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Location, useClass: MockLocation },
        { provide: ContentfulConfig, useValue: defaultContentfulConfig },
        { provide: ScriptLoader, useClass: MockScriptLoader },
        { provide: FeatureModulesService, useClass: MockFeatureModulesService },
      ],
    });

    contentfulLauncherService = TestBed.inject(ContentfulLauncherService);
    location = TestBed.inject(Location);
    scriptLoader = TestBed.inject(ScriptLoader);
    featureModules = TestBed.inject(FeatureModulesService);
  });

  it('should be created', () => {
    expect(contentfulLauncherService).toBeTruthy();
  });

  describe('should get whether Spartacus is launched in Contentful', () => {
    it('launched in contentful when storefrontPreviewRoute matches, and there is cmsTicketId', () => {
      spyOn(location, 'path').and.returnValue(
        '/any/cx-preview?cmsTicketId=test-cms-ticket-id'
      );
      const launched = contentfulLauncherService.isLaunchedInContentful();
      expect(launched).toBeTruthy();
    });

    it('not launched in contentful when storefrontPreviewRoute does not matches', () => {
      spyOn(location, 'path').and.returnValue(
        '/any/cx-something?cmsTicketId=test-cms-ticket-id'
      );
      const launched = contentfulLauncherService.isLaunchedInContentful();
      expect(launched).toBeFalsy();
    });

    it('not launched in contentful when there is no cmsTicketId', () => {
      spyOn(location, 'path').and.returnValue('/any/cx-preview');
      const launched = contentfulLauncherService.isLaunchedInContentful();
      expect(launched).toBeFalsy();
    });
  });

  describe('should lazy load ContentfulModule', () => {
    it('lazy load ContentfulModule', () => {
      spyOn(location, 'path').and.returnValue(
        '/any/cx-preview?cmsTicketId=test-cms-ticket-id'
      );
      spyOn(featureModules, 'resolveFeature').and.callThrough();

      contentfulLauncherService.load();
      expect(featureModules.resolveFeature).toHaveBeenCalledWith('contentful');
    });
  });

  it('should be able to load webApplicationInjector.js', () => {
    spyOn(location, 'path').and.returnValue(
      '/any/cx-preview?cmsTicketId=test-cms-ticket-id'
    );
    spyOn(scriptLoader, 'embedScript').and.callThrough();

    contentfulLauncherService.load();
    expect(scriptLoader.embedScript).toHaveBeenCalled();
  });
});
