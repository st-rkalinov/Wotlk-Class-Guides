import * as fromGuide from './guide.actions';

describe('loadGuides', () => {
  it('should return an action', () => {
    expect(fromGuide.loadGuides().type).toBe('[Guide] Load Guides');
  });
});
