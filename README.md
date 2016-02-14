redux-transact
===

Some simple functional redux async xhr transactor.

Depends on having the redux-thunk middleware.

Example Usage
----

An ajax async action can be created as follows:

```
  const receiver = (result) => ({
    type: RECEIVE_ACTION,
    data: result,
  });

  export default const asyncCreator = () =>
    transactor(route, receiver)
```

Transactor will send the request, and then dispatch
the result within the receiver action.

The route needs to be either an object that
can be handled with $.ajax, or a function of the state
which returns a value handled by $.ajax.
