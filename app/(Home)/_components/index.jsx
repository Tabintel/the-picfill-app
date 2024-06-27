"use client";
import React, { useState, useCallback } from "react";
import Image from "next/image";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { CiImageOn } from "react-icons/ci";
import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";
import Loader from "@/components/loader";
const MainContent = () => {
  const [image, setImage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  // let loading = false;
  const tempKey = process.env.NEXT_PUBLIC_PIXLAB_API_KEY;
  const handleUpload = useCallback(
    (result) => {
      setImage(result.info?.secure_url);
    },
    [setImage]
  );

  const handleTextImage = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/nswft", {
        img: image,
        key: tempKey,
      });
      setResult(data);
      toast.success("Image test successfull!!");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  return (
    <div className="flex flex-col relative w-full gap-4">
      {loading && <Loader />}
      <div className="w-full h-[100vh] flex items-center justify-center gap-8">
        <div className="w-[90%] md:w-[500px] max-w-custom_1 mx-auto flex items-start justify-center flex-col gap-8">
          <h2 className="text-4xl md:text-5xl font-booking_font4 text-dark">
            PicFil
            <span className="text-sm block font-booking_font text-start">
              NSFW image filter, powered by PixLab API
            </span>
          </h2>
          {/* <Image */}

          {image !== "" && result ? (
            <div className="w-full">
              {result?.score === 1 ? (
                <Image
                  alt="Cotion"
                  width={0}
                  sizes="100vw"
                  height={0}
                  loading="lazy"
                  src={image}
                  // blurDataURL={image | ""}
                  className="h-[250px] w-full md:mx-auto object-cover"
                />
              ) : (
                <Image
                  alt="Cotion"
                  width={0}
                  sizes="100vw"
                  height={0}
                  loading="lazy"
                  style={{ filter: "blur(10px" }}
                  src={image}
                  className="h-[250px] w-full md:mx-auto object-cover"
                />
              )}
            </div>
          ) : (
            <>
              {image ? (
                <Image
                  alt="Cotion"
                  width={0}
                  sizes="100vw"
                  height={0}
                  loading="lazy"
                  src={image}
                  // blurDataURL={image | ""}
                  className="h-[250px] w-full md:mx-auto object-cover"
                />
              ) : (
                <CldUploadWidget
                  multiple
                  onSuccess={handleUpload}
                  uploadPreset="dl93zl9fn"
                  folder="uploads"
                  sources={["local", "url", "camera"]}
                >
                  {({ open }) => {
                    return (
                      <div
                        className="w-full cursor-pointer border-dotted px-4  md:px-8 border-4 border-[rgba(0,0,0,.2)] h-[250px] flex flex-col gap-4 items-center justify-center
          "
                        onClick={() => open()}
                      >
                        <CiImageOn fontSize={"38px"} />
                        <span className="text-sm text-center">
                          Upload a fileNo file chosen or drag and drop PNG, JPG,
                          GIF up to 10MB
                        </span>
                      </div>
                    );
                  }}
                </CldUploadWidget>
              )}
            </>
          )}
          {result && image !== "" && (
            <div className="w-full">
              <h2 className="text-2xl font-booking_font4 text-dark">
                <span className="font-booking_font text-base">Your Score:</span>{" "}
                <span>{result?.score}</span>
              </h2>
            </div>
          )}
          <div className="flex w-full flex-col sm:flex-row items-center gap-4 justify-between">
            <input
              className="h-[80px] input border w-full"
              onChange={(e) => {
                setResult(null);
                setImage(e.target.value);
              }}
              type="text"
              name={"image"}
              value={image}
              placeholder="Enter you Image Url Here"
            />
            <button
              disabled={image === ""}
              onClick={handleTextImage}
              className="w-full font-bold md:w-[250px] h-[55px] rounded-[10px] text-white btn btn-1"
            >
              {loading ? (
                <span className="flex justify-center items-center gap-2">
                  <ThreeDots
                    height="25"
                    width="25"
                    radius="10"
                    color={"#fff"}
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                  />
                  Uploading
                </span>
              ) : (
                "Check Image"
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full sticky bottom-0 py-4 bg-[#000] text-sm text-white flex items-center justify-center">
        © 2024 PicFil. All rights reserved.
      </div>
    </div>
  );
};

export default MainContent;
