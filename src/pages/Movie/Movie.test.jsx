import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MemoryRouter } from "react-router";
import "@testing-library/jest-dom";
import { store } from "../../redux/store/store";
import { Provider } from "react-redux";
import Movie from "./Movie";

beforeEach(() => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Movie />
      </MemoryRouter>
    </Provider>
  );
});

afterEach(() => {
  render("");
});

describe("Movie page test suits", () => {
  it("should loading page before display data", async () => {
    const loading = await screen.findByTestId("loading");
    expect(loading).toBeInTheDocument();
    await waitForElementToBeRemoved(loading);
    expect(loading).not.toBeInTheDocument();
  });
});
