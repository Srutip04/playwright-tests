import { test } from "../fixtures";
import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import LoginPage from "../poms/login";
import { TaskDetailsPage } from "../poms/taskDetails";

test.describe("Task Details Page", async () =>{
  let taskName: string;
  let commentContent: string;

  test.beforeEach(() => {
    taskName = faker.word.words({ count: 5 });
    commentContent = faker.word.words({count: 10});
  });

  test("Add a new comment as a creator", async({page,taskDetailsPage,taskPage,browser}) =>{
    await page.goto("/");
    await taskPage.createTaskAndVerify({taskName,userName: "Shruti"});
    await taskDetailsPage.addCommentAsCreatorAndVerify({taskName,commentContent});
    
    await page.goto("/");
    await taskPage.checkCommentCount({taskName});

    const newUserContext = await browser.newContext({
        storageState: { cookies: [], origins: [] },
      });
      const newUserPage = await newUserContext.newPage();
      const loginPage = new LoginPage(newUserPage);

      await newUserPage.goto("/");
      await loginPage.loginAndVerifyUser({
        email: "s@example.com",
        password: "welcome",
        username: "Shruti",
      });
      await newUserPage.getByTestId("tasks-pending-table").getByText(new RegExp(taskName, "i")).click();  
      await expect(newUserPage.getByText(commentContent)).toBeVisible();
      
      await newUserPage.goto("/");
      await taskPage.checkCommentCount({taskName});

      await newUserPage.close();
      await newUserContext.close();

  })


})