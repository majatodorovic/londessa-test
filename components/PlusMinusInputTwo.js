const PlusMinusInputTwo = ({ className, amount, setCount }) => {
  // If minus is clicked
  const onMinusHandler = (e) => {
    e.preventDefault();
    if (amount !== 1) setCount((prev) => prev - 1);
    if (amount === "") setCount(1);
  };

  // If plus is clicked
  const onPlusHandler = (e) => {
    e.preventDefault();
    if (amount === "") setCount(1);
    else setCount((prev) => prev + 1);
  };

  // If value is typed in
  const onInputChange = (e) => {
    if (!isNaN(e.target.value)) {
      if (+e.target.value < 1) setCount("");
      else setCount(+e.target.value);
    }
  };

  return (
    <div className="bg-croonus-3 py-1 px-3 rounded-2xl">
      <div className=" flex items-center">
        <span className="cursor-pointer text-lg select-none" onClick={onMinusHandler}>&lt;</span>

        <input
          maxLength="2"
          type="number"
          value={amount}
          onChange={onInputChange}
          className="h-7 w-12 3xl:w-20 text-center bg-croonus-3 focus:border-none focus:outline-none focus:ring-0 select-none font-bold border-none"
        ></input>
        <span className="cursor-pointer text-lg select-none" onClick={onPlusHandler}>&gt;</span>

      </div>
    </div>
  );
};

export default PlusMinusInputTwo;
