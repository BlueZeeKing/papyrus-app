import type { Route } from '../src/libs/route';

const routes: { [id: number]: Route } = {};

export function setRoute(id: number, route: Route) {
	routes[id] = route;
}

export function getRoute(id: number): Route {
	if (routes[id] == undefined) {
		return 'overview';
	}

	return routes[id];
}
