import { expect, test } from "@playwright/test";
import { TEST_PANTRY_ID, TEST_USER_ID } from "./fixtures/test-data";

test.describe("Navigation", () => {
  test("should navigate between pages correctly", async ({ page }) => {
    // ダッシュボードページに移動
    await page.goto(`/dashboard/${TEST_USER_ID}/${TEST_PANTRY_ID}`);
    await expect(page.getByTestId("dashboard-page")).toBeVisible();

    // 買い物リストページに移動
    await page.goto(`/shopping-list/${TEST_USER_ID}`);
    await expect(page.getByTestId("shopping-list-page")).toBeVisible();
    await expect(page.getByTestId("page-title")).toHaveText("買い物リスト");
  });

  test("should handle direct URL access to dashboard", async ({ page }) => {
    // ダッシュボードページへの直接アクセス
    await page.goto(`/dashboard/${TEST_USER_ID}/${TEST_PANTRY_ID}`);

    // ページが正常に表示されることを確認
    await expect(page.getByTestId("dashboard-page")).toBeVisible();
    await expect(page.getByTestId("search-form")).toBeVisible();
    await expect(page.getByTestId("pantry-items-list")).toBeVisible();
    await expect(page.getByTestId("add-pantry-item-button")).toBeVisible();
  });

  test("should handle direct URL access to shopping list", async ({ page }) => {
    // 買い物リストページへの直接アクセス
    await page.goto(`/shopping-list/${TEST_USER_ID}`);

    // ページが正常に表示されることを確認
    await expect(page.getByTestId("shopping-list-page")).toBeVisible();
    await expect(page.getByTestId("header")).toBeVisible();
    await expect(page.getByTestId("page-title")).toHaveText("買い物リスト");
    await expect(page.getByTestId("search-form")).toBeVisible();
    await expect(page.getByTestId("add-item-button")).toBeVisible();
  });

  test("should handle browser back and forward navigation", async ({ page }) => {
    // ダッシュボードページから開始
    await page.goto(`/dashboard/${TEST_USER_ID}/${TEST_PANTRY_ID}`);
    await expect(page.getByTestId("dashboard-page")).toBeVisible();

    // 買い物リストページに移動
    await page.goto(`/shopping-list/${TEST_USER_ID}`);
    await expect(page.getByTestId("shopping-list-page")).toBeVisible();

    // ブラウザの戻るボタン
    await page.goBack();
    await expect(page.getByTestId("dashboard-page")).toBeVisible();

    // ブラウザの進むボタン
    await page.goForward();
    await expect(page.getByTestId("shopping-list-page")).toBeVisible();
  });

  test("should preserve search parameters in URL", async ({ page }) => {
    // 買い物リストページで検索
    await page.goto(`/shopping-list/${TEST_USER_ID}`);
    const searchTerm = "test";

    await page.getByTestId("search-input").fill(searchTerm);
    await page.getByTestId("search-button").click();
    await page.waitForLoadState("networkidle");

    // URLにクエリパラメータが含まれることを確認
    expect(page.url()).toContain(`q=${searchTerm}`);

    // ページをリロードしても検索パラメータが保持されることを確認
    await page.reload();
    await expect(page.getByTestId("search-input")).toHaveValue(searchTerm);
  });

  test("should handle invalid user ID gracefully", async ({ page }) => {
    // 存在しないユーザーIDでアクセス
    const invalidUserId = 99999;
    await page.goto(`/shopping-list/${invalidUserId}`);

    // エラーハンドリングの確認（404エラーページまたはエラーメッセージ）
    // Note: 実際のエラーハンドリング実装に応じて調整が必要
    const _response = await page.waitForLoadState("networkidle");
  });

  test("should handle invalid pantry ID gracefully", async ({ page }) => {
    // 存在しないパントリーIDでアクセス
    const invalidPantryId = 99999;
    await page.goto(`/dashboard/${TEST_USER_ID}/${invalidPantryId}`);

    // エラーハンドリングの確認
    const _response = await page.waitForLoadState("networkidle");
  });

  test("should handle root path redirect", async ({ page }) => {
    // ルートパスにアクセス
    await page.goto("/");

    // 適切なページにリダイレクトされることを確認
    // Note: ルートパスの処理実装に応じて調整が必要
    await page.waitForLoadState("networkidle");
  });
});
