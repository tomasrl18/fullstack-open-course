import { test, expect } from "@playwright/test";

import { loginWith, logOut, createBlog } from "./helper";

test.describe("Blog app", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Tomas",
        username: "tomasrl",
        password: "123456789",
      },
    });
    await request.post("/api/users", {
      data: {
        name: "Super Saiyan",
        username: "root",
        password: "123456789",
      },
    });

    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByTestId("username")).toBeVisible();
    await expect(page.getByTestId("password")).toBeVisible();
  });

  test("login fails with wrong password", async ({ page }) => {
    await loginWith(page, "tomasrl", "wrong");

    await expect(page.getByText("wrong credentials")).toBeVisible();
  });

  test("user can log in", async ({ page }) => {
    await loginWith(page, "tomasrl", "123456789");

    await expect(page.getByText("Tomas logged-in")).toBeVisible();
  });

  test.describe("When logged in", () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, "tomasrl", "123456789");
    });

    test("A new blog can be created", async ({ page }) => {
      await createBlog(
        page,
        "A blog created by playwright",
        "Some author",
        "some-url",
        true,
      );
      await expect(
        page.getByText("Título: A blog created by playwright"),
      ).toBeVisible();
    });

    test.describe("And several blogs exists", () => {
      test.beforeEach(async ({ page }) => {
        await createBlog(
          page,
          "First blog title",
          "first blog author",
          "first blog url",
          true,
        );
        await createBlog(
          page,
          "Second blog title",
          "Second blog author",
          "Second blog url",
          true,
        );
        await createBlog(
          page,
          "Third blog title",
          "Third blog author",
          "Third blog url",
          true,
        );
      });

      test("A blog can be liked", async ({ page }) => {
        await page
          .locator("li")
          .filter({ hasText: "Título: Second blog title" })
          .getByRole("button")
          .click();
        await page.getByText("Likes: 0").click();
        await page.getByRole("button", { name: "Like" }).click();
        await page.getByText("Likes: 1").click();
      });

      test("Blogs are ordered according to likes", async ({ page }) => {
        await page
          .locator("li")
          .filter({ hasText: "Título: Second blog title" })
          .getByRole("button")
          .click();
        await page.getByRole("button", { name: "Like" }).click();
        await page.getByRole("button", { name: "Like" }).click();
        await page.getByRole("button", { name: "Hide" }).click();

        await page
          .locator("li")
          .filter({ hasText: "Título: Third blog title" })
          .getByRole("button")
          .click();
        await page.getByRole("button", { name: "Like" }).click();
        await page.getByRole("button", { name: "Hide" }).click();

        await page
          .locator("li")
          .filter({ hasText: "Título: First blog title" })
          .getByRole("button")
          .click();

        const blogTitles = await page.locator("li").allInnerTexts();
        expect(blogTitles[0]).toContain("Título: Second blog title");
        expect(blogTitles[1]).toContain("Título: Third blog title");
        expect(blogTitles[2]).toContain("Título: First blog title");
      });

      test.describe("When blog can be deleted", () => {
        test("A blog can be deleted", async ({ page }) => {
          await page.goto("/");

          await page
            .locator("li")
            .filter({ hasText: "Título: Third blog titleView" })
            .getByRole("button")
            .click();

          page.once("dialog", (dialog) => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => {});
          });

          await page.getByRole("button", { name: "Delete" }).click();

          await expect(
            page
              .locator("li")
              .filter({ hasText: "Título: Third blog titleView" }),
          ).toHaveCount(0);
        });

        test("A blog cant be deleted by another user", async ({ page }) => {
          await logOut(page);

          await loginWith(page, "root", "123456789");
          await expect(page.getByText("Super saiyan logged-in")).toBeVisible();

          await page.goto("/");

          await page
            .locator("li")
            .filter({ hasText: "Título: First blog title" })
            .getByRole("button")
            .click();

          const deleteButton = page.getByRole("button", { name: "Delete" });
          await expect(deleteButton).not.toBeVisible();
        });
      });
    });
  });
});
