import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks, setSortBy, setOrder } from "../redux/bookSlice";

export default function BooksList() {
  const dispatch = useDispatch();
  const { list, loading, error, sortBy, order } = useSelector((state) => state.books);




  const sampleTitles = [
  "The Silent Patient", "Where the Crawdads Sing", "The Midnight Library",
  "Project Hail Mary", "The Great Alone", "Dune", "The Night Circus",
  "Circe", "Normal People", "Little Fires Everywhere"
];

const sampleAuthors = [
  "Alex Michaelides", "Delia Owens", "Matt Haig", "Andy Weir",
  "Kristin Hannah", "Frank Herbert", "Erin Morgenstern",
  "Madeline Miller", "Sally Rooney", "Celeste Ng"
];

const samplePublishers = [
  "Penguin Random House", "HarperCollins", "Simon & Schuster",
  "Macmillan", "Hachette", "Scribner", "Bloomsbury"
];

const dummyBooks = Array.from({ length: 15 }, (_, i) => ({
  title: sampleTitles[i % sampleTitles.length],
  author: sampleAuthors[i % sampleAuthors.length],
  publisher: samplePublishers[i % samplePublishers.length],
  isbn: `978-0000000${i + 1}`
}));

const displayList = list.length > 0 ? list : dummyBooks;

  // const dummyBooks = Array.from({ length: 20 }, (_, i) => ({
  //   title: `Book Title ${i + 1}`,
  //   author: `Author ${i + 1}`,
  //   publisher: `Publisher ${i + 1}`,
  //   isbn: `ISBN${i + 1}`
  // }));

  // const displayList = list.length > 0 ? list : dummyBooks;


  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const sortedList = [...displayList].sort((a, b) => {
    let fieldA = a[sortBy]?.toLowerCase() || "";
    let fieldB = b[sortBy]?.toLowerCase() || "";
    if (fieldA < fieldB) return order === "asc" ? -1 : 1;
    if (fieldA > fieldB) return order === "asc" ? 1 : -1;
    return 0;
  });

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="page">
      <h1>Books List</h1>

      <div style={{ marginBottom: "10px" }}>
        <label>
          Sort by:{" "}
          <select value={sortBy} onChange={(e) => dispatch(setSortBy(e.target.value))}>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="publisher">Publisher</option>
          </select>
        </label>

        <label style={{ marginLeft: "10px" }}>
          Order:{" "}
          <select value={order} onChange={(e) => dispatch(setOrder(e.target.value))}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
        
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Title</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Author</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Publisher</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>ISBN</th>
          </tr>
        </thead>
        <tbody>
          {sortedList.map((book, idx) => (
            <tr key={idx}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{book.title}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{book.author}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{book.publisher}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{book.isbn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}