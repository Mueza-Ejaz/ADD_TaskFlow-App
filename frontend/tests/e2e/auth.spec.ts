import { test, expect } from "@playwright/test";

test.describe("Authentication Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the base URL before each test
    await page.goto("/");
  });

  test("should allow a user to sign up, log in, and access the dashboard", async ({ page }) => {
    // Navigate to signup page
    await page.goto("/signup");
    await expect(page).toHaveURL("/signup");

    // Fill out the signup form
    const randomEmail = `test${Date.now()}@example.com`;
    await page.fill('input[type="email"]', randomEmail);
    await page.fill('input[type="password"]', "password123");
    await page.click('button[type="submit"]');

    // Expect to be redirected to the dashboard after successful signup and auto-login
    await expect(page).toHaveURL("/dashboard");
    await expect(page.getByText(`Welcome to your Dashboard, ${randomEmail}!`)).toBeVisible();

    // Log out
    await page.click("text=Log Out");
    await expect(page).toHaveURL("/login");

    // Navigate to login page
    await page.goto("/login");
    await expect(page).toHaveURL("/login");

    // Fill out the login form
    await page.fill('input[type="email"]', randomEmail);
    await page.fill('input[type="password"]', "password123");
    await page.click('button[type="submit"]');

    // Expect to be redirected to the dashboard after successful login
    await expect(page).toHaveURL("/dashboard");
    await expect(page.getByText(`Welcome to your Dashboard, ${randomEmail}!`)).toBeVisible();
  });

  test("should not allow access to dashboard without authentication", async ({ page }) => {
    await page.goto("/dashboard");
    // Expect to be redirected to the login page
    await expect(page).toHaveURL("/login");
  });

  test("should display error for invalid login credentials", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "invalid@example.com");
    await page.fill('input[type="password"]', "wrongpassword");
    await page.click('button[type="submit"]');

    await expect(page.getByText("Incorrect email or password")).toBeVisible();
    await expect(page).toHaveURL("/login");
  });
});
