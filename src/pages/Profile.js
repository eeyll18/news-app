import React from "react";
import { useAuth } from "../contexts/AuthContext";
import ChangePassword from "../components/ChangePassword";

export default function Profile() {
  const { currentUser } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full  p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Profile</h2>
        {currentUser ? (
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <svg
                class="absolute w-12 h-12 text-gray-400 -left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="font-medium ">
              <div>{currentUser.email}</div>
              <div className="text-sm text-gray-500 ">
                Joined in: {currentUser.metadata.creationTime}
              </div>
            </div>
            <ChangePassword />
          </div>
        ) : (
          <p className="text-center">You are not logged in.</p>
        )}
      </div>
    </div>
  );
}
