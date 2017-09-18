import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'my-home',
  styleUrl: 'my-home.scss'
})
export class MyHome {
  @Prop() first: string;

  @Prop() last: string;

  render () {
    return (
      <p>
        Hello, my props are {this.first} and {this.last}.
      </p>
    );
  }
}
