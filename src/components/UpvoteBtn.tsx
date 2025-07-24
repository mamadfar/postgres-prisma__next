"use client";

import { useState } from "react";

const UpvoteBtn = () => {
  const [upvoteCount, setUpvoteCount] = useState(0);

  return (
    <div>
      <button
        onClick={() => setUpvoteCount(upvoteCount + 1)}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-arrow-up"
          viewBox="0 0 16 16"
        >
          <path d="M8 0l5.5 5.5h-3v6h-5v-6h-3l5.5-5.5z" />
        </svg>
        <span>Upvote {upvoteCount}</span>
      </button>
    </div>
  );
};

export default UpvoteBtn;
