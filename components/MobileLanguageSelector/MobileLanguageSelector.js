import React, { useState } from "react";
import classes from "./MobileLanguageSelector.module.css";
import { useAppContext } from "../../context/state";

const MobileLanguageSelector = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [language, setLanguage] = useAppContext();

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    // console.log("JEZIK JE "+value)
    switch (value) {
      case "English":
        setLanguage("en_us");
        break;
        case "Српски":
        setLanguage("sr_sr");
        break;
      default:
        setLanguage("sr_rs");
        break;
    }
    setIsOpen(false);
  };

  return (
    <div className={classes.main}>
     <div className={classes.dropdownContainer}>
        <div className={classes.dropdownHeader} onClick={toggling}>
          <button className={classes["language-button"] + " button-primary"}>
            <span className={"button-span-1"}>
              {selectedOption || (language === "en_us" ? "English" : language === "sr_rs" ? "Српски" : "Srpski")}
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
export default MobileLanguageSelector;
