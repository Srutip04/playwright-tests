import { test } from "../fixtures";
import { faker } from "@faker-js/faker";

test.describe("Tasks page" ,() =>{
    let taskName: string;

    test.beforeEach(() =>{
        taskName = faker.word.words({count: 5});
    })

    test("should create a new task with creator as the assignee",async ({loginPage,page,taskPage}) =>{
        await page.goto("http://localhost:3000");
        await loginPage.loginAndVerifyUser({
            email: "oliver@example.com",
            password: "welcome",
            username: "Oliver",
        })

        await taskPage.createTaskAndVerify({taskName});
    })
})