import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Home from "./Home";
import "@testing-library/jest-dom";
import { store } from "../../redux/store/store";
import { Provider } from "react-redux";

beforeEach(() => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </Provider>
  );
});

afterEach(() => {
  render(cleanup);
});

describe("Home page test suits", () => {
  it("should loading page before display data", async () => {
    const loading = await screen.findByTestId("loading");
    expect(loading).toBeInTheDocument();
    await waitForElementToBeRemoved(loading);
    expect(loading).not.toBeInTheDocument();
  });

  it("Should be redirect correctly", async () => {
    const link = screen.getByText("Kids");
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
    const loading = await screen.findByTestId("loading");
    expect(loading).toBeInTheDocument();
    await waitForElementToBeRemoved(loading);
    expect(loading).not.toBeInTheDocument();
    expect(link.href).toBe("http://localhost/kids");
  });
});
