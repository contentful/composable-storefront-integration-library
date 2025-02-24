import { TestBed } from '@angular/core/testing';
import { ContentfulService } from '../services/contentful.service';
import { ContentfulComponentDecorator } from './contentful-component-decorator';

class MockContentfulService {
  addContentfulContract() {}
}
describe('ContentfulComponentDecorator', () => {
  let decorator: ContentfulComponentDecorator;
  let contentfulService: ContentfulService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ContentfulComponentDecorator,
        {
          provide: ContentfulService,
          useClass: MockContentfulService,
        },
      ],
    });
    decorator = TestBed.inject(ContentfulComponentDecorator);
    contentfulService = TestBed.inject(ContentfulService);
  });

  it('should be created', () => {
    expect(decorator).toBeTruthy();
  });

  it('should call addContentfulContract', () => {
    const component = { properties: { contentful: { uuid: 'test-id' } } };
    spyOn(contentfulService, 'addContentfulContract');
    decorator.decorate(null, null, component);
    expect(contentfulService.addContentfulContract).toHaveBeenCalledWith(
      null,
      null,
      component.properties
    );
  });
});
