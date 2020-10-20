`very-simple-router` is:
 - a client-side router library
 - very small (<2kB gzipped)
 - very fast
 - synchronous
 - event-based
 - framework-agnostic
 - really very simple

## Usage

```js
import { createRouter } from 'very-simple-router';

const router = createRouter('/', {
  users: '/users',
  user: '/users/:id'
});

router.on('enter', ({ last, next }) => {
  console.log(`Last: ${JSON.stringify(last)}`);
  console.log(`Next: ${JSON.stringify(next)}`);
});

// very-simple-router follows the history API with its push/replace/back/forward/go terminology

// go to the users route
router.push('users');

/*
console output:

Last: { name: 'root', params: null }
Next: { name: 'users', params: null }
*/

router.push('user', { id: 1 });

/*
console output:

Last: { name: 'users', params: null }
Next: { name: 'user', params: { id: 1 } }
*/
```

### `root` route

The `root` path is added automatically, according to the first parameter passed to `createRouter`. Transitioning back to the `root` therefore:

```js
router.push('root');
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
router.push('userPosts', { userId: 1 }); // works!
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
