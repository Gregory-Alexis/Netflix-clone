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
import Home from "./Home";

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

  it("Should be able to redirect to an other page", async () => {
    const link = await screen.findByText("Movies");
    const link2 = await screen.findByText("TV Shows");
    const link3 = await screen.findByText("New & Popular");
    const link4 = await screen.findByText("My List");
    const link5 = await screen.findByText("Kids");

    expect(link).toBeInTheDocument();
    expect(link2).toBeInTheDocument();
    expect(link3).toBeInTheDocument();
    expect(link4).toBeInTheDocument();
    expect(link5).toBeInTheDocument();

    fireEvent.click(link);
    fireEvent.click(link2);
    fireEvent.click(link3);
    fireEvent.click(link4);
    fireEvent.click(link5);

    expect(link.href).toBe("http://localhost/movie");
    expect(link2.href).toBe("http://localhost/tv-shows");
    expect(link3.href).toBe("http://localhost/latest");
    expect(link4.href).toBe("http://localhost/my-list");
    expect(link5.href).toBe("http://localhost/kids");
  });
});
