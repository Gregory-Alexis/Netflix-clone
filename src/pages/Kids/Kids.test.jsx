import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MemoryRouter } from "react-router";
import "@testing-library/jest-dom";
import { store } from "../../redux/store/store";
import { Provider } from "react-redux";
import Kids from "./Kids";

beforeEach(() => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Kids />
      </MemoryRouter>
    </Provider>
  );
});

afterEach(() => {
  render(cleanup);
});

describe("Kids page test suits", () => {
  it("should loading page before display data", async () => {
    const loading = await screen.findByTestId("loading");
    expect(loading).toBeInTheDocument();
    await waitForElementToBeRemoved(loading);
    expect(loading).not.toBeInTheDocument();
  });

  it("should display button exit kids", async () => {
    const button = await screen.findByText("Exit Kids");
    expect(button).toBeInTheDocument();
  });

  it("Should be redirect to home page correctly", async () => {
    const link = await screen.findByText("Exit Kids");
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
    expect(link.href).toBe("http://localhost/home");
  });
});
