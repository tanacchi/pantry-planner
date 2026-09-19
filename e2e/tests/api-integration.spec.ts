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
    // フォームの送信先は現在のページ（/dashboard/:userId/:pantryId）なので
    // "items" ではなく実際の送信先パスで判定する
    let addItemRequest: Request | null = null;
    page.on("request", (request) => {
      if (
        request.method() === "POST" &&
        request.url().includes(`/dashboard/${TEST_USER_ID}/${TEST_PANTRY_ID}`)
      ) {
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

    // seed-e2e.ts が必ず商品を用意するため、無条件にアサートする
    const deleteButtons = page.locator('[data-testid*="delete-button-"]');
    await expect(deleteButtons.first()).toBeVisible();
    await deleteButtons.first().click();
    await page.waitForTimeout(1000);
    expect(deleteRequest).toBeTruthy();
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

  test("should reject invalid shopping list actions", async ({ request }) => {
    // 買い物リストの loader は Remix サーバ側（Node）で API を fetch するため、
    // ブラウザの page.route ではその通信を横取りできない。action のバリデーション
    // は request フィクスチャで直接叩いて検証する。
    const unknownIntent = await request.post(`/shopping-list/${TEST_USER_ID}`, {
      form: { intent: "bogus" },
    });
    expect(unknownIntent.status()).toBe(400);

    const missingName = await request.post(`/shopping-list/${TEST_USER_ID}`, {
      form: { intent: "add" },
    });
    expect(missingName.status()).toBe(400);
  });

  test("should handle slow page loads", async ({ page }) => {
    // 買い物リストページ自体のドキュメントリクエストを遅延させる
    // （"**/shopping-list/items" は loader 内部の fetch なのでブラウザから見えない）
    await page.route(`**/shopping-list/${TEST_USER_ID}`, async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2秒遅延
      await route.continue();
    });

    await page.goto(`/shopping-list/${TEST_USER_ID}`);

    await expect(page.getByTestId("shopping-list-page")).toBeVisible();
  });

  test("should validate API request data", async ({ page }) => {
    await page.goto(`/shopping-list/${TEST_USER_ID}`);

    // APIリクエストの詳細をキャプチャ
    // フォーム送信は application/x-www-form-urlencoded で、日本語はパーセントエンコードされる
    // (例: "name=%E3%83%86...") ため、生の postData をそのまま文字列比較すると必ず不一致になる。
    // URLSearchParams でデコードしてからフィールド単位で検証する。
    let requestData: Record<string, string> | null = null;
    page.on("request", (request) => {
      if (request.method() === "POST" && request.url().includes("shopping-list")) {
        const postData = request.postData();
        if (!postData) return;
        try {
          requestData = JSON.parse(postData);
        } catch {
          requestData = Object.fromEntries(new URLSearchParams(postData));
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
    expect(requestData).toMatchObject({ name: "テストアイテム", category: "Food" });
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
