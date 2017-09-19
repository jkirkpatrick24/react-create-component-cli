# react-create-component-cli

react-create-component-cli is simple cli tool to create boilerplate for react components. It makes use of [nunjucks](https://mozilla.github.io/nunjucks/) templates to construct the component files.

## Usage

Currently this package creates components using the assumption that you are using a few libraries within your react/redux application. These are not required to create basic components.
  - [redux-threads](https://github.com/stonevanzuiden/redux-threads)
  - [react-resolve-dependencies](https://github.com/eadmundo/react-resolve-dependencies)

```bash
  $ npm i -g @jkirkpatrick24/react-create-component-cli
  $ mkcpt $ARGS
```
### Example Component
`$ mkcpt --name TestComponent --hasDependencies --isConnected`

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
  --cwu                // false
  --ext                // react.js
  --hasConstructor     // false
  --hasDependencies    // false
  --isConnected        // false
  --isPure             // true
  --isFunctional       // false
  --name               // index
```

#### `--cdm`

defaults to false.

Creates the `componentDidMount` lifecycle method if `true`

#### `--cwm`

defaults to false.

Creates the `componentWillMount` lifecycle method if `true`

#### `--cwu`

defaults to false.

Creates the `componentWillUnmount` lifecycle method if `true`

#### `--hasConstructor`

defaults to false.

Creates the class `constructor` method if `true`

#### `--hasDependencies`

Defaults to false. Includes the [react-resolve-dependencies](https://github.com/eadmundo/react-resolve-dependencies) library.

adds to component:
```js
import resolveDependencies from 'react-resolve-dependencies';

static dependencies = [];

export default resolveDependencies()(componentName);

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

compose(
  connect(...connectArgs)
)()
```

#### `--isFunctional`

Defaults to `false`

renders a functional component

```
const {{ name }} => () {
  return (
    
  );
}

export default name
```

#### `--isPure`

Defaults to true.

While true, uses `React.PureComponent`. Otherwise uses `React.Component`

#### `--name`

Defaults to "index".

Name of the component.

## Liscence

MIT.
