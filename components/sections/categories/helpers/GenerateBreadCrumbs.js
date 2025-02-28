import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";

const Breadcrumbs = ({ asPath }) => {
  const router = useRouter();
  const pathname = router.pathname;
  const segments = pathname.split("/").filter((segment) => segment !== "");
  const asPathSegments = asPath.split("/").filter((segment) => segment !== "");
  return (
    <div className="text-base max-lg:hidden">
      <Link href="/">Početna</Link>
      {asPathSegments.map((segment, index) => (
        <React.Fragment key={index}>
          <span> / </span>
          <span>{segment.charAt(0).toUpperCase() + segment.slice(1)}</span>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;
