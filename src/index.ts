import { Router } from './router/types';
import { createRouter } from './router/create-router';
import { html, render } from 'lit-html';

const appEl = document.getElementById('app');

if (!appEl) {
  throw Error('app not found.');
}

const router = createRouter('', {
  users: '/users?page?=:page',
  user: '/users/:id',
  notFound: '/not-found',
  posts: '/posts/:user/comments?page?=:page&id*=:ids',
});

router.on(Router.Events.Transition, () => {
  render(app(), <HTMLElement>document.getElementById('app'));
});

render(app(), <HTMLElement>document.getElementById('app'))

function app() {
  return html`
    <div>
      <input id="route-name" type="text" placeholder="name">
      <input id="params" type="text" placeholder="params">
      <button id="push" @click=${push}>Push</button>
      <button id="replace" @click=${replace}>Replace</button>
      <button id="back" @click=${back}>Back</button>
      <button id="forward" @click=${forward}>Forward</button>
    </div>
    <div>
      <input id="register-name" type="text" placeholder="name">
      <input id="path" type="text" placeholder="path">
      <button id="register" @click=${register}>Register</button>
    </div>
    <p id="pathname" class="pathname">${getPathName()}</p>
  `;
}

function back() {
  router.back();
}

function forward() {
  router.forward();
}

function getPathName() {
  return window.location.href.substr(window.location.origin.length);
}

function push() {
  const name = (<HTMLInputElement>document.getElementById('route-name')).value;
  const params = (<HTMLInputElement>document.getElementById('params')).value;

  router.push(name, params.length ? JSON.parse(params) : undefined);
}

function register() {
  const name = (<HTMLInputElement>document.getElementById('register-name')).value;
  const path = (<HTMLInputElement>document.getElementById('path')).value;

  router.register(name, path);
}

function replace() {
  const name = (<HTMLInputElement>document.getElementById('name')).value;
  const params = (<HTMLInputElement>document.getElementById('params')).value;

  router.replace(name, params.length ? JSON.parse(params) : undefined);
}
