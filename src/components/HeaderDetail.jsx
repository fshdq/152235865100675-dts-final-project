import React from "react";

const HeaderDetail = ({ data }) => {
  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="flex-1 min-w-0">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl md:text-6xl">
          {data?.name}
        </h1>
        <div className="pt-2 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-4">
          <div className="flex gap-x-2 items-center text-sm text-gray-500">
            {data?.parent_platforms?.map((platform) => (
              <span
                key={platform.platform.id}
                className="flex justify-center h-8 bg-slate-700 p-2 rounded-full"
              >
                <img
                  src={require(`../assets/${platform.platform.id}.svg`)}
                  alt={platform.platform.name}
                  className="rounded text-gray-500"
                />
              </span>
            ))}
          </div>
          <div className="flex justify-center gap-x-2 h-8 bg-slate-700 p-2 rounded-full items-center text-sm text-gray-500">
            {data?.genres?.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-5 flex lg:mt-0 lg:ml-4">
        <div className="flex flex-col bg-black text-white rounded p-1.5 items-center">
          <p className=" text-base tracking-widest">Rating</p>
          <span className="text-3xl font-bold">{data?.rating}</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderDetail;
