import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import "@testing-library/jest-dom";
import { store } from "../../redux/store/store";
import { Provider } from "react-redux";
import NavBarCustom from "./NavbarCustom";

beforeEach(() => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <NavBarCustom />
      </MemoryRouter>
    </Provider>
  );
});

afterEach(() => {
  render("");
});

describe("NavbarCustom page test suits", () => {
  it("should display Netflix logo", () => {
    const img = screen.getByAltText("Netflix");
    expect(img).toBeInTheDocument();
  });

  it("should display search logo", () => {
    const img = screen.getByAltText("search");
    expect(img).toBeInTheDocument();
  });

  it("should display bell logo", () => {
    const img = screen.getByAltText("notification");
    expect(img).toBeInTheDocument();
  });

  it("should display profile image", () => {
    const img = screen.getByAltText("profile");
    expect(img).toBeInTheDocument();
  });

  it("should display navbar and links", () => {
    const links = screen.getByText("Home");
    const links2 = screen.getByText("TV Shows");
    const links3 = screen.getByText("Movies");
    const links4 = screen.getByText("New & Popular");
    const links5 = screen.getByText("My List");
    const links6 = screen.getByText("Kids");

    expect(links).toBeInTheDocument();
    expect(links2).toBeInTheDocument();
    expect(links3).toBeInTheDocument();
    expect(links4).toBeInTheDocument();
    expect(links5).toBeInTheDocument();
    expect(links6).toBeInTheDocument();
  });

  it("should be an input search when clicked", () => {
    const input = screen.getByTestId("searchInput");
    expect(input).toBeInTheDocument();
    fireEvent.click(input);
    const pH = screen.getByPlaceholderText("Titles, people, genres");
    expect(pH).toBeInTheDocument();
  });

  it("should be able to write in the input search", () => {
    const input = screen.getByTestId("searchInput");
    expect(input).toBeInTheDocument();
    fireEvent.click(input);
    const pH = screen.getByPlaceholderText("Titles, people, genres");
    expect(pH).toBeInTheDocument();
    fireEvent.change(pH, { target: { value: "Action" } });
    expect(pH.value).toBe("Action");
  });
});
