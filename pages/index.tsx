import type { NextPage } from "next";
import { FormEvent, useState } from "react";
const { API_URL } = process.env;

const Home: NextPage<{ apiUrl: string }> = (props) => {
  const [url, setUrlValue] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (url.length > 0) {
      try {
        const response = await fetch(`${props.apiUrl}/createLink`, {
          method: "post",
          body: JSON.stringify({ full: url }),
        });
        const fullData = await response.json();
        if (fullData.short) {
          setShortUrl(fullData.short);
        }
      } catch (c) {}
    }
  };
  const resultLink = props.apiUrl.split("/api")[0] + "/" + shortUrl;
  return (
    <>
      <div className="px-4 mt-4">
        <p className="text-xl font-bold text-gray-600">Welcome to Link-it!</p>
        <p className="font-bold text-gray-400">Only Link shortener you need</p>
        <form
          className="flex flex-col items-center justify-center mt-14"
          onSubmit={handleSubmit}
        >
          <label className="sr-only">Shorten your url</label>
          <input
            placeholder="Enter URL to shorten"
            type="url"
            required
            autoFocus
            value={url}
            onChange={(e) => setUrlValue(e.target.value)}
            className="text-grey-darkest rounded-md outline outline-4 outline-blue-600 p-2 w-64"
          ></input>
          {shortUrl && (
            <a
              href={"./" + shortUrl}
              className="text-xl text-blue-600 pt-5 underline"
            >
              {resultLink}
            </a>
          )}
        </form>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  return {
    props: { apiUrl: API_URL },
  };
}

export default Home;
