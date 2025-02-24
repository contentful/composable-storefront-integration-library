import { TestBed } from '@angular/core/testing';
import { ContentfulService } from '../services/contentful.service';
import { ContentfulSlotDecorator } from './contentful-slot-decorator';

class MockContentfulService {
  addContentfulContract() {}
}
describe('ContentfulSlotDecorator', () => {
  let decorator: ContentfulSlotDecorator;
  let contentfulService: ContentfulService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ContentfulSlotDecorator,
        {
          provide: ContentfulService,
          useClass: MockContentfulService,
        },
      ],
    });
    decorator = TestBed.inject(ContentfulSlotDecorator);
    contentfulService = TestBed.inject(ContentfulService);
  });

  it('should be created', () => {
    expect(decorator).toBeTruthy();
  });

  it('should call addContentfulContract', () => {
    const slot = { properties: { contentful: { uuid: 'test-id' } } };
    spyOn(contentfulService, 'addContentfulContract');
    decorator.decorate(null, null, slot);
    expect(contentfulService.addContentfulContract).toHaveBeenCalledWith(
      null,
      null,
      slot.properties
    );
  });
});
