import json from "../apis/JsonPlaceHolder";
import JsonPlaceHolder from "../apis/JsonPlaceHolder";
import _ from "lodash";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  //await let's us wait to get all posts and then move to next line
  await dispatch(fetchPosts()); // We need to dispatch the result of fetch posts inner settings

  //lodash map which will help us find unique userId (these two statements written again with lodash)
  // const userId = _.uniq(_.map(getState().posts, "userId"));
  // userId.forEach((id) => dispatch(fetchUser(id))); //No await because we not need to wait

  // using lodash to optimize the last two calls
  _.chain(getState().posts)
    .map("userId") // no need to pass getSate().posts to map as chain will pass it
    .uniq() // call uniq on result of map
    .forEach((id) => dispatch(fetchUser(id))) // call this on result of uniq
    .value(); // this is required with chain
};

export const fetchPosts = () => async (dispatch) => {
  const response = await json.get("/posts");
  // using dispatch rather than returning. This is a finctionality to use with async

  // Here initially we have dspatched the whole object we got and thus it has a lot of unwanted data
  // thus changed payload: response to the current state
  dispatch({ type: "FETCH_POSTS", payload: response.data });

  //Bad approch because breaks rules of Redux
  //   const promise = await json.get("/posts");

  //   Not required. We will catch dispatch ourselves. This is a synchronous call
  //   return {
  //     type: "FETCH_POSTS",
  //     payload: promise,
  //   };
};

export const fetchUser = (id) => async (dispatch) => {
  const response = await json.get(`/users/${id}`);
  dispatch({ type: "FETCH_USER", payload: response.data });
};

// export const fetchUser = (id) => (dispatch) => {
//   _fetchUser(id, dispatch);
// };

// we use this to call for every user just once (sort of create a memory of the function)
// memoize calls the function with one ID only once (i.e. parameters) and returns other time last values
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await json.get(`/users/${id}`);
//   dispatch({ type: "FETCH_USER", payload: response.data });
// });
// memize creates a problem because if the user details changed we cannot fetch new one

//This still gets called everytime bcoz a new version is created everytime by react thus called everytime
// export const fetchUser = function (id) {
//   return _.memoize(async function (dispatch) {
//     const response = await json.get(`/users/${id}`);

//     dispatch({ type: "FETCH_USER", payload: response.data });
//   });
// };

//Actual function. Reduced above
// return async (dispatch) => {
//     const response = await json.get("/posts");

//     // using dispatch rather than returning. This is a finctionality to use with async
//     dispatch({ type: "FETCH_POSTS", payload: response });
//   };
