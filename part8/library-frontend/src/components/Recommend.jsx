import { useLazyQuery, useQuery } from "@apollo/client";
import React from "react";
import { useEffect } from "react";
import { BOOKS_BY_GENRE, ME } from "../utils/queries";
import BookTable from "./BookTable";

const Recommend = ({ show }) => {
  const genreResult = useQuery(ME);
  const [getBooks, bookResult] = useLazyQuery(BOOKS_BY_GENRE);
  useEffect(() => {
    if (genreResult.data) {
      const favGenre = genreResult.data.me.favoriteGenre;
      getBooks({ variables: { genre: favGenre } });
    }
  }, [genreResult.data, getBooks]);

  if (!show) {
    return null;
  }
  if (genreResult.loading) {
    return <div>loading...</div>;
  }

  const favGenre = genreResult.data.me.favoriteGenre;

  if (bookResult.loading) {
    return <div>loading books...</div>;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favourite genre{" "}
        <span style={{ fontWeight: "bold" }}>{favGenre}</span>
      </p>
      <BookTable books={bookResult.data.allBooks} />
    </div>
  );
};

export default Recommend;
