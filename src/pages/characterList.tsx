import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCharacters } from "../redux-store/characterSlice";
import { PaginationButtons, ActionButton } from "../components/button";
import { Loader } from "../components/loader";
import { SearchBar } from "../components/search";
import CharacterTable from "../components/table";
import { LineChart } from "../components/charts";
import { Heading } from "../components/heading";
import { FilterList } from "../components/lists";

interface MarvelCharacterListInterFace {
    data: any;
    fetchAllStatus: string;
    totalPages: number;
}

interface characterDataInterface {
    label: string[];
    value: number;
}

interface PieChartDataInterface {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
    }[];
}

interface CharacterFiltersInterface {
    [characterLabel: string]: boolean;
}

const MarvelCharacterList: React.FC<MarvelCharacterListInterFace> = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [characterData, setCharacterData] = useState<
        characterDataInterface[]
    >([]);
    // Sets the characters to display in thedropdown menu
    const [dropdownData, setDropdownData] = useState<characterDataInterface[]>(
        []
    );
    // Sets the filtered Data selected by user
    const [characterFilters, setCharacterFilters] =
        useState<CharacterFiltersInterface>({});
    // To display Dropdown options
    const [showFilters, setFilters] = useState<boolean>(false);

    const [pieChartData, setPieChartData] = useState<PieChartDataInterface>({
        labels: [],
        datasets: [],
    });

    const dispatch = useDispatch();

    const character = useSelector((state: any) => state.character);

    const { data, fetchAllStatus, totalPages } = character;

    const pageSize = 20; // Number of characters per page

    useEffect(() => {
        // Calculate the offset based on the current page
        const offset = (currentPage - 1) * pageSize;
        dispatch(fetchAllCharacters({ pageSize, offset }));
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        const characterInfo = data.map((character: any) => ({
            label: character.name,
            value: character.comics.available,
        }));

        setCharacterData(characterInfo);
        setDropdownData(characterInfo);
    }, [data]);

    const setDataForChart = (data) => {
        setPieChartData({
            labels: data.map((character: any) => character.label),
            datasets: [
                {
                    label: "No of Comic book appearances",
                    data: data.map((character) => character.value),
                    backgroundColor: ["#FF6384"],
                },
            ],
        });
    };

    useEffect(() => {
        setDataForChart(characterData);
    }, [characterData, currentPage, dropdownData]);

    // Handle character toggle (enable/disable)
    const toggleCharacter = (characterName: string) => {
        setCharacterFilters((prevFilters) => ({
            ...prevFilters,
            [characterName]: !prevFilters[characterName],
        }));
    };

    const filterCharacter = () => {
        // Extract character labels from the characterFilters object
        const filteredCharacterLabels: any = Object.keys(characterFilters);

        // Use the filter method to create a new array with characters that match the filter
        const filteredData = characterData.filter((character) => {
            const characterLabel: any = character.label;

            // Check if the character label exists in the filter object and is set to true
            return (
                filteredCharacterLabels.includes(characterLabel) &&
                characterFilters[characterLabel]
            );
        });
        setDataForChart(filteredData);
    };

    return (
        <>
            <div className="mb-[70px] text-center">
                <div className="md:ml-auto md:mr-5 md:w-[650px]  my-8">
                    <SearchBar />
                </div>

                <div className="w-[90%] m-auto mb-10 max-w-[1000px] border-x">
                    {fetchAllStatus !== "success" ? (
                        <Loader />
                    ) : (
                        <div className=" overflow-x-scroll">
                            <CharacterTable data={data} />
                        </div>
                    )}
                </div>
                <div className="flex gap-10 justify-center items-center mb-9">
                    <PaginationButtons
                        text="Previous"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    />
                    <span className="font-libre text-[22px]">
                        {currentPage}
                    </span>
                    <PaginationButtons
                        text="Next"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    />
                </div>
            </div>
            <div className="max-w-[1200px] m-auto mb-7 text-center  border-t-2">
                <Heading>
                    MARVEL characters and their number of appearance in comics
                </Heading>
                {fetchAllStatus !== "success" ? (
                    <Loader />
                ) : (
                    <div className="px-4">
                        <div className="text-right relative">
                            <ActionButton
                                text={
                                    showFilters
                                        ? "Hide filters"
                                        : "Show filters"
                                }
                                marginb={7}
                                onClick={() => setFilters(!showFilters)}
                            />
                            <div
                                className={
                                    showFilters
                                        ? "right-0 absolute shadow-2xl p-6 bg-[#fefefe] text-left"
                                        : "hidden"
                                }
                            >
                                <FilterList
                                    data={dropdownData}
                                    characterFilters={characterFilters}
                                    onChange={(characterName) =>
                                        toggleCharacter(characterName)
                                    }
                                />

                                <ActionButton
                                    text="Filter Characters"
                                    float={"right"}
                                    margint={6}
                                    onClick={() => filterCharacter()}
                                />
                            </div>
                        </div>
                        <LineChart data={pieChartData} />
                    </div>
                )}
            </div>
        </>
    );
};

export default MarvelCharacterList;
