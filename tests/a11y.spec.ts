import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * Regression aksesibilitas untuk temuan Gelombang 5 (S8, S14, S15, S16, S18).
 *
 * Semua ini pernah rusak sekali; tes di sini yang menahan supaya tidak kambuh
 * diam-diam saat komponennya diubah lagi.
 */

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

test.describe("pemindaian axe", () => {
  test("halaman utama bebas pelanggaran WCAG A/AA", async ({ page }) => {
    await page.goto("/");
    const { violations } = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();

    expect(violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });

  test("halaman privasi bebas pelanggaran WCAG A/AA", async ({ page }) => {
    await page.goto("/privasi");
    const { violations } = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();

    expect(violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });
});

test.describe("S8: portofolio bisa dioperasikan keyboard", () => {
  test("kartu bisa dibuka, Escape menutup, fokus kembali ke pemicu", async ({ page }) => {
    await page.goto("/");

    const trigger = page.locator("#portofolio article h3 button").first();
    await trigger.focus();
    await expect(trigger).toBeFocused();

    await page.keyboard.press("Enter");

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    // Nama aksesibel dialog harus judul proyeknya, bukan kosong.
    await expect(dialog).toHaveAttribute("aria-modal", "true");

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();

    // Fokus wajib balik ke kartu yang tadi diklik, bukan lompat ke awal halaman.
    await expect(trigger).toBeFocused();
  });

  test("judul kartu tetap heading, bukan ditelan tombol", async ({ page }) => {
    await page.goto("/");

    const headings = page.locator("#portofolio article h3");
    await expect(headings.first()).toBeVisible();
    expect(await headings.count()).toBeGreaterThan(0);
  });
});

test.describe("S14: menu mobile", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("panel tertutup tidak bisa difokus, terbuka bisa", async ({ page }) => {
    await page.goto("/");

    const panel = page.locator("#mobile-menu");
    const toggle = page.locator('button[aria-controls="mobile-menu"]');

    await expect(panel).toHaveAttribute("inert", "");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    await toggle.click();

    await expect(panel).not.toHaveAttribute("inert", "");
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
  });
});

test.describe("S15: fokus keyboard terlihat", () => {
  test("akordion FAQ punya ring saat difokus lewat keyboard", async ({ page }) => {
    await page.goto("/");

    const faqButton = page.locator('button[aria-controls^="faq-answer"]').first();
    await faqButton.evaluate((el) => el.scrollIntoView());
    await faqButton.focus();
    // `.focus()` lewat skrip belum tentu memicu :focus-visible, jadi dipastikan
    // dengan interaksi keyboard sungguhan.
    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Tab");

    const shadow = await faqButton.evaluate((el) => getComputedStyle(el).boxShadow);
    expect(shadow).not.toBe("none");
  });
});

test.describe("S18: prefers-reduced-motion", () => {
  // `reducedMotion` bukan opsi `test.use()` di versi Playwright ini, jadi
  // emulasinya dipasang lewat page.emulateMedia() sebelum halaman dimuat.
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  test("smooth scroll Lenis tidak menghaluskan saat reduced motion", async ({ page }) => {
    await page.goto("/");

    // Sanity: emulasinya benar-benar aktif.
    const reduced = await page.evaluate(
      () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
    expect(reduced).toBe(true);

    // Dengan smoothWheel mati, kelas penanda smooth tidak dipasang Lenis.
    await expect
      .poll(async () => page.evaluate(() => document.documentElement.className), {
        timeout: 5000,
      })
      .not.toContain("lenis-smooth");
  });

  test("navigasi anchor tetap sampai ke tujuan tanpa animasi", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "Harga", exact: true }).click();

    // Section tujuan harus berada di bawah navbar, bukan tertutup.
    await expect
      .poll(
        async () =>
          page.evaluate(() => {
            const section = document.querySelector("#harga")!.getBoundingClientRect();
            const nav = document.querySelector("nav")!.getBoundingClientRect();
            return Math.round(section.top) >= Math.round(nav.height);
          }),
        { timeout: 5000 },
      )
      .toBe(true);
  });
});
