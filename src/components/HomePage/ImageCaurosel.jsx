// REACT IMPORTS
import React, { useEffect, useState } from "react";

const ImageCarousel = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const importAll = (r) => r.keys().map(r);
    const imageFiles = importAll(
      require.context("../../images", false, /\.(png|jpe?g|svg|webp)$/)
    );
    setImages(imageFiles);
  }, []);

  return (
    <>
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {images.map((image, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              {image.startsWith("data:image") ? (
                <img
                  src={image}
                  className="d-block"
                  style={{ width: "100%", height: "90vh" }}
                  alt={`Slide ${index + 1}`}
                />
              ) : (
                <img
                  src={image}
                  className="d-block"
                  style={{ width: "100%", height: "90vh" }}
                  alt={`Slide ${index + 1}`}
                />
              )}
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default ImageCarousel;
