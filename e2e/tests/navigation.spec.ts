import { expect, test } from "@playwright/test";
import {
  TEST_PANTRY_ID,
  TEST_USER_ID,
  UNKNOWN_PANTRY_ID,
  UNKNOWN_USER_ID,
} from "./fixtures/test-data";

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

  test("should show an empty shopping list for an unknown user", async ({ page }) => {
    // 存在しないユーザーIDでアクセス。買い物リストの loader はユーザーの存在を
    // 検証しないため、空の一覧が 200 で返る。
    const response = await page.goto(`/shopping-list/${UNKNOWN_USER_ID}`);

    expect(response?.status()).toBe(200);
    await expect(page.getByTestId("shopping-list-page")).toBeVisible();
    await expect(page.getByTestId("empty-state")).toBeVisible();
    await expect(page.locator('[data-testid*="shopping-item-"]')).toHaveCount(0);
  });

  test("should handle invalid pantry ID gracefully", async ({ page }) => {
    // 存在しないパントリーIDでアクセス。dashboard の loader は pantry の存在を
    // 検証し、見つからなければエラーを throw する。
    // Note: root.tsx の Layout が children を描画しないバグ（#31）により、
    // エラー時の画面内容までは検証できないため、HTTP ステータスと
    // dashboard-page が描画されないことのみを確認する。
    const response = await page.goto(`/dashboard/${TEST_USER_ID}/${UNKNOWN_PANTRY_ID}`);

    expect(response?.status()).toBeGreaterThanOrEqual(400);
    await expect(page.getByTestId("dashboard-page")).toHaveCount(0);
  });

  test("should serve the root path without redirecting", async ({ page }) => {
    // ルートパス（Remix のデフォルト Welcome ページ）はリダイレクトしない。
    const response = await page.goto("/");

    expect(response?.status()).toBe(200);
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Welcome to");
  });
});
