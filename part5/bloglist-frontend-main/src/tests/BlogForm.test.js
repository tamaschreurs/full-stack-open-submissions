import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "../components/BlogForm";

const blog = {
  title: "A blog with a title",
  author: "Muhammad Aziz",
  url: "example.com",
  likes: 5,
};

test("correct info is past on to addBlog prop", () => {
  const mockHandler = jest.fn();
  const component = render(<BlogForm addBlog={mockHandler} />);

  const form = component.container.querySelector("form");
  const titleEl = component.container.querySelector("#title");
  const authorEl = component.container.querySelector("#author");
  const urlEl = component.container.querySelector("#url");
  fireEvent.change(titleEl, { target: { value: "New blog title" } });
  fireEvent.change(authorEl, { target: { value: "New author" } });
  fireEvent.change(urlEl, { target: { value: "example.com" } });
  fireEvent.submit(form);

  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler.mock.calls[0][0]).toEqual({
    title: "New blog title",
    author: "New author",
    url: "example.com",
  });
});
