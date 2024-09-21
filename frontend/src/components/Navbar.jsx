import React, { useRef, useState } from "react";
import Apisummary from "../backendUrl/backendUrl";
import imageTobase64 from "./ImageToBase64";
import { toast } from "react-toastify";
import { RiMenuAddFill } from "react-icons/ri";
import { useEffect } from "react";
const Navbar = () => {
  const [openAnimal, setOpenAnimal] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [category, setCategory] = useState({});
  const [menu, setMenu] = useState(false);
  const LoadingList = new Array(12).fill(null);
  const [fetchData, setFetchData] = useState([]);
  const ref = useRef(null);
  const [data, setData] = useState({
    imageUrl: "",
    animalName: "",
  });

  //get all data
  const allCategory = async () => {
    const fetchdata = await fetch(Apisummary.allCategory.url, {
      method: Apisummary.allCategory.method,
      headers: {
        "content-type": "application/json",
      },
    });
    const responseData = await fetchdata.json();
    if (responseData.success) {
      setFetchData(responseData.data);
    }
    if (responseData.error) {
      toast.error(responseData.message);
    }
  };
  console.log("fetchData", fetchData);
  // hadleoutside click
  useEffect(() => {
    document.addEventListener("click", handleClickOutSide, true);
  }, []);

  const handleClickOutSide = (e) => {
    if (!ref.current?.contains(e.target)) {
      setOpenAnimal(false);
      setOpenCategory(false);
    }
  };

  const handleName = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleCategory = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const url = await imageTobase64(file);
    setData((prev) => {
      return { ...prev, imageUrl: url };
    });
  };

  const uploadData = async (e) => {
    e.preventDefault();
    const fetchdata = await fetch(Apisummary.upload.url, {
      method: Apisummary.upload.method,

      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await fetchdata.json();
    if (responseData.success) {
      toast.success(responseData.message);
      allCategory();
      setOpenAnimal(false);
    }
    if (responseData.error) {
      toast.error(responseData.message);
    }
  };
  const uploadCategory = async (e) => {
    e.preventDefault();
    const fetchdata = await fetch(Apisummary.addCategory.url, {
      method: Apisummary.addCategory.method,

      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(category),
    });
    const responseData = await fetchdata.json();
    if (responseData.success) {
      toast.success(responseData.message);
      setOpenCategory(false);
    }
    if (responseData.error) {
      toast.error(responseData.message);
    }
  };

  useEffect(() => {
    allCategory();
  }, []);
  return (
    <div className=" px-4 md:px-8 lg:px-16 2xl:px-32 ">
      <div className="flex justify-between   gap-8 pt-10">
        <ul className="hidden lg:flex gap-4">
          <li className="px-6 py-2 text-xl text-green-300 ring-1 ring-green-300 rounded-full">
            Land Animal
          </li>
          <li className="px-6 py-2 text-xl text-green-300 ring-1 ring-green-300 rounded-full">
            Bird
          </li>
          <li className="px-6 py-2 text-xl text-green-300 ring-1 ring-green-300 rounded-full">
            Fish
          </li>
          <li className="px-6 py-2 text-xl text-green-300 ring-1 ring-green-300 rounded-full">
            Insect
          </li>
        </ul>
        <div className=" lg:hidden relative">
          <span
            onClick={() => {
              setMenu((pre) => !pre);
            }}
            className="text-3xl text-white cursor-pointer"
          >
            <RiMenuAddFill />
          </span>
          {menu && (
            <ul className="w-60 px-4 py-8  bg-white rounded-md flex flex-col gap-4 absolute left-0 top-12   text-xl text-black ">
              <li className="px-6 py-2  ring-1 ring-black cursor-pointer rounded-full">
                Land Animal
              </li>
              <li className="px-6 py-2  ring-1 ring-black cursor-pointer rounded-full">
                Bird
              </li>
              <li className="px-6 py-2  ring-1 ring-black cursor-pointer rounded-full">
                Fish
              </li>
              <li className="px-6 py-2  ring-1 ring-black cursor-pointer rounded-full">
                Insect
              </li>
            </ul>
          )}
        </div>
        <div className="flex  gap-4">
          <button
            onClick={() => {
              setOpenAnimal(true);
            }}
            className="px-2 py-1 md:px-6 md:py-2 text-xm md:text-xl text-white ring-1 ring-white rounded-full"
          >
            Add Animal
          </button>
          <button
            onClick={() => {
              setOpenCategory(true);
            }}
            className="px-2 py-1 md:px-6 md:py-2  text-xm md:text-xl text-white ring-1 ring-white rounded-full"
          >
            Add Category
          </button>
        </div>
      </div>

      <div className="w-full flex items-center justify-center flex-wrap gap-10 py-10">
        {fetchData.length === 0
          ? LoadingList.map((el, i) => {
              return (
                <div
                  key={i}
                  className="w-[160px] flex flex-col items-center gap-2"
                >
                  <div className="w-full h-[191px] bg-slate-200 rounded animate-pulse"></div>
                  <h2 className="p-1 w-full rounded  bg-slate-200 animate-pulse"></h2>
                </div>
              );
            })
          : fetchData.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-[160px] flex flex-col items-center gap-2"
                >
                  <div className="w-full h-[191px]">
                    <img
                      className="w-full h-full object-scale-down  rounded-lg border
                       border-[#141414] bg-[#050505]"
                      src={item.imageUrl}
                      alt=""
                    />
                  </div>
                  <h2 className=" uppercase  text-white">{item.animalName}</h2>
                </div>
              );
            })}
      </div>
      {openAnimal && (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center w-full h-full  bg-black bg-opacity-70">
          <form
            onSubmit={uploadData}
            ref={ref}
            className="w-[360px] bg-white flex flex-col rounded-3xl px-6 py-8 gap-5"
          >
            <h2 className=" capitalize text-lg font-medium">add animal</h2>
            <input
              onChange={handleName}
              className="px-4 py-3 rounded-md outline-none bg-[#F2F2F2] placeholder-black placeholder:text-lg"
              type="text"
              name="animalName"
              value={data.value}
              placeholder="Animal Name"
              required
            />
            <label className="w-full" htmlFor="uploadAnimal">
              <div className="w-full bg-[#F2F2F2] flex justify-between p-2 rounded-md">
                <h2 className="capitalize text-lg font-medium px-4">image</h2>
                <div className=" flex items-center justify-center px-2 py-1 rounded-md  bg-gray-300 cursor-pointer">
                  upload
                </div>
                <input
                  onChange={handleImage}
                  id="uploadAnimal"
                  type="file"
                  hidden
                  required
                />
              </div>
            </label>
            <button
              type="search"
              className="capitalize px-4 py-2 text-lg font-medium text-white rounded-md bg-black tracking-wide"
            >
              create animal
            </button>
          </form>
        </div>
      )}
      {openCategory && (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center w-full h-full  bg-black bg-opacity-70">
          <form
            onSubmit={uploadCategory}
            ref={ref}
            className="w-[360px] bg-white flex flex-col rounded-3xl px-6 py-8 gap-5"
          >
            <h2 className=" capitalize text-lg font-medium">add category</h2>
            <input
              onChange={handleCategory}
              className="px-4 py-3 rounded-md outline-none bg-[#F2F2F2] placeholder-black placeholder:text-lg"
              type="text"
              value={category.value}
              name="category"
              required
              placeholder="Category Name"
            />

            <button
              type="text"
              className="capitalize px-4 py-2 text-lg font-medium text-white rounded-md bg-black tracking-wide"
            >
              save
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Navbar;
