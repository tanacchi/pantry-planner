import { expect, test } from "@playwright/test";
import { TEST_DATA, TEST_USER_ID } from "./fixtures/test-data";

test.describe("Shopping List Page", () => {
  const shoppingListUrl = `/shopping-list/${TEST_USER_ID}`;

  test.beforeEach(async ({ page }) => {
    await page.goto(shoppingListUrl);
  });

  test("should display page title and header", async ({ page }) => {
    // ページタイトルの確認
    await expect(page.getByTestId("page-title")).toHaveText("買い物リスト");

    // ヘッダーの確認
    await expect(page.getByTestId("header")).toBeVisible();
  });

  test("should display search form", async ({ page }) => {
    // 検索フォームの表示確認
    await expect(page.getByTestId("search-form")).toBeVisible();
    await expect(page.getByTestId("search-input")).toBeVisible();
    await expect(page.getByTestId("search-button")).toBeVisible();

    // プレースホルダーの確認
    await expect(page.getByTestId("search-input")).toHaveAttribute("placeholder", "商品を検索...");
  });

  test("should display add item button", async ({ page }) => {
    // 追加ボタンの表示確認
    await expect(page.getByTestId("add-item-button")).toBeVisible();
    await expect(page.getByTestId("add-item-button")).toHaveText("＋");
  });

  test("should open and close add item modal", async ({ page }) => {
    // モーダルが初期状態では表示されていないことを確認
    await expect(page.getByTestId("add-item-modal")).not.toBeVisible();

    // 追加ボタンをクリック
    await page.getByTestId("add-item-button").click();

    // モーダルが表示されることを確認
    await expect(page.getByTestId("add-item-modal")).toBeVisible();
    await expect(page.getByTestId("modal-title")).toHaveText("商品を追加");

    // 閉じるボタンでモーダルを閉じる
    await page.getByTestId("modal-close-button").click();

    // モーダルが非表示になることを確認
    await expect(page.getByTestId("add-item-modal")).not.toBeVisible();
  });

  test("should close modal with cancel button", async ({ page }) => {
    // モーダルを開く
    await page.getByTestId("add-item-button").click();
    await expect(page.getByTestId("add-item-modal")).toBeVisible();

    // キャンセルボタンでモーダルを閉じる
    await page.getByTestId("cancel-button").click();

    // モーダルが非表示になることを確認
    await expect(page.getByTestId("add-item-modal")).not.toBeVisible();
  });

  test("should add a new shopping item", async ({ page }) => {
    // モーダルを開く
    await page.getByTestId("add-item-button").click();

    // フォームに入力
    const testItem = TEST_DATA.shoppingItems[0];
    await page.getByTestId("name-input").fill(testItem.name);
    await page.getByTestId("category-select").selectOption(testItem.category);

    // 送信
    await page.getByTestId("submit-button").click();

    // モーダルが閉じることを確認
    await expect(page.getByTestId("add-item-modal")).not.toBeVisible();

    // 新しいアイテムがリストに表示されることを確認
    await expect(page.locator('[data-testid*="shopping-item-"]').last()).toBeVisible();
    await expect(page.locator('[data-testid*="item-name-"]').last()).toHaveText(testItem.name);
    await expect(page.locator('[data-testid*="item-category-"]').last()).toHaveText(
      testItem.category
    );
  });

  test("should validate required fields in add form", async ({ page }) => {
    // モーダルを開く
    await page.getByTestId("add-item-button").click();

    // 必須フィールドを空のまま送信
    await page.getByTestId("submit-button").click();

    // HTML5バリデーションでフォームが送信されないことを確認
    await expect(page.getByTestId("add-item-modal")).toBeVisible();
  });

  test("should delete shopping item", async ({ page }) => {
    // まず新しいアイテムを追加
    await page.getByTestId("add-item-button").click();
    const testItem = TEST_DATA.shoppingItems[0];
    await page.getByTestId("name-input").fill(testItem.name);
    await page.getByTestId("category-select").selectOption(testItem.category);
    await page.getByTestId("submit-button").click();

    // アイテムが追加されるまで待機
    await expect(page.locator('[data-testid*="shopping-item-"]').last()).toBeVisible();

    // 削除ボタンをクリック
    await page.locator('[data-testid*="delete-button-"]').last().click();

    // アイテムが削除されることを確認（ページがリロードされる）
    await page.waitForLoadState("networkidle");
  });

  test("should search shopping items", async ({ page }) => {
    // 検索機能のテスト
    const searchTerm = "牛乳";

    // 検索フォームに入力
    await page.getByTestId("search-input").fill(searchTerm);
    await page.getByTestId("search-button").click();

    // ページがリロードされることを確認
    await page.waitForLoadState("networkidle");

    // URLにクエリパラメータが含まれることを確認
    expect(page.url()).toContain(`q=${encodeURIComponent(searchTerm)}`);
  });

  test("should display empty state when no items", async ({ page }) => {
    // 既存のアイテムがない場合のテスト（新しいユーザーIDを使用）
    await page.goto("/shopping-list/999"); // 存在しないユーザーID

    // エンプティステートの確認
    await expect(page.getByTestId("empty-state")).toBeVisible();
    await expect(page.getByTestId("empty-message")).toHaveText("買い物リストは空です");
    await expect(page.getByTestId("empty-guide")).toHaveText("＋ボタンから商品を追加してください");
  });

  test("should display search empty state", async ({ page }) => {
    // 検索結果が空の場合のテスト
    const searchTerm = "nonexistent";

    await page.getByTestId("search-input").fill(searchTerm);
    await page.getByTestId("search-button").click();
    await page.waitForLoadState("networkidle");

    // 検索結果のエンプティステートの確認
    await expect(page.getByTestId("empty-state")).toBeVisible();
    await expect(page.getByTestId("empty-message")).toHaveText("検索結果が見つかりません");
  });

  test("should display form fields correctly in modal", async ({ page }) => {
    // モーダルを開く
    await page.getByTestId("add-item-button").click();

    // フォームフィールドの確認
    await expect(page.getByTestId("name-label")).toHaveText("商品名");
    await expect(page.getByTestId("name-input")).toHaveAttribute(
      "placeholder",
      "例: 牛乳、パン、りんご"
    );
    await expect(page.getByTestId("name-input")).toHaveAttribute("required");
    await expect(page.getByTestId("name-input")).toBeFocused();

    await expect(page.getByTestId("category-label")).toHaveText("カテゴリ");

    // カテゴリオプションの確認
    const categoryOptions = page.getByTestId("category-select").locator("option");
    await expect(categoryOptions).toHaveCount(5);
    await expect(categoryOptions.nth(0)).toHaveText("🍎 食品");
    await expect(categoryOptions.nth(1)).toHaveText("🥤 飲料");
    await expect(categoryOptions.nth(2)).toHaveText("🍪 お菓子");
    await expect(categoryOptions.nth(3)).toHaveText("🧂 調味料");
    await expect(categoryOptions.nth(4)).toHaveText("📦 その他");

    // ボタンの確認
    await expect(page.getByTestId("cancel-button")).toHaveText("キャンセル");
    await expect(page.getByTestId("submit-button")).toHaveText("追加");
  });

  test("should handle different categories correctly", async ({ page }) => {
    const categories = ["Food", "Drink", "Snack", "Spice", "Other"];

    for (const category of categories) {
      // モーダルを開く
      await page.getByTestId("add-item-button").click();

      // フォームに入力
      await page.getByTestId("name-input").fill(`Test ${category} Item`);
      await page.getByTestId("category-select").selectOption(category);

      // 送信
      await page.getByTestId("submit-button").click();

      // モーダルが閉じることを確認
      await expect(page.getByTestId("add-item-modal")).not.toBeVisible();

      // 新しいアイテムがリストに表示されることを確認
      await expect(page.locator('[data-testid*="shopping-item-"]').last()).toBeVisible();
      await expect(page.locator('[data-testid*="item-category-"]').last()).toHaveText(category);
    }
  });
});
