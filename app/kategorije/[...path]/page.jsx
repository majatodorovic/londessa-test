import { CategoryData } from "@/components/sections/categories/CategoryPage";

const CategoryPage = ({
  params: { path },
  searchParams: { sort: sortURL, strana, filteri },
  base_url,
}) => {
  //slug kategorije
  const slug = path[path?.length - 1];

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
    <CategoryData
      base_url={base_url}
      slug={slug}
      path={path}
      sortField={sortField}
      sortDirection={sortDirection}
      strana={page}
      allFilters={[]}
      filters={filters}
    />
  );
};

export default CategoryPage;
