import React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { get } from "@/app/api/api";

export const Description = ({ path }) => {
  const { data: desc } = useSuspenseQuery({
    queryKey: ["desc", path],
    queryFn: async () => {
      return await get(`/product-details/description/${path}`).then(
        (res) => res?.payload
      );
    },
    refetchOnWindowFocus: false,
  });

  const replaceHTML = (html) => {
    return html?.replace(/<br\s*\/?>|<br><\/br>/gi, " ") ?? "";
  };

  return (
    <>
      {desc?.description && (
        <div
          className={`mt-[1.5rem] overflow-y-auto max-w-[90%] flex items-center gap-3`}
        >
          <p
            className="mt-0 mb-auto text-sm font-regular"
            dangerouslySetInnerHTML={{
              __html: replaceHTML(desc?.description),
            }}
          ></p>
        </div>
      )}
    </>
  );
};
