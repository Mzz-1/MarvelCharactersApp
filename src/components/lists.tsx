interface ListInterface {
    data: any;
    characterFilters: any;
    onChange: any;
}

export const FilterList = ({
    data,
    onChange,
    characterFilters,
}: ListInterface) => {
    return (
        <>
            <ul className={"flex flex-col items-start text-left"}>
                {data.map((character:any) => (
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
