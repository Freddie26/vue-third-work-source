export default [
  {
    name: 'Counter Base',
    path: '/counter-0',
    component: () => import("./demo0/DemoCounter.vue"),
  },
  {
    name: 'Counter Props & Events',
    path: '/counter-1',
    component: () => import("./demo1/DemoCounter.vue"),
  },
  {
    name: 'Pinia',
    path: '/counter-4',
    component: () => import("./demo4/DemoCounter.vue"),
  },
  {
    name: 'Web Server',
    path: '/demo5',
    component: () => import('./demo5/Server.vue'),
  },
  {
    name: 'Bouncing Ball CSS',
    path: '/bouncing_ball_css',
    component: () => import('./demo6/BouncingBallCSS.vue'),
  },
  {
    name: 'Bouncing Ball JS',
    path: '/bouncing_ball_js',
    component: () => import('./demo6/BouncingBallJS.vue'),
  }
];
