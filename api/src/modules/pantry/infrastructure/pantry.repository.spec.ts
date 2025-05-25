import { PantryRepository } from './pantry.repository';

describe('PantryRepository', () => {
  let repo: PantryRepository;

  beforeEach(() => {
    repo = new PantryRepository();
  });

  it('should have findById method', () => {
    expect(typeof repo.findById).toBe('function');
  });
});
