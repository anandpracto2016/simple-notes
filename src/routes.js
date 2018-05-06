import UniversalRouter from 'universal-router';

const routes = [
  {
    path: '',
    action: (context, params) => {
      console.log("Homepage..");
      return {
        context,
        component: require('./pages/index').default
      };
    }
  },
  {
    path: '/share',
    action: (context, params) => {
      console.log("Homepage..");
      return {
        context,
        component: require('./modules/dashboard/components/ShowNote').default
      };
    }
  }
];


const createRouter = (routes) => (store) => {
  const options = {
    context: { store },
    resolveRoute(context, params) {
      if (typeof context.route.action === 'function') {
        return context.route.action(context, params);
      }
      return null;
    }
  };
  return new UniversalRouter(routes, options);
}

export const createRouterWithContext = createRouter(routes);

const onNavigation = router => (renderCallback, renderErrorPageCallback) => (path, query) => {
  router
    .resolve(path)
    .then(({context, component}) => {
      console.log("Successfully matched route: ");
      let {store} = context;
      renderCallback(store, component);
    })
    .catch((err) => {
      renderErrorPageCallback(err);
    })
}

export default onNavigation;
