import { Heading } from "./heading";

const CharacterCard = ({characterData}) => {
    return (
        <div className="grid grid-cols-2   max-w-[1100px] bg-[#f5f5f5]  m-auto border border-black p-5 border-b-8 shadow-xl font-montserrat">
        <div className="h-[500px] w-[450px] flex ">
            <img
                src={`${characterData[0]?.thumbnail?.path}.${characterData[0]?.thumbnail?.extension}`}
                alt={`${characterData[0]?.name} thumbnail`}
                className="h-[450px] w-[400px] object-cover m-auto"
            />
        </div>
        <div className="flex flex-col gap-2 py-8 text-center border-l px-5">
            <Heading>Character Profile</Heading>
            <hr className="bg-black h-[2px]"></hr>
            <p className="text-[30px]  font-semibold mt-6 font-cinzel">
                {" "}
                {characterData[0].name}
            </p>
            <p>
                <span className="mb-1 font-semibold flex justify-center">
                    Character Description:{" "}
                </span>

                {characterData[0].description === ""
                    ? "No description Available"
                    : characterData[0].description}
            </p>
            <p className="mb-1 font-semibold">
                Total Comics Appeared:{" "}
                {characterData[0]?.comics?.available}
            </p>
            <p className="mb-1 font-semibold">
                Total Series: {characterData[0]?.series?.available}
            </p>
            <p className="mb-1 font-semibold">
                Total Stories:{" "}
                {characterData[0]?.stories?.available}
            </p>
        </div>
    </div>
    );
};

export default CharacterCard;