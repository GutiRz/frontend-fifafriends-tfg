import React from "react";
import { Shell } from "../components/Shell";

export const Live = () => {
  return (
    <Shell>
      <div className="mt-12 ">
        <h2 className="text-4xl font-semibold text-gray-700 mt-5 mb-3">
          Partidos en directo
        </h2>
        <iframe
          width="960"
          height="540"
          src="https://www.youtube.com/embed/JMMsnJcwnoE"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </Shell>
  );
};
