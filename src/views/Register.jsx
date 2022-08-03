import { React, useState } from "react";
import { XCircleIcon } from "@heroicons/react/outline";
import { useNavigate, Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Register = () => {
  const [error, setError] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = UserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password, fullName);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <div className="h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Create account
          </h2>
          {error ? (
            <div className="rounded-md bg-red-50 p-4 mt-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <XCircleIcon
                    className="h-5 w-5 text-red-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-zinc-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              action="#"
              method="POST"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white"
                >
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="fullName"
                    required
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-zinc-700 text-white border-zinc-700 block w-full pr-12 sm:text-sm rounded-md placeholder:text-zinc-500 focus:outline-none focus:ring-0 focus:border-zinc-700"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-zinc-700 text-white border-zinc-700 block w-full pr-12 sm:text-sm rounded-md placeholder:text-zinc-500 focus:outline-none focus:ring-0 focus:border-zinc-700"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-zinc-700 text-white border-zinc-700 block w-full pr-12 sm:text-sm rounded-md placeholder:text-zinc-500 focus:outline-none focus:ring-0 focus:border-zinc-700"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zinc-600 hover:bg-zinc-700 focus:outline-none focus:ring-0"
                >
                  Register
                </button>
              </div>
              <p className="py-8">
                <span className="text-gray-400">Already have account?</span>{" "}
                <Link
                  to="/login"
                  className="text-white font-bold hover:underline"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
