const DataMap = ({ data }) => {
  return (
    <>
      <div className="hidden md:flex gap-x-8 w-full items-center text-base mb-4">
        <span className="w-[5%]">#</span>
        <span className="w-[57%]">Title</span>
        <span className="w-[10%] ">Author</span>
        <span className="w-[10%] text-right">Likes</span>
      </div>
      {data?.map((entry, i) => (
        <div
          key={entry.id}
          className="md:h-[150px] w-full flex flex-col md:flex-row gap-x-8 items-center text-base md:text-[14px] mb-4 border-2 rounded-[24px] p-4 overflow-hidden"
        >
          <span className="w-[5%] hidden md:block">{i + 1}</span>
          <span className="w-[200px] h-[150px] rounded-[8px] mb-4 md:mb-0 md:w-[15%] md:h-[100px] overflow-hidden ">
            <img
              src={entry.photo}
              alt={`${entry.username} photo`}
              className="object-cover"
            />
          </span>
          <span className="w-[40%] text-[20px] text-center md:text-left">
            {entry.title}
          </span>

          <span className="block md:hidden">Author: {entry.username}</span>
          <span className="hidden md:inline w-[10%] text-[20px]">
            {entry.username}
          </span>

          <span className="block md:hidden">Likes: {entry.like}</span>
          <span className="hidden md:block w-[10%] text-right">
            {entry.like}
          </span>
        </div>
      ))}
    </>
  );
};

export default DataMap;
