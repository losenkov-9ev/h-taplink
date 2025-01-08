import { Route, RouteProps } from 'react-router-dom';

export const createRoutes = (routeConfig: Record<string, RouteProps>) => {
  return Object.values(routeConfig).map(({ path, element }) => (
    <Route key={path} path={path} element={element} />
  ));
};
