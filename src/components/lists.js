import React from "react";

export const FilterList = ({
    data,
    onChange,
    characterFilters,
}) => {
    return (
        <>
            <ul className={"flex flex-col items-start text-left"}>
                {data.map((character) => (
                    <li className="" key={character.label}>
                        <label className="mx-2">
                            <input
                                type="checkbox"
                                className="mr-3"
                                checked={characterFilters[character.label]}
                                onChange={() => onChange(character.label)}
                            />
                            {character.label}
                        </label>
                    </li>
                ))}
            </ul>
        </>
    );
};
