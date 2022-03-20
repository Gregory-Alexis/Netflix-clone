import {
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
  render("");
});

describe("Kids page test suits", () => {
  it("should loading page before display data", async () => {
    const loading = await screen.findByTestId("loading");
    expect(loading).toBeInTheDocument();
    await waitForElementToBeRemoved(loading);
    expect(loading).not.toBeInTheDocument();
  });

  it("should display netflix logo", () => {
    const img = screen.getByAltText("Netflix");
    expect(img).toBeInTheDocument();
  });

  it("should display the link", () => {
    const homeLink = screen.getByText("Home");
    const tvLink = screen.getByText("TV Shows");
    const movieLink = screen.getByText("Movies");
    const napLink = screen.getByText("New and Popular");
    const myListLink = screen.getByText("My List");
    const kidsLink = screen.getByText("Exit Kids");
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

  it("Should be redirect correctly", async () => {
    const link = screen.getByText("Exit Kids");
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
    const loading = await screen.findByTestId("loading");
    expect(loading).toBeInTheDocument();
    await waitForElementToBeRemoved(loading);
    expect(loading).not.toBeInTheDocument();
    expect(link.href).toBe("http://localhost/home");
  });
});
