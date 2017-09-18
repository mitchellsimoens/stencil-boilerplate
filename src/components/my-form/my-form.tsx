import { Component, State } from '@stencil/core';

@Component({
  tag: 'my-form',
  styleUrl: 'my-form.scss'
})
export class MyForm {
  @State () email: string;
  @State () firstName: string;
  @State () lastName: string;

  inputChanged (event) {
    const { target : { name, value } } = event;

    this[ name ] = value;
  }

  render () {
    return (
      <form>
        <div>
          <label>
            <span>First Name</span>
            <input value={this.firstName} name="firstName" onChange={this.inputChanged.bind(this)} />
          </label>
        </div>
        <div>
          <label>
            <span>Last Name</span>
            <input value={this.lastName} name="lastName" onChange={this.inputChanged.bind(this)} />
          </label>
        </div>
        <div>
          <label>
            <span>Email</span>
            <input type="email" value={this.email} name="email" onChange={this.inputChanged.bind(this)} />
          </label>
        </div>
      </form>
    );
  }
}
