import { CategoryData } from "@/components/sections/categories/CategoryPage";

const Section = async ({
  params: { path },
  searchParams: { sort: sortURL, strana, filteri },
}) => {
  let slug;
  switch (true) {
    case path[path?.length - 1] === "preporuceno":
      slug = "recommendation";
      break;
    default:
      break;
 }

  //vadimo sort iz URL
  const sort = (sortURL ?? "_")?.split("_");
  const sortField = sort[0];
  const sortDirection = sort[1];

  //vadimo stranu iz URL i konvertujemo u type Number
  const page = Number(strana) > 0 ? Number(strana) : 1;

  //uzimamo sve filtere sa api-ja
  // const allFilters = await getAllFilters(slug);

  //vadimo filtere iz URL
  const filters = filteri?.split("::")?.map((filter) => {
    const [column, selected] = filter?.split("=");
    const selectedValues = selected?.split("_");
    return {
      column,
      value: {
        selected: selectedValues,
      },
    };
  });
  return (
    <>
      <CategoryData
        slug={slug}
        sortDirection={sortDirection}
        sortField={sortField}
        isSection
        strana={strana}
        allFilters={[]}
      />
    </>
  );
};

export default Section;
