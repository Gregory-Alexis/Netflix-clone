import homeSlice, {
  setActive,
  setDisLike,
  setError,
  setFeaturedData,
  setFeaturedDetails,
  setLike,
  setLoading,
  setScrolled,
  setSearch,
  setToggle,
  setWidth,
} from "./homeSlice";
import "@testing-library/jest-dom";

describe("Home slice test suits", () => {
  it("should return the initial state", () => {
    expect(homeSlice(undefined, {})).toEqual({
      data: [],
      featuredData: [],
      loading: false,
      error: "",
      search: "",
      isInputActive: false,
      featuredDetails: false,
      isHomeScrolled: false,
      width: window.innerWidth,
      toggle: false,
      like: false,
      disLike: false,
    });
  });

  it("should handle featuredData ", () => {
    const previousState = [];
    expect(
      homeSlice(
        previousState,
        setFeaturedData([
          {
            image: "image.jpg",
            title: "Venom",
            genre: "action",
          },
        ])
      )
    ).toEqual({
      featuredData: [
        {
          image: "image.jpg",
          title: "Venom",
          genre: "action",
        },
      ],
    });
  });

  it("should handle loading ", () => {
    const previousState = false;
    expect(homeSlice(previousState, setLoading(true))).toEqual({
      loading: true,
      error: false,
    });
  });

  it("should handle error", () => {
    const previousState = "";
    expect(homeSlice(previousState, setError(true))).toEqual({
      loading: false,
      error: true,
    });
  });
  it("should handle search", () => {
    const previousState = "";
    expect(homeSlice(previousState, setSearch("Comédie"))).toEqual({
      search: "Comédie",
    });
  });

  it("should handle featuredDetails", () => {
    const previousState = false;
    expect(homeSlice(previousState, setFeaturedDetails(true))).toEqual({
      featuredDetails: true,
    });
  });
  it("should handle isHomeScrolled", () => {
    const previousState = false;
    expect(homeSlice(previousState, setScrolled(true))).toEqual({
      isHomeScrolled: true,
    });
  });
  it("should handle isInputActive", () => {
    const previousState = false;
    expect(homeSlice(previousState, setActive(true))).toEqual({
      isInputActive: true,
    });
  });

  it("should handle windows innerWidth", () => {
    const previousState = window.innerWidth;
    expect(homeSlice(previousState, setWidth(1024))).toEqual({
      width: 1024,
    });
  });
  it("should handle toggle", () => {
    const previousState = false;
    expect(homeSlice(previousState, setToggle(true))).toEqual({
      toggle: true,
    });
  });
  it("should handle like", () => {
    const previousState = false;
    expect(homeSlice(previousState, setLike(true))).toEqual({
      like: true,
    });
  });
  it("should handle dislike", () => {
    const previousState = false;
    expect(homeSlice(previousState, setDisLike(true))).toEqual({
      disLike: true,
    });
  });
});
