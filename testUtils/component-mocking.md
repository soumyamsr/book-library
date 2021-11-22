# Mocking Child component for snapshot testing

## Mock unnamed component

Component those are exported with `export default SomeComponnent`

```js
jest.mock('relative/path/for/SomeComponnent', () => (props) => {
  return <MockComponent componentName="SomeComponnent" props={props} />;
});
```

## Mock named component

Component those are exported with `export { SomeComponent }`

```js
jest.mock('relative/path/for/SomeComponnent', () => {
  return {
    SomeComponnent: (props) => {
      return <MockComponent componentName="SomeComponnent" props={props} />;
    }
  };
});
```

## Component build with compound pattern

```js
jest.mock('../../components/Layout/Layout', () => {
  const path = '../../components/Layout/Layout';
  const ActualLayout = require.requireActual(path);

  const MockedLayout = (props) => (
    <MockComponent componentName="Layout" props={props} />
  );
  const MockedLayoutMain = (props) => (
    <MockComponent componentName="Main" props={props} />
  );
  const MockedLayoutAside = (props) => (
    <MockComponent componentName="Aside" props={props} />
  );
  ActualLayout.Layout = MockedLayout;
  ActualLayout.Layout.Main = MockedLayoutMain;
  ActualLayout.Layout.Aside = MockedLayoutAside;

  return ActualLayout;
});
```
