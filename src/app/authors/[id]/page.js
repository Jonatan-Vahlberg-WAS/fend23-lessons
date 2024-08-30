import AuthorCard from "@/components/AuthorCard";

export default async function AuthorDetailPage(props) {
    const id = props.params.id
    const author = await fetch(`http://localhost:3000/api/authors/${id}`)
    .then((response) => response.json())
    .catch((error) => {
        console.log("failed to get books", error);
    });
    console.log("author", author)
  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
        <AuthorCard
            author={author}
        />
    </main>
  );
}
