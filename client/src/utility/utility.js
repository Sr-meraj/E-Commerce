import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


export const updateFilter = (searchParams, sectionId, value) => {
    let filterValue = searchParams.getAll(sectionId);

    if (filterValue.length > 0 && filterValue[0].split(',').includes(value)) {
        filterValue = filterValue[0].split(',').filter((item) => item !== value);

        if (filterValue.length === 0) {
            searchParams.delete(sectionId);
        }
    } else {
        filterValue.push(value);
    }

    if (filterValue.length > 0) {
        searchParams.set(sectionId, filterValue.join(","));
    }

    return searchParams.toString();
};