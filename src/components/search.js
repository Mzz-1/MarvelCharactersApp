import { useState } from "react";
import { SearchButton } from "./button";
import { useDispatch } from "react-redux";
import { fetchAllCharacters } from "../redux-store/characterStore";
export const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const dispatch = useDispatch();
    return (
        <>
            <input
                type="text"
                placeholder="Search characters"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className=" w-[98%] sm:w-[450px] rounded-sm xl:rounded-none relative h-[60px] xl:h-[70px] font-slab xl:my-8 sm:my-[40px] mr-2 ml-auto xl:border-2 border-b-2 outline-none pl-[30px] pr-[80px]"

            />
            <SearchButton
                text="SEARCH"
                onClick={() => dispatch(fetchAllCharacters({ searchTerm }))}
            />
        </>
    );
};
