import BookCard from "@/components/BookCard";

export default async function Home() {
  const books = await fetch("http://localhost:3000/api/books/")
    .then((response) => response.json())
    .catch((error) => {
      console.log("failed to get books", error);
    });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Books
      <section className="flex flex-col items-center justify-center gap-2">
        {books &&
          books.map((book) => (
            <BookCard 
              key={book.id}
              book={book}
            />
          ))}
      </section>
    </main>
  );
}
