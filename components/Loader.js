const Loading = () => {
  return (
    <>
      <div
        className={`grid grid-cols-4 gap-10 relative max-md:w-[95%] max-md:mx-auto md:mx-[5rem] mt-[9rem] md:gap-x-[4rem] max-md:mt-[1rem]`}
      >
        <div className={`col-span-2 max-md:col-span-4 w-full`}>
          <div className={`flex flex-row gap-5`}>
            <div className={`flex max-md:hidden flex-col gap-5`}>
              <div
                className={`w-[160px] h-[160px] animate-pulse bg-slate-300`}
              ></div>
              <div
                className={`w-[160px] h-[160px] animate-pulse bg-slate-300`}
              ></div>
              <div
                className={`w-[160px] h-[160px] animate-pulse bg-slate-300`}
              ></div>
              <div
                className={`w-[160px] h-[160px] animate-pulse bg-slate-300`}
              ></div>
            </div>
            <div
              className={`w-full max-md:flex-1 max-md:h-[450px] h-[815px] bg-slate-300 animate-pulse`}
            ></div>
          </div>
        </div>
        <div className={`col-span-2 max-md:col-span-4 w-full`}>
          <div className={`h-[50px] animate-pulse bg-slate-300 w-full`}></div>
          <div
            className={`h-[50px] animate-pulse bg-slate-300 w-full mt-5`}
          ></div>
          <div
            className={`h-[50px] animate-pulse bg-slate-300 w-full mt-5`}
          ></div>
          <div
            className={`h-[150px] animate-pulse bg-slate-300 w-full mt-10`}
          ></div>{" "}
          <div
            className={`h-[50px] animate-pulse bg-slate-300 w-full mt-5`}
          ></div>
          <div
            className={`h-[50px] animate-pulse bg-slate-300 w-full mt-5`}
          ></div>
        </div>
        <div
          className={`grid col-span-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-[0.325rem] gap-y-[0.325rem]`}
        >
          {Array.from({ length: 4 }, (x, i) => (
            <div
              key={i}
              className="max-md:h-[250px] h-[600px] w-full col-span-1 bg-slate-300 object-cover animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Loading;
