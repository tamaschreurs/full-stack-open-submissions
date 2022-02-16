import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../utils/queries";
import BookTable from "./BookTable";

const Books = (props) => {
  const [genre, setGenre] = useState("ALL");
  const result = useQuery(ALL_BOOKS);
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    if (result.data) {
      const books = result.data.allBooks;
      const newGenres = [];
      books.forEach((book) => {
        book.genres.forEach((genre) => {
          if (newGenres.indexOf(genre) === -1) {
            newGenres.push(genre);
          }
        });
      });
      setGenreList(newGenres);
    }
  }, [result.data]);

  if (!props.show) {
    return null;
  } else if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;

  let selectedGenre;
  let filteredBooks;
  if (genre === "ALL") {
    selectedGenre = <p>in all genres</p>;
    filteredBooks = books;
  } else {
    selectedGenre = (
      <p>
        in genre <span style={{ fontWeight: "bold" }}>{genre}</span>
      </p>
    );
    filteredBooks = books.filter((book) => {
      let includesGenre = false;
      book.genres.forEach((g) => {
        if (g === genre) {
          includesGenre = true;
          return;
        }
      });
      return includesGenre;
    });
  }

  return (
    <div>
      <h2>books</h2>
      {selectedGenre}
      <BookTable books={filteredBooks} />
      {genreList.map((genre) => {
        return (
          <button key={genre} onClick={() => setGenre(genre)}>
            {genre}
          </button>
        );
      })}
      <button onClick={() => setGenre("ALL")}>all genres</button>
    </div>
  );
};

export default Books;
