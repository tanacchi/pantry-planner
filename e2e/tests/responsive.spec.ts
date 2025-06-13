import { expect, test } from "@playwright/test";
import { TEST_PANTRY_ID, TEST_USER_ID } from "./fixtures/test-data";

test.describe("Responsive Design", () => {
  const viewports = [
    { name: "iPhone SE", width: 375, height: 667 },
    { name: "iPhone 12", width: 390, height: 844 },
    { name: "Pixel 5", width: 393, height: 851 },
    { name: "Galaxy S21", width: 384, height: 854 },
  ];

  for (const viewport of viewports) {
    test.describe(`${viewport.name} (${viewport.width}x${viewport.height})`, () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
      });

      test("should display shopping list page correctly", async ({ page }) => {
        await page.goto(`/shopping-list/${TEST_USER_ID}`);

        // ページ全体が表示されることを確認
        await expect(page.getByTestId("shopping-list-page")).toBeVisible();

        // ヘッダーが適切に表示されることを確認
        await expect(page.getByTestId("header")).toBeVisible();
        await expect(page.getByTestId("page-title")).toBeVisible();

        // 検索フォームが適切に表示されることを確認
        await expect(page.getByTestId("search-form")).toBeVisible();
        await expect(page.getByTestId("search-input")).toBeVisible();
        await expect(page.getByTestId("search-button")).toBeVisible();

        // フローティングボタンが表示されることを確認
        await expect(page.getByTestId("add-item-button")).toBeVisible();
      });

      test("should display dashboard page correctly", async ({ page }) => {
        await page.goto(`/dashboard/${TEST_USER_ID}/${TEST_PANTRY_ID}`);

        // ページ全体が表示されることを確認
        await expect(page.getByTestId("dashboard-page")).toBeVisible();

        // 検索フォームが適切に表示されることを確認
        await expect(page.getByTestId("search-form")).toBeVisible();

        // アイテムリストが表示されることを確認
        await expect(page.getByTestId("pantry-items-list")).toBeVisible();

        // フローティングボタンが表示されることを確認
        await expect(page.getByTestId("add-pantry-item-button")).toBeVisible();
      });

      test("should handle modal display correctly", async ({ page }) => {
        await page.goto(`/shopping-list/${TEST_USER_ID}`);

        // モーダルを開く
        await page.getByTestId("add-item-button").click();

        // モーダルがビューポートに適切に表示されることを確認
        await expect(page.getByTestId("add-item-modal")).toBeVisible();
        await expect(page.getByTestId("modal-content")).toBeVisible();

        // モーダルのコンテンツが適切に表示されることを確認
        await expect(page.getByTestId("modal-title")).toBeVisible();
        await expect(page.getByTestId("add-item-form")).toBeVisible();

        // フォームフィールドが適切に表示されることを確認
        await expect(page.getByTestId("name-input")).toBeVisible();
        await expect(page.getByTestId("category-select")).toBeVisible();

        // ボタンが適切に表示されることを確認
        await expect(page.getByTestId("cancel-button")).toBeVisible();
        await expect(page.getByTestId("submit-button")).toBeVisible();

        // モーダルを閉じる
        await page.getByTestId("modal-close-button").click();
        await expect(page.getByTestId("add-item-modal")).not.toBeVisible();
      });

      test("should handle touch interactions", async ({ page }) => {
        await page.goto(`/shopping-list/${TEST_USER_ID}`);

        // タッチでボタンをタップ
        await page.getByTestId("add-item-button").tap();
        await expect(page.getByTestId("add-item-modal")).toBeVisible();

        // タッチでモーダルを閉じる
        await page.getByTestId("cancel-button").tap();
        await expect(page.getByTestId("add-item-modal")).not.toBeVisible();
      });

      test("should handle form input on mobile", async ({ page }) => {
        await page.goto(`/shopping-list/${TEST_USER_ID}`);

        // モーダルを開く
        await page.getByTestId("add-item-button").click();

        // フォーカスがname-inputに当たることを確認
        await expect(page.getByTestId("name-input")).toBeFocused();

        // モバイルでの入力をテスト
        await page.getByTestId("name-input").fill("モバイルテストアイテム");
        await expect(page.getByTestId("name-input")).toHaveValue("モバイルテストアイテム");

        // セレクトボックスの操作をテスト
        await page.getByTestId("category-select").selectOption("Food");
      });

      test("should handle scrolling correctly", async ({ page }) => {
        await page.goto(`/shopping-list/${TEST_USER_ID}`);

        // ページをスクロール
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

        // フローティングボタンが表示されたままであることを確認
        await expect(page.getByTestId("add-item-button")).toBeVisible();

        // ページトップにスクロール
        await page.evaluate(() => window.scrollTo(0, 0));

        // ヘッダーが表示されることを確認
        await expect(page.getByTestId("header")).toBeVisible();
      });

      test("should handle long item names correctly", async ({ page }) => {
        await page.goto(`/shopping-list/${TEST_USER_ID}`);

        // 長い名前のアイテムを追加
        await page.getByTestId("add-item-button").click();
        const longName = "とても長いアイテム名のテストです".repeat(5);
        await page.getByTestId("name-input").fill(longName);
        await page.getByTestId("submit-button").click();

        // モーダルが閉じることを確認
        await expect(page.getByTestId("add-item-modal")).not.toBeVisible();

        // 長い名前が適切に表示されることを確認（切り詰めなど）
        await expect(page.locator('[data-testid*="shopping-item-"]').last()).toBeVisible();
      });

      test("should handle orientation changes", async ({ page, browserName }) => {
        // Webkitのみでテスト（Safari/Mobile Safari）
        test.skip(browserName !== "webkit", "Orientation test only for webkit");

        await page.goto(`/shopping-list/${TEST_USER_ID}`);

        // 縦向きで表示確認
        await expect(page.getByTestId("shopping-list-page")).toBeVisible();

        // 横向きに変更
        await page.setViewportSize({ width: viewport.height, height: viewport.width });

        // 横向きでも適切に表示されることを確認
        await expect(page.getByTestId("shopping-list-page")).toBeVisible();
        await expect(page.getByTestId("add-item-button")).toBeVisible();
      });

      test("should handle safe area (notch) correctly", async ({ page }) => {
        await page.goto(`/shopping-list/${TEST_USER_ID}`);

        // セーフエリアの設定（iPhone X以降のnotch対応）
        await page.addStyleTag({
          content: `
            :root {
              --safe-area-inset-top: 44px;
              --safe-area-inset-bottom: 34px;
            }
          `,
        });

        // コンテンツが適切に表示されることを確認
        await expect(page.getByTestId("header")).toBeVisible();
        await expect(page.getByTestId("add-item-button")).toBeVisible();
      });
    });
  }

  test("should handle very small screens", async ({ page }) => {
    // 非常に小さい画面サイズでのテスト
    await page.setViewportSize({ width: 320, height: 568 }); // iPhone 5/SE

    await page.goto(`/shopping-list/${TEST_USER_ID}`);

    // 基本要素が表示されることを確認
    await expect(page.getByTestId("shopping-list-page")).toBeVisible();
    await expect(page.getByTestId("header")).toBeVisible();
    await expect(page.getByTestId("search-form")).toBeVisible();
    await expect(page.getByTestId("add-item-button")).toBeVisible();

    // モーダルテスト
    await page.getByTestId("add-item-button").click();
    await expect(page.getByTestId("add-item-modal")).toBeVisible();

    // フォームが使用可能であることを確認
    await expect(page.getByTestId("name-input")).toBeVisible();
    await expect(page.getByTestId("category-select")).toBeVisible();
  });

  test("should handle large screens gracefully", async ({ page }) => {
    // 大きい画面サイズでのテスト（念のため）
    await page.setViewportSize({ width: 1920, height: 1080 });

    await page.goto(`/shopping-list/${TEST_USER_ID}`);

    // コンテンツが適切に配置されることを確認
    await expect(page.getByTestId("shopping-list-page")).toBeVisible();

    // モバイルファーストデザインが大画面でも適切に動作することを確認
    await expect(page.getByTestId("add-item-button")).toBeVisible();
  });
});
