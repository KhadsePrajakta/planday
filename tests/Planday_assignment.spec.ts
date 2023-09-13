import { test, expect } from '@playwright/test'


    test('planday', async ({ page }) => {
        await page.goto('https://qa-challenge-a.planday.com');
      
        await page.click('#cookie-consent-button');

        // Login into portal

        await page.getByPlaceholder('E.g. adam@planday.com').fill('prajaktafirke95@gmail.com')
        await page.locator('input[name="Password"]').fill('Asdfghjkl@1');
        await page.getByRole('button', { name: 'Log in' }).click();
        await page.waitForTimeout(2000);
        await page.reload();
        await page.waitForTimeout(2000);

        // Verify the name on the Home page
        await expect(page.getByText('Hi Prajakta')).toBeVisible();

        // Navigate to schedule page

        await page.locator('.fqTjSF > .sc-fotOHu > :nth-child(2) > .johypa').hover()
        await page.locator('.fqTjSF > .sc-fotOHu > :nth-child(2) > .johypa').click()
        await expect(page.locator("//div[normalize-space()='Prajakta Khadse']")).toBeVisible()

      
        // Get the current date
        const currentDate: Date = new Date();

        // Get the day of the month (1-31)
        const dayOfMonth: number = currentDate.getDate();

        // Get the month (0-11), adding 1 to get the actual month
        const month: number = currentDate.getMonth() + 1;

        // XPath expression with the day of the month

        const xpathExpression: string = `//div[@aria-label='${dayOfMonth} ${currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} Prajakta Khadse']`;
        
        // Click the element with the constructed XPath expression
        await page.click(xpathExpression);

        await page.waitForTimeout(5000)
       
        // Enter start and end time to create shift
        await page.locator('#shiftStartEnd_start').fill('9:00')
        await page.getByPlaceholder('To').fill('17:00')
        await page.getByRole('button',{name:'Create'}).click()
        await page.waitForTimeout(2000)

        // Approve the created shift
        await page.locator("//div[@class='shift-tile__inner']").hover()
        await page.locator(".three-dots-icon").click()
        await page.locator("//div[@title='Approve']").click()
        await expect(page.locator("//span[normalize-space()='Approved']")).toBeVisible();

        // Disapprove the shift
        
        await page.locator("//footer[@class='shift-tile__footer']").click()
        await page.locator("//div[@class='switch switch--primary switch--medium switch--on']").click()
        await page.locator("//button[normalize-space()='Save']").click()

        // Verify the shift is disapproved
        await page.locator("//div[@class='shift-tile__inner']").hover()
        await page.locator(".three-dots-icon").click()
        await expect(page.locator("//div[@title='Approve']")).toBeVisible()

        await page.waitForTimeout(2000)

        await page.close()
        


})