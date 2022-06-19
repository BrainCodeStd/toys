import { AnyAction, configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { ThunkMiddleware } from "redux-thunk";
import nodesReducer, { checkNodeStatus, NodesState } from "../reducers/nodes";

describe("Store", () => {
  const nodes = {
    list: [
      { url: "a.com", online: false, name: "", loading: false, data: [], error:''},
      { url: "b.com", online: false, name: "", loading: false, data: [], error:''},
      { url: "c.com", online: false, name: "", loading: false, data: [], error:''},
      { url: "d.com", online: false, name: "", loading: false, data:[ ], error:''},
    ],
  };

  let store: EnhancedStore<
    { nodes: NodesState },
    AnyAction,
    [
      | ThunkMiddleware<{ nodes: NodesState }, AnyAction, null>
      | ThunkMiddleware<{ nodes: NodesState }, AnyAction, undefined>
    ]
  >;

  beforeAll(() => {
    store = configureStore({
      reducer: {
        nodes: nodesReducer,
      },
      preloadedState: { nodes },
    });
  });
  afterAll(() => {});

  it("should display results when necessary data is provided", () => {
    const actions = [
      {
        type: checkNodeStatus.fulfilled.type,
        meta: { arg: nodes.list[0] },
        payload: { node_name: "alpha",data:[], error:'' },
      },
      {
        type: checkNodeStatus.fulfilled.type,
        meta: { arg: nodes.list[1] },
        payload: { node_name: "beta",data:[], error:''  },
      },
      {
        type: checkNodeStatus.fulfilled.type,
        meta: { arg: nodes.list[0] },
        payload: { node_name: "gamma",data:[], error:''  },
      },
      {
        type: checkNodeStatus.fulfilled.type,
        meta: { arg: nodes.list[2] },
        payload: { node_name: "delta" ,data:[], error:'' },
      },
      {
        type: checkNodeStatus.fulfilled.type,
        meta: { arg: nodes.list[1] },
        payload: { node_name: "epsilon",data:[], error:''  },
      },
      {
        type: checkNodeStatus.fulfilled.type,
        meta: { arg: nodes.list[0] },
        payload: { node_name: "zeta",data:[], error:''  },
      },
      {
        type: checkNodeStatus.fulfilled.type,
        meta: { arg: nodes.list[0] },
        payload: { node_name: "eta",data:[], error:''  },
      },
      {
        type: checkNodeStatus.fulfilled.type,
        meta: { arg: nodes.list[0] },
        payload: { node_name: "theta",data:[], error:''  },
      },
    ];
    actions.forEach((action) => store.dispatch(action));

    const actual = store.getState();
    const expected = {
      list: [
        { url: "a.com", online: true, name: "theta", loading: false,data:[], error:'' },
        { url: "b.com", online: true, name: "epsilon", loading: false,data:[], error:'' },
        { url: "c.com", online: true, name: "delta", loading: false,data:[], error:'' },
        { url: "d.com", online: false, name: "", loading: false,data:[], error:'' },
      ],
    };

    expect(actual.nodes).toEqual(expected);
  });
});
