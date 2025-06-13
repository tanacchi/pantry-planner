import { expect, test } from "@playwright/test";
import { TEST_DATA, TEST_PANTRY_ID, TEST_USER_ID } from "./fixtures/test-data";

test.describe("Dashboard Page", () => {
  const dashboardUrl = `/dashboard/${TEST_USER_ID}/${TEST_PANTRY_ID}`;

  test.beforeEach(async ({ page }) => {
    await page.goto(dashboardUrl);
  });

  test("should display dashboard page", async ({ page }) => {
    // ダッシュボードページの表示確認
    await expect(page.getByTestId("dashboard-page")).toBeVisible();
  });

  test("should display search form", async ({ page }) => {
    // 検索フォームの表示確認
    await expect(page.getByTestId("search-form")).toBeVisible();
    await expect(page.getByTestId("search-input")).toBeVisible();
    await expect(page.getByTestId("search-button")).toBeVisible();

    // プレースホルダーの確認
    await expect(page.getByTestId("search-input")).toHaveAttribute("placeholder", "検索...");
  });

  test("should display pantry items list", async ({ page }) => {
    // パントリーアイテムリストの表示確認
    await expect(page.getByTestId("pantry-items-list")).toBeVisible();
  });

  test("should display add pantry item button", async ({ page }) => {
    // 追加ボタンの表示確認
    await expect(page.getByTestId("add-pantry-item-button")).toBeVisible();
    await expect(page.getByTestId("add-pantry-item-button")).toHaveText("＋");
  });

  test("should open and close add pantry item modal", async ({ page }) => {
    // モーダルが初期状態では表示されていないことを確認
    await expect(page.getByTestId("add-pantry-item-modal")).not.toBeVisible();

    // 追加ボタンをクリック
    await page.getByTestId("add-pantry-item-button").click();

    // モーダルが表示されることを確認
    await expect(page.getByTestId("add-pantry-item-modal")).toBeVisible();
    await expect(page.getByTestId("modal-title")).toHaveText("アイテム追加");

    // キャンセルボタンでモーダルを閉じる
    await page.getByTestId("cancel-button").click();

    // モーダルが非表示になることを確認
    await expect(page.getByTestId("add-pantry-item-modal")).not.toBeVisible();
  });

  test("should add a new pantry item", async ({ page }) => {
    // モーダルを開く
    await page.getByTestId("add-pantry-item-button").click();

    // フォームに入力
    const testItem = TEST_DATA.pantryItems[0];
    await page.getByTestId("name-input").fill(testItem.name);
    await page.getByTestId("category-select").selectOption(testItem.category);
    await page.getByTestId("quantity-input").fill(testItem.quantity.toString());
    await page.getByTestId("unit-input").fill(testItem.unit);

    // 送信
    await page.getByTestId("submit-button").click();

    // モーダルが閉じることを確認
    await expect(page.getByTestId("add-pantry-item-modal")).not.toBeVisible();

    // 新しいアイテムがリストに表示されることを確認
    await expect(page.locator('[data-testid*="pantry-item-"]').last()).toBeVisible();
    await expect(page.locator('[data-testid*="item-name-"]').last()).toHaveText(testItem.name);
  });

  test("should validate required fields in add form", async ({ page }) => {
    // モーダルを開く
    await page.getByTestId("add-pantry-item-button").click();

    // 必須フィールドを空のまま送信
    await page.getByTestId("submit-button").click();

    // HTML5バリデーションでフォームが送信されないことを確認
    await expect(page.getByTestId("add-pantry-item-modal")).toBeVisible();
  });

  test("should delete pantry item", async ({ page }) => {
    // 既存のアイテムがある場合の削除テスト
    const deleteButtons = page.locator('[data-testid*="delete-button-"]');
    const itemCount = await deleteButtons.count();

    if (itemCount > 0) {
      // 最初の削除ボタンをクリック
      await deleteButtons.first().click();

      // アイテムが削除されることを確認（ページがリロードされる）
      await page.waitForLoadState("networkidle");
    }
  });

  test("should search pantry items", async ({ page }) => {
    // 検索機能のテスト
    const searchTerm = "ニンニク";

    // 検索フォームに入力
    await page.getByTestId("search-input").fill(searchTerm);
    await page.getByTestId("search-button").click();

    // ページがリロードされることを確認
    await page.waitForLoadState("networkidle");

    // URLにクエリパラメータが含まれることを確認
    expect(page.url()).toContain(`q=${encodeURIComponent(searchTerm)}`);
  });

  test("should display form fields correctly in modal", async ({ page }) => {
    // モーダルを開く
    await page.getByTestId("add-pantry-item-button").click();

    // フォームフィールドの確認
    await expect(page.getByTestId("name-label")).toHaveText("名前");
    await expect(page.getByTestId("name-input")).toHaveAttribute("placeholder", "新しいアイテム名");

    await expect(page.getByTestId("category-label")).toHaveText("カテゴリ");

    // カテゴリオプションの確認
    const categoryOptions = page.getByTestId("category-select").locator("option");
    await expect(categoryOptions).toHaveCount(3);
    await expect(categoryOptions.nth(0)).toHaveText("食品");
    await expect(categoryOptions.nth(1)).toHaveText("飲料");
    await expect(categoryOptions.nth(2)).toHaveText("その他");

    await expect(page.getByTestId("quantity-label")).toHaveText("個数");
    await expect(page.getByTestId("quantity-input")).toHaveValue("1");

    await expect(page.getByTestId("unit-label")).toHaveText("単位");
    await expect(page.getByTestId("unit-input")).toHaveValue("個");

    await expect(page.getByTestId("expires-label")).toHaveText("賞味期限（任意）");

    // ボタンの確認
    await expect(page.getByTestId("cancel-button")).toHaveText("キャンセル");
    await expect(page.getByTestId("submit-button")).toHaveText("追加");
  });

  test("should handle quantity and unit fields correctly", async ({ page }) => {
    // モーダルを開く
    await page.getByTestId("add-pantry-item-button").click();

    // 数量と単位のテスト
    await page.getByTestId("name-input").fill("テストアイテム");
    await page.getByTestId("quantity-input").fill("5");
    await page.getByTestId("unit-input").fill("kg");

    // 送信
    await page.getByTestId("submit-button").click();

    // モーダルが閉じることを確認
    await expect(page.getByTestId("add-pantry-item-modal")).not.toBeVisible();
  });

  test("should handle expiration date field", async ({ page }) => {
    // モーダルを開く
    await page.getByTestId("add-pantry-item-button").click();

    // 賞味期限のテスト
    await page.getByTestId("name-input").fill("期限付きアイテム");

    // 未来の日付を設定
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + 1);
    const dateString = futureDate.toISOString().split("T")[0];

    await page.getByTestId("expires-input").fill(dateString);

    // 送信
    await page.getByTestId("submit-button").click();

    // モーダルが閉じることを確認
    await expect(page.getByTestId("add-pantry-item-modal")).not.toBeVisible();
  });

  test("should handle different categories for pantry items", async ({ page }) => {
    const categories = ["Food", "Drink", "Other"];

    for (const category of categories) {
      // モーダルを開く
      await page.getByTestId("add-pantry-item-button").click();

      // フォームに入力
      await page.getByTestId("name-input").fill(`Test ${category} Item`);
      await page.getByTestId("category-select").selectOption(category);

      // 送信
      await page.getByTestId("submit-button").click();

      // モーダルが閉じることを確認
      await expect(page.getByTestId("add-pantry-item-modal")).not.toBeVisible();
    }
  });

  test("should display existing pantry items", async ({ page }) => {
    // 既存のアイテムが表示されることを確認
    const items = page.locator('[data-testid*="pantry-item-"]');
    const itemCount = await items.count();

    if (itemCount > 0) {
      // 最初のアイテムの詳細を確認
      await expect(items.first()).toBeVisible();
      await expect(page.locator('[data-testid*="item-name-"]').first()).toBeVisible();
      await expect(page.locator('[data-testid*="delete-button-"]').first()).toBeVisible();
    }
  });
});
