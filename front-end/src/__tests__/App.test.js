import puppeteer from 'puppeteer';
import * as path from 'path';


const APP = "http://localhost:5000";

let page;
let browser;
const width = 1540;
const height = 1024;

const user = {
    username:"stw",
    password:"stw"
}

describe("App test", () => {
    beforeAll(async () => {
        browser = await puppeteer.launch({
          headless: false,
          slowMo: 80,
          args: [`--window-size=${width},${height}`]
        });
        page = await browser.newPage();
       
        await page.setViewport({ width, height });
      });
    
    afterAll(() => {
        browser.close();
    });

    test("Web page(localhost:5000) title must be 'MyWeb'", async () => {
        await page.goto(APP);
        const title = await page.$eval("#title", el => el.textContent);
        expect(title).toBe("MyWeb");
    },10000);

    test("After login, username must be 'stw' ", async () => {
        
        await page.click("#loginBtn");
        const title = await page.$eval("#tableTitle", el => el.textContent);

        await page.type("input[name=username]",user.username);
        await page.type("input[name=password]", user.password);
        await Promise.all([
            page.click("#loginSubmit"),
            page.waitForNavigation( { 'waitUntil' : 'networkidle0' } )
        ]);

        const username = await page.$eval("#userBtn", el => el.textContent)

        expect(username).toBe(`${user.username.toUpperCase()}님`)
        expect(title).toBe('로그인')
    },10000)

    test("Q&A board page title must be 'Q&A' ", async () => {
        await Promise.all([
            page.click(".question-link-wrap"),
            page.waitForNavigation( { 'waitUntil' : 'networkidle0' } )
        ]);

        const title = await page.$eval("#tableTitle", el => el.textContent);

        expect(title).toBe("Q&A")
    },10000)

    test("Q&A write page title must be '질문하기'", async () => {
        await page.waitForSelector(".cardWrap");
        await Promise.all([
            page.click("a[aria-label=questionwrite]"),
            page.waitForNavigation( { 'waitUntil' : 'networkidle0' } )
        ]);

        const title = await page.$eval("#tableTitle", el => el.textContent);

        expect(title).toBe("질문하기");
    },10000)

    test("Write board in Q&A board", async () => {
        const board = {
            title:'puppeteer 테스트',
            content:"puppeteer를 이용한 테스트 이미지 추가"
        }

        page.on('dialog', async dialog => {
            await dialog.accept();
        });

        await page.type("input[name=title]",board.title);
        await page.type(".ck-content",board.content);

        const filePath = path.relative(process.cwd(), __dirname + '/assets/24.png');
        const input = await page.$('input[type=file]');
        await input.uploadFile(filePath);

        await page.click("#questionSubmit");
        const questionDetailTitle = await page.$eval("#question_detail_title", el => el.textContent);

        expect(questionDetailTitle).toBe(board.title)

    },12000)

    test("Delete board", async () => {
        await page.click("#question-delete-btn");
    });

    test("Logout", async () => {
        await page.click("#logoutBtn");
        const username = await page.$eval("#loginBtn", el => el.textContent);

        expect(username).toBe('Login')
    })
});