import { test } from "../fixtures";
import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("Task Details Page", async () =>{
  let taskName: string;
  let commentContent: string;

  test.beforeEach(() => {
    taskName = faker.word.words({ count: 5 });
    commentContent = faker.word.words({count: 10});
  });

  test("should create a comment", async({page,taskDetailsPage,taskPage,loginPage}) =>{
    await page.goto("/");
    await taskPage.createTaskAndVerify({taskName});
    await taskDetailsPage.addCommentAsCreatorAndVerify({taskName,commentContent});
  })
})