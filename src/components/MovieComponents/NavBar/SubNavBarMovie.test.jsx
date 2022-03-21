import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { store } from "../../../redux/store/store";
import "@testing-library/jest-dom";
import SubNavBarMovie from "./SubNavBarMovie";

beforeEach(() => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <SubNavBarMovie />
      </MemoryRouter>
    </Provider>
  );
});

afterEach(() => {
  render(cleanup);
});

describe("Sub NavBar test suits", () => {
  it("Should display < Movie > title", () => {
    const title = screen.getByText("MOVIE");
    expect(title).toBeInTheDocument();
  });

  it("Should redirect on movie page suggestion", () => {
    const link = screen.getByTestId("movie-suggestion");
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
    expect(link.href).toBe("http://localhost/movie-suggestion");
  });

  it("Should  redirect on movie page", () => {
    const link = screen.getByTestId("movie-suggestion");
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
    expect(link.href).toBe("http://localhost/movie-suggestion");
    const link2 = screen.getByTestId("movie");
    expect(link2).toBeInTheDocument();
    fireEvent.click(link2);
    expect(link2.href).toBe("http://localhost/movie");
  });

  it("Should be able to see the movies poster", async () => {
    const title = await screen.findByText("Action & Adventure");
    expect(title).toBeInTheDocument();
  });
});
