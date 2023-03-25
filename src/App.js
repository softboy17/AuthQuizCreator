import React from 'react';
import Auth from "./components/Auth/Auth";
import QuizCreator from "./components/QuizCreator/QuizCreator";
import {motion} from "framer-motion";
import {useRef} from "react";
import "./App.css"


const App = () => {
    const constraintsRef = useRef(null)
  return (
    <div ref={constraintsRef} className='App'>
        <motion.div ref={constraintsRef} drag dragConstraints = {constraintsRef} className='container'>
        <div>
        <Auth/>
        <QuizCreator/>
        </div>
        </motion.div>
   </div>
  );
  }
  
  export default App;
  
  
  