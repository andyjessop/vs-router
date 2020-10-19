const { chromium } = require('playwright');

jest.setTimeout(2000);

let browser;
let page;

beforeAll(async function() {
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage();
});

afterAll(async function() {
  browser.close();
})

beforeEach(async function() {
  await page.goto('http://localhost:8080');
});

test('should navigate to users route', async function() {
  await page.fill('#route-name', 'users');

  await page.click('#push');

  expect(await page.textContent('#pathname')).toEqual('/users');
});

test('should navigate to user route', async function() {
  await page.fill('#route-name', 'user');
  await page.fill('#params', '{"id":"1"}');

  await page.click('#push');

  expect(await page.textContent('#pathname')).toEqual('/users/1');
});

test('should go back', async function() {
  await page.fill('#route-name', 'users');

  await page.click('#push');
  await page.click('#back');

  expect(await page.textContent('#pathname')).toEqual('/');
});

test('should navigate to 404 if route not found', async function() {
  await page.goto('http://localhost:8080/invalid-route');

  expect(await page.textContent('#pathname')).toEqual('/404');
});

test('should register a new route', async function() {
  await page.fill('#register-name', 'posts');
  await page.fill('#path', '/posts');

  await page.click('#register');

  await page.fill('#route-name', 'posts');

  await page.click('#push');

  expect(await page.textContent('#pathname')).toEqual('/posts');
});
