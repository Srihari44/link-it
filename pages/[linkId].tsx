import type { NextApiRequest, NextPage } from "next";
const { API_URL } = process.env;

const HashPage: NextPage = () => {
  return (
    <h3 className="font-bold text-gray-500 text-center text-2xl">
      Requested link not found
    </h3>
  );
};

export async function getServerSideProps(request: NextApiRequest) {
  const { linkId } = request.query;
  try {
    const response = await fetch(`${API_URL}/${linkId}`);
    const fullData = await response.json();
    if (fullData && fullData.full) {
      return {
        redirect: {
          destination: fullData.full,
          permanent: false,
        },
      };
    }
    return {
      props: {},
    };
  } catch (c) {
    console.log(c);
    return {
      props: {},
    };
  }
}

export default HashPage;
