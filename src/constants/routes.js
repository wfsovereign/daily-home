

export const ROUTES_CONFIG = {
  HOME: {
    path: 'home',
    name: 'HOME',
    title: '',
  },
  COOKBOOK: {
    path: 'cookbook',
    name: 'COOKBOOK',
    title: 'Cookbook',
  },
  COOKBOOK_DETAIL: {
    path: 'cookbook/detail',
    name: 'COOKBOOK_DETAIL',
    title: (navigation) => {
      console.log('navigation :', navigation);

      return `${navigation.state.params.name}`
    }
  },
};
