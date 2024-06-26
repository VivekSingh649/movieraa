import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_KEY, BASE_URL } from "../config/constant";

const Thumbnail = ({ thumbnail }) => {
  const [trailers, setTrailers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const res = await fetch(`${BASE_URL}/${id}/videos?${API_KEY}`);
        const data = await res.json();
        setTrailers(data.results.slice(0, 1));
      } catch (error) {
        console.log("Thumbnail:", error);
      }
    };

    fetchTrailer();
  }, [id]);

  return (
    <div className="thumbnail mt-24 lg:mt-0">
      <button
        onClick={() => navigate(-1)}
        className="backdrop-blur-sm bg-slate-700/60 text-white cursor-pointer p-2 rounded-sm mb-4 text-sm block md:hidden"
      >
        <i className="bi bi-chevron-left"></i> Go Back
      </button>
      <div className="relative">
        <div className="overflow-hidden rounded-xl">
          <img
            className="w-full object-cover h-[225px] md:h-[500px]"
            src={thumbnail}
            alt=""
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            className="flex items-center gap-2 mt-8"
            onClick={() => setIsOpen(true)}
          >
            <div className="inline-flex justify-center items-center w-14 h-14 text-white bg-primary-600 rounded-full">
              <i className="bi bi-play-fill text-3xl"></i>
            </div>
          </button>

          {isOpen && (
            <div
              className="bg-black/80 fixed inset-0 h-screen z-50"
              onClick={() => setIsOpen(false)}
            >
              {trailers.map((trailerItem) => (
                <div
                  key={trailerItem.id}
                  className="container flex h-full items-center justify-center"
                >
                  <iframe
                    width="80%"
                    height="90%"
                    src={`https://www.youtube.com/embed/${trailerItem.key}`}
                    title={trailerItem.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;
