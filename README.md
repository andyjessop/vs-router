# Rute

`rute` is:
 - a client-side router library
 - very small (<5KB minified)
 - event-based,
 - framework-agnostic 
 - based on the excellent `teki` URL parsing library

## Usage

```js
const router = createRouter('/', {
  users: '/users',
  user: '/users/:id'
});

router.on('enter', ({ last, next }) => {
  console.log(`Last: ${JSON.stringify(last)}`);
  console.log(`Next: ${JSON.stringify(next)}`);
});

// rute follows the history API with its push/replace/back/forward/go terminology

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
