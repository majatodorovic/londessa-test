"use client"
import React, { useState } from "react";
import { useAppContext } from "../../context/state";
import classes from "./LanguageSelector.module.css";

const LanguageSelector = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useAppContext();
  const [selectedOption, setSelectedOption] = useState(language === 'en-us' ? "English" : language === "sr_rs" ? "Српски" : "Srpski");

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    switch (value) {
      case "English":
        setLanguage('en_us');
        break;
      case "Srpski":
        setLanguage('sr_sr');
        break;
        case "Српски":
        setLanguage('sr_rs');
        break;
    }
    setIsOpen(false);
  };

  return (
    <div className="h-[40px] w-[200px] cursor-pointer">
      <div className={classes.dropdownContainer}>
        <div className={classes.dropdownHeader} onClick={toggling}>
          <button className={classes["language-button"] + " button-primary"}>
            <span className={"button-span-1"}>
              {language === 'en_us' ? "English" : language === "sr_rs" ? "Српски" : "Srpski" }
            </span>
            <span className={classes["globe-span"] + " button-span-2 bs2-40"}>
              <img src={"/icons/globe.png"} alt="earth" />
            </span>
          </button>
        </div>
        {isOpen && (
          <div className={classes.dropdownListContainer}>
            <ul className={classes.dropdownList}>
              {options.map((option) => (
                <li className={classes.listItem} onClick={onOptionClicked(option)} key={Math.random()}>
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default LanguageSelector;
