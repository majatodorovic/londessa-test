const Loading = () => {
    return (
        <>
            <div
                className={`h-[200px] w-full bg-slate-300 object-cover animate-pulse`}
            ></div>
            <div
                className={`h-[50px] mt-5 w-full bg-slate-300 object-cover animate-pulse`}
            ></div>

            <div
                className={`grid mt-10 max-sm:grid-cols-2 sm:grid-cols-4 gap-x-[0.42rem] gap-y-[0.625rem]`}
            >
                {Array.from({ length: 12 }, (x, i) => (
                    <div
                        key={i}
                        className="max-md:h-[250px] h-[500px] w-full col-span-1 bg-slate-300 object-cover animate-pulse"
                    ></div>
                ))}
            </div>
        </>
    );
};

export default Loading;