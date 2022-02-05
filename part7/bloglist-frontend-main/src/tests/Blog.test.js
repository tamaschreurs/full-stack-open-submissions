import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "../components/Blog";

const blog = {
  title: "A blog with a title",
  author: "Muhammad Aziz",
  url: "example.com",
  likes: 5,
};

test("renders minimal view at startup", () => {
  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent(
    "A blog with a title Muhammad Aziz"
  );

  expect(component.container).not.toHaveTextContent("example.com");
  expect(component.container).not.toHaveTextContent("5");
});

test("renders complete view when view button is clicked", () => {
  const component = render(<Blog blog={blog} />);
  const button = component.getByText("view");

  fireEvent.click(button);

  expect(component.container).toHaveTextContent(
    "A blog with a title Muhammad Aziz"
  );
  expect(component.container).toHaveTextContent("example.com");
  expect(component.container).toHaveTextContent("5");
});

test("call handleLike twice when like button is clicked twice", () => {
  const mockHandler = jest.fn();
  const component = render(<Blog blog={blog} handleLike={mockHandler} />);
  const viewButton = component.getByText("view");
  fireEvent.click(viewButton);

  const likeButton = component.container.querySelector(".like");
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
