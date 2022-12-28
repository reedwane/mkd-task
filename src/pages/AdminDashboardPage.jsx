import React from "react";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import DataMap from "../components/DataMap";
import Header from "../components/Header";
import { GlobalContext, showToast } from "../globalContext";
import MkdSDK from "../utils/MkdSDK";

const AdminDashboardPage = () => {
  const sdk = new MkdSDK();
  const navigate = useNavigate();

  const { dispatch: toast } = React.useContext(GlobalContext);

  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [totalPages, setTotalPages] = React.useState();

  useEffect(() => {
    (async () => {
      try {
        showToast(toast, "Loading...");
        const data = await sdk.callRestAPI(
          { payload: {}, page, limit },
          "PAGINATE"
        );

        setData(data.list);
        setLimit(data.limit);
        setTotalPages(data.num_pages);
        toTop();
      } catch (error) {
        showToast(toast, "Unable to fetch data");
      }
    })();
  }, [page]);

  const toTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePrev = (e) => {
    e.preventDefault();
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const Dot = () => {
    return <div className="w-1 h-1 rounded-[50%] bg-link" />;
  };

  return (
    <>
      <div className="w-full flex justify-center items-center text-7xl h-screen text-gray-700 max-w-[1200px] m-auto">
        <div className="w-[90%] mx-auto h-full pb-[100px]">
          <Header />

          <div className="md:flex justify-between items-center mt-[3rem] mb-[2rem]">
            <p className="text-[40px]">Today’s leaderboard</p>
            <div className="flex items-center text-base py-[18px] px-6 gap-x-2">
              <span className="">30 May 2022</span>
              <Dot />
              <span className="bg-link px-2.5 py-1 rounded-[8px]">
                SUBMISSIONS OPEN
              </span>
              <Dot />
              <span>11:34</span>
            </div>
          </div>

          {data.length ? (
            <div>
              <DataMap data={data} />

              <div className="flex gap-4 items-center justify-center text-base m-6">
                <button
                  onClick={handlePrev}
                  className="bg-link p-2 rounded-[4px]"
                  disabled={page <= 1}
                >
                  prev
                </button>
                <button
                  onClick={handleNext}
                  className="bg-link p-2 rounded-[4px]"
                  disabled={page >= totalPages}
                >
                  next
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
