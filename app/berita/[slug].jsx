import { useRouter } from "next/router";

const BeritaDetail = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold capitalize">
        {slug?.replace(/-/g, " ")}
      </h1>
      <p className="mt-4 text-gray-600">
        Ini halaman detail berita dengan slug: <strong>{slug}</strong>
      </p>
    </main>
  );
};

export default BeritaDetail;
