import { Component } from '@stencil/core';

@Component({
  tag: 'my-header'
})
export class MyHeader {
  render () {
    return (
      <ul>
        <li><stencil-route-link url="/" exact={true}>Home</stencil-route-link></li>
        <li><stencil-route-link url="/form">Form</stencil-route-link></li>
        <li><stencil-route-link url="/about">About</stencil-route-link></li>
      </ul>
    );
  }
}
