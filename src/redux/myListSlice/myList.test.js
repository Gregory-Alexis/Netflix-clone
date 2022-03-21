import "@testing-library/jest-dom";
import myListSlice from "./myListSlice";

describe("My List slice test suits", () => {
  it("should return the initial state", () => {
    expect(myListSlice(undefined, [])).toEqual({
      myList: [],
      quantity: 0,
    });
  });
});
