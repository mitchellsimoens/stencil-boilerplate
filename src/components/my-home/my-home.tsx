import { Component, Element, Prop, State } from '@stencil/core';

@Component({
  tag: 'my-home',
  styleUrl: 'my-home.scss'
})
export class MyHome {
  @Element() el: HTMLElement;

  @Prop() first: string;

  @Prop() last: string;

  @State () input: string;

  inputChanged (event) {
    this.input = event.target.value;
  }

  render () {
    return (
      <p>
        Hello, my props are {this.first} and {this.last}.
        {
          this.input != null ?
            (
              <div>My last input is: {this.input || <i>(empty string)</i>}</div>
            ) :
            null
        }
        <div>
          <input value={this.input} onChange={this.inputChanged.bind(this)} />
        </div>
      </p>
    );
  }
}
