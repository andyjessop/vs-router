The **V**ery **S**imple **Router** (`@vs-router`) is:
 - a router library for the browser
 - very small (<2kB gzipped)
 - very fast
 - synchronous
 - event-based
 - framework-agnostic
 - really very simple

## Installation
```
npm install --save @vs/router

// or for yarn:
yarn add @vs/router
```
## Usage

```js
import { createRouter } from '@vs/router';

const router = createRouter('/', {
  users: '/users',
  user: '/users/:id'
});

router.addListener('transition', logTransition);

function logTransition({ last, next }) {
  console.log(`Last: ${JSON.stringify(last)}`);
  console.log(`Next: ${JSON.stringify(next)}`);
}


// go to the users route
router.navigate('users');

/*
console output:

Last: { name: 'root', params: null }
Next: { name: 'users', params: null }
*/

router.navigate('user', { id: 1 });

/*
console output:

Last: { name: 'users', params: null }
Next: { name: 'user', params: { id: 1 } }
*/

router.back();

/*
console output:

Last: { name: 'root', params: null }
Next: { name: 'users', params: null }
*/

router.forward();

/*
console output:

Last: { name: 'users', params: null }
Next: { name: 'user', params: { id: 1 } }
*/

router.go(-1);

/*
console output:

Last: { name: 'root', params: null }
Next: { name: 'users', params: null }
*/
```

### Removing listeners

```ts
router.removeListener('transition', logTransition);
```

### Destroying the router

```ts
router.destroy();
```

### `root` route

The `root` path is added automatically, according to the first parameter passed to `createRouter`. Transitioning back to the `root` therefore:

```js
router.navigate('root');
```

### The `notFound` route

A `notFound` route is added automatically and defaults to `/404`. In order to override it, register a new root with the `notFound` name:

```js
const router = createRouter('/', {
  notFound: '/my-not-found-page',
});
```

### Registering new routes

New routes can be added, by passing a name and path pattern:
```js
router.register('userPosts', '/posts/:userId');
router.navigate('userPosts', { userId: 1 }); // works!
```

### Patterns API

URL parameters:
```
Pattern: /posts/:user
Params:  { user: 'admin' }
Path:    /posts/admin
```

```
Pattern: /posts/:user/:tag
Params:  { user: 'admin', tag: 'important' }
Path:    /posts/admin/important
```

Query parameters:
```
Pattern: /posts?page=:page
Params:  { page: 1 }
Path:    /posts?page=1
```

Hash:
```
Pattern: /posts#:section
Params:  { section: 'comments' }
Path:    /posts#comments
```

Optional query parameters
```
Pattern: /posts?page?=:page
Params:  {} // or { page: null }
Path:    /posts
```

List parameters
```
Pattern: /posts?id*=:ids
Params:  { ids: [1, 2] }
Path:    /posts?id=1&id=2
```

Regex can also be used for the patern, so for advanced usage, see [the tests](src/parser/index.test.ts).

## Credit

The parser is a fork of the excellent [`teki` URL parsing library by Philip Nilsson](https://github.com/philipnilsson/teki). It's the beating heart of `very-simple-router` and is essentially what allows it to stay small and very, very fast.
