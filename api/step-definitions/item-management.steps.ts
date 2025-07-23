import { loadFeature, defineFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from '../src/modules/item/application/item.service';
import { ItemRepository } from '../src/modules/item/infrastructure/item.repository';
import { Item } from '../src/modules/item/domain/entity/item.entity';
import { CreateItemRequestDto, UpdateItemRequestDto } from '../src/modules/item/dto/item-request.dto';

const feature = loadFeature('./features/item-management.feature');

const mockItemRepository = () => ({
  create: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findByPantryId: jest.fn(),
});

defineFeature(feature, (test) => {
  let service: ItemService;
  let itemRepository: ReturnType<typeof mockItemRepository>;
  let result: any;
  let error: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemService,
        { provide: ItemRepository, useFactory: mockItemRepository },
      ],
    }).compile();

    service = module.get<ItemService>(ItemService);
    itemRepository = module.get(ItemRepository);
    result = null;
    error = null;
  });

  test('新しいアイテムを作成する', ({ given, when, then, and }) => {
    let createDto: CreateItemRequestDto;

    given('パントリーID 1 が存在する', () => {
      // パントリーの存在確認はItemServiceでは行わないため、ここでは何もしない
    });

    when('以下の情報でアイテムを作成する:', (table) => {
      const data = table[0];
      createDto = {
        name: data.name,
        category: data.category,
        quantity: parseInt(data.quantity),
        unit: data.unit,
        pantryId: parseInt(data.pantryId),
      };

      const mockItem = new Item(
        1,
        createDto.name,
        createDto.category,
        createDto.pantryId,
        createDto.quantity,
        createDto.unit,
        new Date(),
        new Date(),
        null,
      );

      itemRepository.create.mockResolvedValue(mockItem);

      return service.createItem(createDto).then(
        (res) => (result = res),
        (err) => (error = err),
      );
    });

    then('アイテムが正常に作成される', () => {
      expect(error).toBeNull();
      expect(result).toBeDefined();
      expect(itemRepository.create).toHaveBeenCalledWith(createDto);
    });

    and('作成されたアイテムの名前は "りんご" である', () => {
      expect(result.name).toBe('りんご');
    });

    and('作成されたアイテムの数量は 3 である', () => {
      expect(result.quantity).toBe(3);
    });
  });

  test('アイテムを取得する', ({ given, when, then, and }) => {
    const itemId = 1;

    given('アイテムID 1 のアイテムが存在する', () => {
      const mockItem = new Item(
        itemId,
        'りんご',
        'Food',
        1,
        3,
        '個',
        new Date(),
        new Date(),
        null,
      );
      itemRepository.findById.mockResolvedValue(mockItem);
    });

    when('アイテムID 1 を取得する', () => {
      return service.findItemById(itemId).then(
        (res) => (result = res),
        (err) => (error = err),
      );
    });

    then('アイテムが正常に取得される', () => {
      expect(error).toBeNull();
      expect(result).toBeDefined();
      expect(itemRepository.findById).toHaveBeenCalledWith(itemId);
    });

    and('取得されたアイテムのIDは 1 である', () => {
      expect(result.id).toBe(1);
    });
  });

  test('存在しないアイテムを取得する', ({ given, when, then }) => {
    const itemId = 999;

    given('アイテムID 999 のアイテムが存在しない', () => {
      itemRepository.findById.mockResolvedValue(null);
    });

    when('アイテムID 999 を取得する', () => {
      return service.findItemById(itemId).then(
        (res) => (result = res),
        (err) => (error = err),
      );
    });

    then('アイテムが見つからないエラーが発生する', () => {
      expect(error).toBeDefined();
      expect(result).toBeNull();
    });
  });

  test('アイテムを更新する', ({ given, when, then, and }) => {
    const itemId = 1;
    let updateDto: UpdateItemRequestDto;

    given('アイテムID 1 のアイテムが存在する', () => {
      const mockItem = new Item(
        itemId,
        'りんご',
        'Food',
        1,
        3,
        '個',
        new Date(),
        new Date(),
        null,
      );
      itemRepository.findById.mockResolvedValue(mockItem);
    });

    when('アイテムID 1 の数量を 5 に更新する', () => {
      updateDto = { quantity: 5 };
      
      const updatedItem = new Item(
        itemId,
        'りんご',
        'Food',
        1,
        5,
        '個',
        new Date(),
        new Date(),
        null,
      );
      
      itemRepository.update.mockResolvedValue(updatedItem);

      return service.updateItem(itemId, updateDto).then(
        (res) => (result = res),
        (err) => (error = err),
      );
    });

    then('アイテムが正常に更新される', () => {
      expect(error).toBeNull();
      expect(result).toBeDefined();
      expect(itemRepository.update).toHaveBeenCalledWith(itemId, updateDto);
    });

    and('更新されたアイテムの数量は 5 である', () => {
      expect(result.quantity).toBe(5);
    });
  });

  test('アイテムを削除する', ({ given, when, then }) => {
    const itemId = 1;

    given('アイテムID 1 のアイテムが存在する', () => {
      const mockItem = new Item(
        itemId,
        'りんご',
        'Food',
        1,
        3,
        '個',
        new Date(),
        new Date(),
        null,
      );
      itemRepository.findById.mockResolvedValue(mockItem);
      itemRepository.delete.mockResolvedValue(undefined);
    });

    when('アイテムID 1 を削除する', () => {
      return service.deleteItem(itemId).then(
        (res) => (result = res),
        (err) => (error = err),
      );
    });

    then('アイテムが正常に削除される', () => {
      expect(error).toBeNull();
      expect(itemRepository.delete).toHaveBeenCalledWith(itemId);
    });
  });
});