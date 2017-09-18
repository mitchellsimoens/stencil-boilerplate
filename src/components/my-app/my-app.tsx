import { Component } from '@stencil/core';

@Component({
  tag: 'my-app'
})
export class MyApp {
  render () {
    return (
      <stencil-router>
        <my-header />

        <stencil-route
          url="/"
          exact={true}
          componentProps={{
            first: 'Stencil',
            last: 'JS'
          }}
          component="my-home"
        />

        <stencil-route
          url="/form"
          exact={true}
          component="my-form"
        />

        <stencil-route
          url="/about"
          exact={true}
          component="my-about"
        />

      </stencil-router>
    );
  }
}
