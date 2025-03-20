import ansicolor from 'ansicolor';
import puppeteer from 'puppeteer';

type Element = {
  textContent: string | null;
  trim(): string;
};

/**
 * Hàm lấy nội dung của một trang web
 */
const crawlWeb = async (url: string): Promise<string[]> => {
  let browser = null;
  try {
    browser = await puppeteer.launch({
      headless: true, // Ẩn đi giao diện
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // Tránh lổi sandbox
    });
    const page = await browser.newPage(); // Mở page trên trinh duyet

    page.setDefaultTimeout(120000);
    await page.goto(url); // Mở trang web

    const content: string[] = await page.$$eval(
      // Lấy nội dung của các thẻ <p>, <h1>, <h2> trong <body>
      'body p, body h1, body h2',
      (elements: Element[]) => {
        return elements.map((element) => element.textContent.trim() || '');
      }
    );

    return content;
  } catch (error) {
    throw error;
  } finally {
    if (browser) {
      await browser.close(); // Đóng trinh duyệt, giải phóng tn
    }
  }
};

export const crawlDataByUrl = async (url: string): Promise<string[] | null> => {
  try {
    console.log(ansicolor.yellow(`Crawl website ${url}`));
    const context: string[] = await crawlWeb(url); // Gọi module crawlWeb ở dưới để lấy nội dung

    if (!context) {
      console.log(ansicolor.red(`Couldn't crawl data`));
      return null;
    }

    return context;
  } catch (error) {
    console.log(ansicolor.red(error.message));
    return null;
  }
};
