import { PantryDtoMapper } from './pantry.dto-mapper';

describe('PantryDtoMapper', () => {
  it('should map entity to dto', () => {
    const entity = {
      id: 1,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
    const dto = PantryDtoMapper.toResponseDto(entity);
    expect(dto).toMatchObject({ id: 1, userId: 1 });
  });
});
