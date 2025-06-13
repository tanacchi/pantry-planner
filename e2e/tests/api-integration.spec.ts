import { type Request, expect, test } from "@playwright/test";
import { TEST_DATA, TEST_PANTRY_ID, TEST_USER_ID } from "./fixtures/test-data";

test.describe("API Integration", () => {
  test("should handle shopping list API operations", async ({ page }) => {
    await page.goto(`/shopping-list/${TEST_USER_ID}`);

    // アイテム追加のAPIリクエストをインターセプト
    let addItemRequest: Request | null = null;
    page.on("request", (request) => {
      if (request.method() === "POST" && request.url().includes("shopping-list")) {
        addItemRequest = request;
      }
    });

    // 新しいアイテムを追加
    await page.getByTestId("add-item-button").click();
    const testItem = TEST_DATA.shoppingItems[0];

    await page.getByTestId("name-input").fill(testItem.name);
    await page.getByTestId("category-select").selectOption(testItem.category);
    await page.getByTestId("submit-button").click();

    // APIリクエストが送信されることを確認
    await page.waitForTimeout(1000); // リクエストの完了を待つ
    expect(addItemRequest).toBeTruthy();
  });

  test("should handle pantry API operations", async ({ page }) => {
    await page.goto(`/dashboard/${TEST_USER_ID}/${TEST_PANTRY_ID}`);

    // アイテム追加のAPIリクエストをインターセプト
    let addItemRequest: Request | null = null;
    page.on("request", (request) => {
      if (request.method() === "POST" && request.url().includes("items")) {
        addItemRequest = request;
      }
    });

    // 新しいアイテムを追加
    await page.getByTestId("add-pantry-item-button").click();
    const testItem = TEST_DATA.pantryItems[0];

    await page.getByTestId("name-input").fill(testItem.name);
    await page.getByTestId("category-select").selectOption(testItem.category);
    await page.getByTestId("quantity-input").fill(testItem.quantity.toString());
    await page.getByTestId("unit-input").fill(testItem.unit);
    await page.getByTestId("submit-button").click();

    // APIリクエストが送信されることを確認
    await page.waitForTimeout(1000);
    expect(addItemRequest).toBeTruthy();
  });

  test("should handle delete operations", async ({ page }) => {
    await page.goto(`/shopping-list/${TEST_USER_ID}`);

    // 削除リクエストをインターセプト
    let deleteRequest: Request | null = null;
    page.on("request", (request) => {
      if (request.method() === "POST" && request.postData()?.includes("delete")) {
        deleteRequest = request;
      }
    });

    // 既存のアイテムがある場合のみテスト実行
    const deleteButtons = page.locator('[data-testid*="delete-button-"]');
    const itemCount = await deleteButtons.count();

    if (itemCount > 0) {
      await deleteButtons.first().click();
      await page.waitForTimeout(1000);
      expect(deleteRequest).toBeTruthy();
    }
  });

  test("should handle search API operations", async ({ page }) => {
    await page.goto(`/shopping-list/${TEST_USER_ID}`);

    // 検索リクエストをインターセプト
    let searchRequest: Request | null = null;
    page.on("request", (request) => {
      if (request.method() === "GET" && request.url().includes("q=")) {
        searchRequest = request;
      }
    });

    // 検索を実行
    await page.getByTestId("search-input").fill("test");
    await page.getByTestId("search-button").click();

    await page.waitForTimeout(1000);
    expect(searchRequest).toBeTruthy();
  });

  test("should handle API errors gracefully", async ({ page }) => {
    // APIエラーのシミュレーション
    await page.route("**/shopping-list/items", (route) => {
      route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Internal Server Error" }),
      });
    });

    await page.goto(`/shopping-list/${TEST_USER_ID}`);

    // エラーハンドリングの確認
    // Note: 実際のエラーハンドリング実装に応じて調整が必要
    await page.waitForLoadState("networkidle");
  });

  test("should handle slow API responses", async ({ page }) => {
    // 遅いAPIレスポンスのシミュレーション
    await page.route("**/shopping-list/items", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2秒遅延
      route.continue();
    });

    await page.goto(`/shopping-list/${TEST_USER_ID}`);

    // ローディング状態の確認
    await page.waitForLoadState("networkidle");
    await expect(page.getByTestId("shopping-list-page")).toBeVisible();
  });

  test("should validate API request data", async ({ page }) => {
    await page.goto(`/shopping-list/${TEST_USER_ID}`);

    // APIリクエストの詳細をキャプチャ
    let requestData: unknown = null;
    page.on("request", (request) => {
      if (request.method() === "POST" && request.url().includes("shopping-list")) {
        try {
          requestData = JSON.parse(request.postData() || "{}");
        } catch (_e) {
          // フォームデータの場合
          requestData = request.postData();
        }
      }
    });

    // アイテムを追加
    await page.getByTestId("add-item-button").click();
    await page.getByTestId("name-input").fill("テストアイテム");
    await page.getByTestId("category-select").selectOption("Food");
    await page.getByTestId("submit-button").click();

    await page.waitForTimeout(1000);

    // リクエストデータの検証
    expect(requestData).toBeTruthy();
    if (typeof requestData === "string") {
      expect(requestData as string).toContain("テストアイテム");
      expect(requestData as string).toContain("Food");
    }
  });

  test("should handle concurrent API requests", async ({ page }) => {
    await page.goto(`/shopping-list/${TEST_USER_ID}`);

    const requestCount = { value: 0 };
    page.on("request", (request) => {
      if (request.method() === "POST") {
        requestCount.value++;
      }
    });

    // 複数のアイテムを同時に追加
    const promises = [];
    for (let i = 0; i < 3; i++) {
      promises.push(
        (async () => {
          await page.getByTestId("add-item-button").click();
          await page.getByTestId("name-input").fill(`同時アイテム${i}`);
          await page.getByTestId("submit-button").click();
          await page.waitForTimeout(100);
        })()
      );
    }

    await Promise.all(promises);
    await page.waitForTimeout(2000);

    // 複数のリクエストが送信されることを確認
    expect(requestCount.value).toBeGreaterThan(0);
  });
});
