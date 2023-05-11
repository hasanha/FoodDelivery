import React, { useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRef } from "react";

import NotFound from "../img/NotFound.svg";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();

  const [items, setItems] = useState([]);
  const [{ cartItems }, dispatch] = useStateValue();

  const addToCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  useEffect(() => {
    addToCart();
  }, [items]);
  return (
    <div
      ref={rowContainer}
      className={`w-full my-12 flex items-center gap-3 scroll-smooth ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="w-275 min-w-[275px] md:w-300 py-2 px-4
             md:min-w-[300px] h-[350px] my-12 backdrop-blur-lg
              bg-cardOverLay rounded-lg hover:drop-shadow-lg
               flex flex-col items-center justify-evenly relative"
          >
            <div className="w-full flex items-center justify-between hover:drop-shadow-lg">
              <motion.div
                className="w-40 -mt-8 drop-shadow-2xl h-40"
                whileHover={{ scale: 1.2 }}
              >
                <img
                  className="w-full h-full object-contain"
                  src={item?.imageURL}
                  alt={item?.title}
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md"
                onClick={() => {
                  setItems([...cartItems, item]);
                }}
              >
                <MdAddShoppingCart className="text-white" />
              </motion.div>
            </div>
            <div className="wfull flex flex-col gap-4 items-end justify-self-end">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item?.calories} Calories
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">$</span>
                  {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-460 flex flex-col items-center justify-center">
          <img classname="h-340" src={NotFound} alt="NotFound" />
          <p className="text-xl text-headingColor font-semibold my-2">
            No Items
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
