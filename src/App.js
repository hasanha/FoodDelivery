import React from "react";
import Header from "./components/Header";
import { AnimatePresence } from "framer-motion";
import { Routes, Route } from "react-router-dom";
import { AboutUs, CreateContainer, MainContainer } from "./components";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { useEffect } from "react";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";

const App = () => {
  const [{ foodItems }, dispatch] = useStateValue();
  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <AnimatePresence mode="wait">
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />
        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createitem" element={<CreateContainer />} />
            <Route path="/About" element={<AboutUs />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
