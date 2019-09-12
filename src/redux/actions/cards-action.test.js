import * as actions from "./cards-action";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import expect from "expect";

// test saveToLocalStorage function
describe("actions", () => {
  it("should return key : value", () => {
    const key = "key";
    const value = "value";
    const expectedAction = {
      type: "ADD_TO_LOCALSTORAGE",
      key,
      value
    };
    expect(actions.saveToLocalStorage(key, value)).toEqual(expectedAction);
  });
});

test("getLocalStorage function existed", () => {
  expect(actions.getLocalStorage()).toBeDefined();
});

test("getLocalStorage function return json", () => {
  expect(typeof actions.getLocalStorage()).toBe("object");
});

test("getCards function existed", () => {
  expect(actions.getCards()).toBeDefined();
});

test("get cards function handel error", async () => {
  try {
    await actions.getCards();
  } catch (e) {
    expect(e).toMatch("error");
  }
});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("creates LIST_CARDS when fetching cards has been done", () => {
    fetchMock.getOnce("/challenge/json", {
        type: "LIST_CARDS",
        payload: {
          allCards: [
            {
              code: 1,
              description: "E xercise on a regular basis.",
              tag: "sport",
              title: "Exercise"
            },
            {
              code: 0,
              description: "Look at this beautiful painting",
              image: "http://static.pushe.co/challenge/sky.jpg",
              tag: "art",
              title: "Painting"
            },
            {
              code: 2,
              description: "Listen to the music",
              sound: "http://static.pushe.co/challenge/sound.mp3",
              tag: "fun",
              title: "Let's have fun"
            },
            {
              code: 1,
              description: "Have you called your parents lately!",
              tag: "fun",
              title: "Hey!"
            },
            {
              code: 0,
              description: "Have you ever played one of theses sports?",
              image: "http://static.pushe.co/challenge/sport.jpg",
              tag: "sport",
              title: "Sports"
            }
          ]
        }
      });

    const expectedActions = [
      {
        type: "LIST_CARDS",
        payload: {
          allCards: [
            {
              code: 1,
              description: "Exercise on a regular basis.",
              tag: "sport",
              title: "Exercise"
            },
            {
              code: 0,
              description: "Look at this beautiful painting",
              image: "http://static.pushe.co/challenge/sky.jpg",
              tag: "art",
              title: "Painting"
            },
            {
              code: 2,
              description: "Listen to the music",
              sound: "http://static.pushe.co/challenge/sound.mp3",
              tag: "fun",
              title: "Let's have fun"
            },
            {
              code: 1,
              description: "Have you called your parents lately!",
              tag: "fun",
              title: "Hey!"
            },
            {
              code: 0,
              description: "Have you ever played one of theses sports?",
              image: "http://static.pushe.co/challenge/sport.jpg",
              tag: "sport",
              title: "Sports"
            }
          ]
        }
      }
    ];

    const store = mockStore({ allcards: [] });

    return store.dispatch(actions.getCards()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
