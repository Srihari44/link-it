import type { NextPage } from "next";
import Link from "next/link";
const { API_URL } = process.env;

const ViewLinksPage: NextPage<{
  apiUrl: string;
  data: Array<{ full: string; short: string; clicks: number }>;
  error?: string;
}> = (props) => {
  const { data, error, apiUrl } = props;
  if (error) {
    return (
      <h3 className="font-bold text-gray-500 text-center text-2xl mt-8">
        Something went wrong! Please try again
      </h3>
    );
  }
  return (
    <>
      {data.length > 0 ? (
        <>
          <h3 className="font-bold text-gray-500 text-center text-2xl mb-6 mt-4">
            Generated links
          </h3>
          {data.map((item, index: number) => (
            <div
              key={index}
              className="font-bold text-gray-600 flex w-100 border-4 px-1 py-3 rounded justify-around mb-2"
            >
              <div>
                <br />
                <p>Full link: </p>
                <p>Short link: </p>
              </div>
              <div>
                <p className="text-end">
                  Hits: <span className="text-blue-600">{item.clicks}</span>
                </p>
                <p className="text-blue-600">{item.full}</p>
                <p className="text-blue-600">
                  <Link href={"./" + item.short}>
                    {apiUrl.split("/api")[0] + "/" + item.short}
                  </Link>
                </p>
              </div>
            </div>
          ))}
        </>
      ) : (
        <h3 className="font-bold text-gray-500 text-center text-2xl mt-8">
          No short links created
        </h3>
      )}
    </>
  );
};

export async function getServerSideProps() {
  try {
    const response = await fetch(`${API_URL}/getLinks`);
    const fullData = await response.json();
    if (fullData && Array.isArray(fullData)) {
      return {
        props: { data: fullData, error: false, apiUrl: API_URL },
      };
    }
    return {
      props: { error: true },
    };
  } catch (c) {
    console.log(c);
    return { props: { error: true } };
  }
}

export default ViewLinksPage;
