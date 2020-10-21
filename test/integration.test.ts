const { chromium } = require('playwright');

jest.setTimeout(2000);

let browser: any;
let page: any;

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

  await page.click('#navigate');

  expect(await page.textContent('#pathname')).toEqual('/users');
});

test('should navigate to user route', async function() {
  await page.fill('#route-name', 'user');
  await page.fill('#params', '{"id":"1"}');

  await page.click('#navigate');

  expect(await page.textContent('#pathname')).toEqual('/users/1');
});

test('should go back', async function() {
  await page.fill('#route-name', 'users');

  await page.click('#navigate');
  await page.click('#back');

  expect(await page.textContent('#pathname')).toEqual('/');
});

test('should navigate to 404 if route not found', async function() {
  await page.goto('http://localhost:8080/invalid-route');

  expect(await page.textContent('#pathname')).toEqual('/not-found');
});

test('should register a new route', async function() {
  await page.fill('#register-name', 'posts');
  await page.fill('#path', '/posts');

  await page.click('#register');

  await page.fill('#route-name', 'posts');

  await page.click('#navigate');

  expect(await page.textContent('#pathname')).toEqual('/posts');
});

const suites = [
  {
    name: 'posts',
    tests: [
      { description: 'should be not found if required parameter missing', params: '{"page":1,"hash":"comments"}', expect: '/not-found' }, // required user parameter not given
      { description: 'add parameter and list parameters', params: '{"user":"admin","page":1,"hash":"comments"}', expect: '/posts/admin/comments?page=1#comments' },
      { description: 'should not add parameter if null', params: '{"user":"admin","page":null,"hash":"comments"}', expect: '/posts/admin/comments#comments' },
      { description: 'should not add parameter if missing', params: '{"user":"admin","hash":"comments"}', expect: '/posts/admin/comments#comments' },
      { description: 'should add hash', params: '{"user":"admin","hash":"comments"}', expect: '/posts/admin/comments#comments' },
    ],
  }
];

suites.forEach(function runSuite(suite) {
  describe(suite.name, () => {
    suite.tests.forEach(t => {
      test(t.description, async function() {
        await page.fill('#route-name', suite.name);
        await page.fill('#params', t.params);

        await page.click('#navigate');

        expect(await page.textContent('#pathname')).toEqual(t.expect);
      });
    });
  });
});
