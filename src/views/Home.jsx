import React from "react";
import GameList from "../components/GameList";

const Home = () => {
  return (
    <div className="max-w-[1760px] mx-auto sm:px-6 lg:px-8 my-10">
      <div className="py-16">
        <div className="px-6 text-white">
          <div className="mb-12 space-y-2">
            <h2 className="text-2xl font-bold md:text-4xl">New and Popular</h2>
          </div>
          <GameList />
        </div>
      </div>
    </div>
  );
};

export default Home;
