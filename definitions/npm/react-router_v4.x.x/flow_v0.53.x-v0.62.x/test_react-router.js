// @flow
import React from "react";
import {
  StaticRouter,
  MemoryRouter,
  Router,
  Prompt,
  Redirect,
  Route,
  Switch,
  withRouter,
  matchPath
} from "react-router";
import type {
  Location,
  Match,
  ContextRouter,
  RouterHistory
} from "react-router";

// Location
var locationOK: Location = {
  pathname: "/path",
  search: "?search",
  hash: "#hash",
  state: null,
  key: "key"
};

// $FlowExpectedError
var locationError: Location = {};

// StaticRouter
<StaticRouter context={{}}>
  <div />
</StaticRouter>;
<StaticRouter location="/" context={{}} basename="/foo/">
  <div />
</StaticRouter>;

// $FlowExpectedError
<StaticRouter />;

// MemoryRouter
<MemoryRouter>
  <div />
</MemoryRouter>;
<MemoryRouter
  initialEntries={["/one", "/two", { pathname: "/three" }]}
  initialIndex={1}
  getUserConfirmation={(
    message: string,
    callback: (confirmed: boolean) => void
  ): void => {}}
  keyLength={3}
>
  <div />
</MemoryRouter>;

// $FlowExpectedError
<MemoryRouter initialEntries={""} />;

declare var history: RouterHistory;
<Router history={history}>
  <div />
</Router>;

// $FlowExpectedError
<Router>
  <div />
</Router>;

// Prompt
<Prompt message="ok?" when={true} />;
<Prompt message={location => "ok?"} />;
<Prompt message={location => true} />;

// $FlowExpectedError
<Prompt />;

// Redirect
<Redirect to="/foo" push />;
<Redirect
  to={{
    pathname: "/login",
    search: "?utm=foo",
    state: { referrer: "/current" }
  }}
/>;

// $FlowExpectedError
<Redirect />;

// Route
var User = () => <div />;
<Route path="/user/:username" component={User} exact={true} strict={true} />;
<Route
  path="/home"
  render={({ match }) =>
    <div>
      Home {match.path}
    </div>}
/>;
<Route
  path="/"
  children={({ match }) => <div className={match ? "active" : ""} />}
/>;
<Route>
  <div>children</div>
</Route>;

// $FlowExpectedError
<Route path="/user/:username" component={<User />} />;

// Switch
<Switch>
  <Route />
  <Route />
</Switch>;

// withRouter
type FooProps = {|
  ...ContextRouter,
  name: string
|};
const Foo = ({ location, name }: FooProps) =>
  <div>
    {location.pathname} {name}
  </div>;
const FooWithRouter = withRouter(Foo);
<FooWithRouter name="name" />;

class Bar extends React.Component<FooProps> {}
const BarWithRouter = withRouter(Bar);
<BarWithRouter name="name" />;

// $FlowExpectedError
withRouter("nope");

// const FooWithRouterError = withRouter(Foo);
// <FooWithRouterError name={3} />;

const BarWithRouterError = withRouter(Bar);
// $FlowExpectedError
<BarWithRouterError name={3} />;

const IncorrectHistoryUsage = ({ history, name }: FooProps) => {
  // Wrong arguments here
  // $FlowExpectedError
  history.push(["bla"]);
  return (
    <div>
      {name}
    </div>
  );
};

const IncorrectHistoryBlockUsage = (history: RouterHistory) => {
  // Wrong arguments here
  // $FlowExpectedError
  history.block(false);

  // These are valid
  history.block('Are you sure you want to leave this page?');
  history.block((location, action) => {
    return 'Are you sure you want to leave this page?';
  });
};

// matchPath
const match: null | Match = matchPath("/the/pathname", {
  path: "/the/:dynamicId",
  exact: true,
  strict: false
});
const match2: null | Match = matchPath("/the/pathname", "/the/:dynamicId");
const match3: null | Match = matchPath("/the/pathname");

// $FlowExpectedError
matchPath();
// $FlowExpectedError
const matchError: string = matchPath("/the/pathname", "the/:dynamicId");

const Unrouted: React$ComponentType<{|
  ...ContextRouter,
  someProp: string
|}> = () => <span />;

const Routed1: React$ComponentType<{| someProp: string |}> = withRouter(
  Unrouted
);


const Unrouted2: React$ComponentType<{|
  ...ContextRouter,
  someProp: string
|}> = () => <span />;

const Routed2: React$ComponentType<{| someProp2: string |}> = withRouter(
  // $FlowExpectedError[prop-missing]
  Unrouted2
);
