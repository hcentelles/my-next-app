import Head from "next/head";

export default function SSGPage({ posts }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>SSG Example</title>
      </Head>

      <h1 className="text-3xl font-bold mb-6">
        Static Site Generation Example
      </h1>

      <div className="grid gap-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-gray-600">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  // Fetch data at build time
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );
  const posts = await res.json();

  return {
    props: {
      posts,
    },
    // Revalidate every hour
    revalidate: 3600,
  };
}
