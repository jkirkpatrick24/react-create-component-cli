# react-create-component-cli

react-create-component-cli is simple cli tool to create boilerplate for react components. It is tightly coupled to redux.

## Usage

Currently this package assumes you are using a few libraries within your react/redux application
  - [redux-threads](https://github.com/stonevanzuiden/redux-threads)
  - [react-resolve-dependencies](https://github.com/eadmundo/react-resolve-dependencies)

```bash
  $ npm i -g @jkirkpatrick24/react-create-component-cli
  $ mkcpt $ARGS
```
### Example Component
`mkcpt --name TestComponent --hasDependencies --isConnected`

```js
// TestComponent.react.js

import React from 'react';
import { compose } from 'redux';
import resolveDependencies from 'react-resolve-dependencies';
import { connect } from 'react-redux';
import { makeConnectArgs } from 'redux-threads';
import * as selectors from '../selectors';
import * as actions from '../actions';

export class TestComponent extends React.PureComponent {

  static dependencies = [];

  render() {
    return(

    );
  }

}

const pageThread = [
  selectors,
  actions,
  (stateProps, dispatchProps) => ({})
]

const connectArgs = makeConnectArgs(
  pageThread
);

export default compose(
  resolveDependencies()
  connect(...connectArgs)
)(TestComponent);
```

### Arguments

Currently makes use of the following flags
```
  --cdm                // false
  --cwm                // false
  --ext                // react.js
  --hasConstructor     // false
  --hasDependencies    // false
  --isConnected        // false
  --isPure             // true
  --name               // index
  --path               // current directory
```

#### `--cdm`

defaults to false.

Creates the `componentDidMount` lifecycle method if `true`

#### `--cwm`

defaults to false.

Creates the `componentWillMount` lifecycle method if `true`

#### `--hasConstructor`

defaults to false.

Creates the class `constructor` method if `true`

#### `--hasDependencies`

Defaults to false. Includes the [react-resolve-dependencies](https://github.com/eadmundo/react-resolve-dependencies) library.

adds to component:
```js
import resolveDependencies from 'react-resolve-dependencies';

static dependencies = [];

//export default compose(
  resolveDependencies()
//)();
```

#### `--isConnected`

Defaults to `false`

Includes imports and boilerplate for a redux connected component (Assuming the use of [redux-threads](1))

adds to component:
```js
import { connect } from 'react-redux';
import { makeConnectArgs } from 'redux-threads';
import * as selectors from '../selectors';
import * as actions from '../actions';

const pageThread = [
  selectors,
  actions,
  (stateProps, dispatchProps) => ({})
]

const connectArgs = makeConnectArgs(
  pageThread
);

//compose(
  connect(...connectArgs)
//)()
```

#### `--isPure`

Defaults to true.

While true, uses `React.PureComponent`. Otherwise uses `React.Component`

#### `--name`

Defaults to "index".

Name of the component.

#### `--path`

Defaults to current directory.

The target directory where you will generate the component file.

## Liscence

MIT.
