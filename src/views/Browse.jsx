import React, { useState, Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useGenresQuery, useSearchQuery } from "../services/rawgApi";
import GameItem from "../components/GameItem";
import { DebounceInput } from "react-debounce-input";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

import { Disclosure, Listbox, Transition } from "@headlessui/react";
import { ChevronUpIcon, CheckIcon, SelectorIcon } from "@heroicons/react/solid";

const orderBy = [
  { id: 1, name: "None", value: "" },
  { id: 2, name: "Name", value: "name" },
  { id: 3, name: "Released", value: "released" },
  { id: 4, name: "Added", value: "added" },
  { id: 5, name: "Created", value: "created" },
  { id: 6, name: "Update", value: "updated" },
  { id: 7, name: "Average Rating", value: "rating" },
];

const Browse = () => {
  const [isFilterSelected] = useState(false);
  const [isSelected, setSelected] = useState(orderBy[2]);
  const [isSearch, setIsSearch] = useState(null);

  console.log("isSelected: ", isSelected.value);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const { data, error, isLoading } = useGenresQuery();
  const {
    data: searchData,
    error: searchError,
    isLoading: searchLoading,
    isFetching: searchFetching,
  } = useSearchQuery({
    query: isSearch,
    ordering: isSelected.value,
  });

  return (
    <div className="max-w-[1760px] mx-auto sm:px-6 lg:px-8 my-10">
      <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
        <div className="flex-1 gap-x-4 relative z-0 flex overflow-hidden">
          <main className="flex-1 w-3/4 relative z-0 overflow-y-auto focus:outline-none">
            {/* Start main area*/}
            <Outlet />
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl text-white font-bold">
                Search Your Game
              </h1>
              <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                <Listbox value={isSelected} onChange={setSelected}>
                  {({ open }) => (
                    <>
                      <div className="mt-1 relative">
                        <Listbox.Button className="relative w-full bg-zinc-800 text-white rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-0 sm:text-sm">
                          <span className="block truncate">
                            Ordered By:{" "}
                            <span className="font-bold">{isSelected.name}</span>
                          </span>
                          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <SelectorIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Listbox.Options className="absolute z-10 mt-1 w-full backdrop-blur bg-white/50 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                            {orderBy.map((order) => (
                              <Listbox.Option
                                key={order.id}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? "text-white bg-zinc-600"
                                      : "text-zinc-900",
                                    "cursor-pointer select-none relative py-2 pl-8 pr-4"
                                  )
                                }
                                value={order}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={classNames(
                                        selected
                                          ? "font-semibold"
                                          : "font-normal",
                                        "block truncate"
                                      )}
                                    >
                                      {order.name}
                                    </span>

                                    {selected ? (
                                      <span
                                        className={classNames(
                                          active ? "text-white" : "text-white",
                                          "absolute inset-y-0 left-0 flex items-center pl-1.5"
                                        )}
                                      >
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
              </div>
            </div>

            <div className="grid my-4 sm:my-8 grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {searchError ? (
                <div>Error...</div>
              ) : searchLoading ? (
                <Loading />
              ) : searchFetching ? (
                <div className="text-white text-3xl">Fetching...</div>
              ) : (
                searchData?.results?.map((game) => (
                  <Link to={`/game/${game.slug}`}>
                    <GameItem key={game.id} gameItem={game} />
                  </Link>
                ))
              )}
            </div>
            {/* End main area */}
          </main>
          <aside className="hidden space-y-4 relative sm:flex sm:flex-col flex-shrink-0 w-1/4 overflow-y-auto">
            <div className="py-5 inline-flex justify-between">
              <h3 className="text-lg leading-6 font-medium text-white">
                Filters
              </h3>
              <button className="mt-1 max-w-2xl text-sm text-gray-500 hover:text-white">
                Reset
              </button>
            </div>
            <div className="mt-1 relative flex items-center">
              {/* <input
                type="text"
                name="search"
                id="search"
                placeholder="Search"
                value={isSearch}
                onChange={(e) => setIsSearch(e.target.value)}
                className="bg-zinc-800 text-white border-zinc-700 block w-full pr-12 sm:text-sm rounded-md placeholder:text-zinc-500 focus:outline-none focus:ring-0 focus:border-zinc-700"
              /> */}
              <DebounceInput
                minLength={2}
                debounceTimeout={300}
                placeholder="Search"
                value={isSearch}
                onChange={(e) => setIsSearch(e.target.value)}
                className="bg-zinc-800 text-white border-zinc-700 block w-full pr-12 sm:text-sm rounded-md placeholder:text-zinc-500 focus:outline-none focus:ring-0 focus:border-zinc-700"
              />
              <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <kbd className="inline-flex items-center border border-zinc-700 rounded px-2 text-sm font-sans font-medium text-zinc-500">
                  ⌘K
                </kbd>
              </div>
            </div>
            {/* Start secondary column (hidden on smaller screens) */}
            <div className="w-full">
              <div className="mx-auto w-full max-w-md border-y-2 border-zinc-800">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-6 text-left text-sm font-medium text-zinc-500 hover:text-white focus:outline-none">
                        <span>Genre</span>
                        <ChevronUpIcon
                          className={`${
                            open ? "rotate-180 transform" : ""
                          } h-5 w-5`}
                        />
                      </Disclosure.Button>
                      {error ? (
                        <div>Error: {error.message}</div>
                      ) : isLoading ? (
                        <Loading />
                      ) : (
                        <Disclosure.Panel>
                          <div className="flex flex-col pl-4 border-l-2 border-zinc-800">
                            {data?.results?.map((genre) => (
                              <button
                                className={classNames(
                                  isFilterSelected
                                    ? "bg-purple-100"
                                    : "text-left rounded hover:bg-zinc-800 px-4 py-3 text-sm text-zinc-500"
                                )}
                                key={genre.id}
                              >
                                {genre.name}
                              </button>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      )}
                    </>
                  )}
                </Disclosure>
              </div>
            </div>
            {/* End secondary column */}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Browse;
