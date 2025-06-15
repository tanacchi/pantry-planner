import { Test, type TestingModule } from "@nestjs/testing";
import { MockPrismaService } from "../../../infrastructure/prisma/mock-prisma.service";
import { PrismaService } from "../../../infrastructure/prisma/prisma.service";
import type { User } from "../domain/entity/user.entity";
import { UserRepository } from "./user.repository";

// テスト用のユーザーデータ
const mockUser = {
  id: 1,
  lineUid: "test-line-uid",
  createdAt: new Date(),
  updatedAt: new Date(),
  lastLoginAt: new Date(),
};

describe("UserRepository (with MockPrismaService)", () => {
  let userRepository: UserRepository;
  let prisma: MockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository, { provide: PrismaService, useClass: MockPrismaService }],
    }).compile();
    userRepository = module.get(UserRepository);
    prisma = module.get(PrismaService);
    // 初期化
    await prisma.user.create({ data: { lineUid: mockUser.lineUid } });
  });

  it("findById calls prisma.user.findUnique with correct args", async () => {
    const spy = jest.spyOn(prisma.user, "findUnique");
    await userRepository.findById(1);
    expect(spy).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it("findByLineUid calls prisma.user.findUnique with correct args", async () => {
    const spy = jest.spyOn(prisma.user, "findUnique");
    await userRepository.findByLineUid(mockUser.lineUid);
    expect(spy).toHaveBeenCalledWith({ where: { lineUid: mockUser.lineUid } });
  });

  it("findAll calls prisma.user.findMany", async () => {
    const spy = jest.spyOn(prisma.user, "findMany");
    await userRepository.findAll();
    expect(spy).toHaveBeenCalled();
  });

  it("create calls prisma.user.create with correct args", async () => {
    const spy = jest.spyOn(prisma.user, "create");
    await userRepository.create("new-line-uid");
    expect(spy).toHaveBeenCalledWith({ data: { lineUid: "new-line-uid" } });
  });

  it("update calls prisma.user.update with correct args", async () => {
    const spy = jest.spyOn(prisma.user, "update");
    const user: User = { ...mockUser };
    await userRepository.update(user);
    expect(spy).toHaveBeenCalledWith({
      where: { id: user.id },
      data: {
        id: user.id,
        lineUid: user.lineUid,
        createdAt: user.createdAt,
        updatedAt: expect.anything() as unknown as Date, // 型安全なDateのマッチャー
        lastLoginAt: user.lastLoginAt,
      },
    });
  });

  it("delete calls prisma.user.delete with correct args", async () => {
    const spy = jest.spyOn(prisma.user, "delete");
    await userRepository.delete(1);
    expect(spy).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
