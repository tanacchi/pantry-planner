// およよ
import { describe, it, expect, vi, beforeEach } from "vitest";
import { initLiff } from "./initLiff";

vi.mock("@line/liff", () => ({
  default: {
    use: vi.fn(),
    init: vi.fn().mockResolvedValue(undefined),
    $mock: { set: vi.fn() },
  },
}));

describe("initLiff", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("通常モードでliff.initが呼ばれる", async () => {
    const liffId = "test-liff-id";
    const liff = await initLiff(liffId);
    expect(liff.init).toHaveBeenCalledWith({ liffId });
  });

  it("useMock=trueでモックプラグインとmock初期化が呼ばれる", async () => {
    const liffId = "mock-liff-id";
    const mockSet = vi.fn();
    // @ts-ignore
    const liff = (await import("@line/liff")).default;
    liff.$mock = { set: mockSet };
    vi.mock("@line/liff-mock", () => ({ default: vi.fn().mockImplementation(() => ({})) }));
    const result = await initLiff(liffId, true);
    expect(liff.use).toHaveBeenCalled();
    expect(liff.init).toHaveBeenCalledWith({ liffId, mock: true });
    expect(mockSet).toHaveBeenCalled();
    expect(result).toBe(liff);
  });
});
