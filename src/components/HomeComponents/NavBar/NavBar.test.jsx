import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { store } from "../../../redux/store/store";
import NavBar from "./NavBar";
import "@testing-library/jest-dom";

beforeEach(() => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    </Provider>
  );
});

afterEach(() => {
  render(cleanup);
});

describe("NavBar test suits", () => {
  it("should display netflix logo", async () => {
    const img = await screen.getByAltText("Netflix");
    expect(img).toBeInTheDocument();
  });

  it("should display the link", () => {
    const homeLink = screen.getByText("Home");
    const tvLink = screen.getByText("TV Shows");
    const movieLink = screen.getByText("Movies");
    const napLink = screen.getByText("New and Popular");
    const myListLink = screen.getByText("My List");
    const kidsLink = screen.getByText("Kids");
    expect(homeLink).toBeInTheDocument();
    expect(tvLink).toBeInTheDocument();
    expect(movieLink).toBeInTheDocument();
    expect(napLink).toBeInTheDocument();
    expect(myListLink).toBeInTheDocument();
    expect(kidsLink).toBeInTheDocument();
  });

  it("Should be initialy an empty search input", () => {
    const input = screen.getByPlaceholderText("Titles, people, genres");
    expect(input).toBeInTheDocument();
    fireEvent.click(input);
    expect(input).toBeEmptyDOMElement();
  });

  it("Should be able to write in the search input", () => {
    const input = screen.getByPlaceholderText("Titles, people, genres");
    expect(input).toBeInTheDocument();
    fireEvent.click(input);
    fireEvent.change(input, { target: { value: "drame" } });
    expect(input.value).toBe("drame");
  });
});
