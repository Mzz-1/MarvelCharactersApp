import { useNavigate } from "react-router-dom";

const CharacterTable = ({data}) => {
    const navigate=useNavigate()
    return (
        <table className=" font-montserrat">
        <thead className="h-[60px] bg-[#ed1d24] text-[#fefefe] font-cinzel">
            <tr>
                <th></th>
                <th>Name</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody className="text-center">
            {data.map((character) => (
                <tr
                    key={character.id}
                    className="h-[130px]  border-b  divide-slate-400/25  first:border-t hover:cursor-pointer hover:bg-slate-100"
                    onClick={() => {
                        navigate(`./character/${character.id}`);
                    }}
                >
                    <td className="p-3 min-w-[145px]">
                        <img
                            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                            alt={`${character.name} thumbnail`}
                            className="h-[120px] w-[120px] rounded-sm m-auto"
                        />
                    </td>
                    <td className="border-x min-w-[345px]">
                        {character.name}
                    </td>
                    <td className="w-[50%] text-left px-5 min-w-[500px]">
                        {character.description === "" ? (
                            <p className="text-center">
                                No description available
                            </p>
                        ) : (
                            character.description
                        )}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    );
};

export default CharacterTable;
