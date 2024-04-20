import { Page, expect } from "@playwright/test";

interface TaskDetails {
  taskName: string;
  commentContent: string;
}

export class TaskDetailsPage{
    page: Page;

    constructor(page: Page){
        this.page = page;
    }

    addCommentAsCreatorAndVerify = async ({taskName,commentContent}: TaskDetails) =>{
        await this.page.getByTestId("tasks-pending-table").getByText(new RegExp(taskName,"i")).click();  
        await this.page.getByTestId('comments-text-field').fill(commentContent);
        await this.page.getByTestId('comments-submit-button').click();
        await expect(this.page.getByText(commentContent)).toBeVisible();
    }
}