
import { RestangularModule, Restangular, } from 'ngx-restangular';
import { NgModule, InjectionToken } from '@angular/core';

export const REST_FUL_RESPONSE = new InjectionToken<any>('RestFulResponse');
export function RestFulResponseFactory(restangular: Restangular) {
  return restangular.withConfig((RestangularConfigurer) => {
    RestangularConfigurer.setFullResponse(true);
  });
}

