import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {
    
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    
    if ((future.routeConfig?.component?.name === 'JobList' &&
        curr.routeConfig?.component?.name === 'JobList') ||
        (future.routeConfig?.component?.name === 'MyApplications' &&
        curr.routeConfig?.component?.name === 'MyApplications')) {
      return false;
    }
    return future.routeConfig === curr.routeConfig;
  }
}