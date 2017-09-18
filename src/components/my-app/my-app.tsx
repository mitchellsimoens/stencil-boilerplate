import { Component } from '@stencil/core';

@Component({
  tag: 'my-app',
  styleUrl: 'my-app.scss'
})
export class MyApp {
  render () {
    return (
      <stencil-router>
        <my-header />

        <div class="app-content">

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

        </div>

      </stencil-router>
    );
  }
}
