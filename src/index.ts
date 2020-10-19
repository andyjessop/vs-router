// import { createRouter } from './router/create-router';
import { Router } from './router/types';
import { parse } from './parser';
import { createRouter } from './router/create-router';

const app = document.getElementById('app');

const router = createRouter('', {
  posts: '/posts?page?=:page',
  post: '/posts/:id'
});

(<any>window).router = router;

router.on(Router.Events.Exit, exiting);
router.on(Router.Events.Enter, entering);

function exiting(data: any): Promise<void>{
  console.log('exiting start', Date.now(), data);

  return new Promise(resolve => {
    setTimeout(() => {
      console.log('exiting end', Date.now(), data);
      resolve();
    }, 2000);
  });
}

function entering(data: any) {
  console.log('entering', data);
}
// const router = createRouter('', {
//   posts: 'posts',
// });
// const curriedParse = parse('/posts/:id?page?=:page#:hash');
//
// console.log(location);
// console.log(curriedParse(`${location.origin}/posts/3#test`));
//
// function handleURLChange(data: any) {
//   debugger;
//   console.log(data);
// }
//
// window.addEventListener('popstate', handleURLChange);
// router.get('posts').on(Router.Events.PATH_CHANGED, showPosts);

// function showPosts() {
//   if (!app) {
//     return;
//   }
//
//   app.innerHTML = 'posts';
// }

/*

const router = createRouter();

router.register('posts', '/posts?page?=:page');
router.register('post', '/posts?:id');

// routes = {
//   posts: { decodeURL: curriedParse, encodeURL: curriedReverse, listeners: { change: Listener[], enter: Listener[], exit: Listener[], },
// }

// currentRoute = {
//   name: 'posts',
//   params: {
//     id: 2,
//     page: 2,
//     hash: undefined,
//   },
// }

router.onEnter('posts', postsHandler); // calls handler synchronously if current route matches
router.onExit('posts', next => removePostsWithFade(next)); // allows async transition for cleanup work
router.onChange('posts', changes => handleDifferentPostsPage(changes));
router.onEnter('*', allRoutesHandler);
router.onEnter(['posts', 'users'], someRoutesHandler);
router.on(Enter, ({ last, next }) => handleRouteChange);

router.push('posts', { page: 3 }, { state, title });

// 'posts' is same, so `page` is merged-in, i.e.
// if currentRoute.name === name
//   url = routes.posts.encodeURL(Object.assign(currentRoute.params));
//   changes = { page: 3 }
//   window.history.pushState(state, title, `${baseURL}${url}`);
//   route.posts.listeners.change.forEach(listener => listener(changes))

router.navigate('posts', { id: 3, page: 2, hash: 'test' });
router.back();
router.forward();

// The following hve no information associated with them, so we need to push the currentRoute to state
//  window.history.forward();
//  window.history.backward();
//  window.history.go();
 */
