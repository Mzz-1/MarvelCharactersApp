import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacter } from "../redux-store/characterStore";
import { Loader } from "../components/loader";
import CharacterCard from "../components/characterCard";
import { useNavigate } from "react-router-dom";

const CharacterProfile = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchCharacter({ id }));
    }, []);

    const character = useSelector((state) => state.character);

    const { characterData, fetchStatus } = character;

    return (
        <div className="m-auto flex items-center justify-center h-[85vh] flex-col">
            {fetchStatus !== "success" ? (
                <Loader />
            ) : (
                <>
                <span className="font-roboto font-semibold mt-7 hover:cursor-pointer text-[#ed1d24]" onClick={()=>navigate(-1)}>RETURN HOME</span>
                    <CharacterCard characterData={characterData} />
                </>
            )}
        </div>
    );
};

export default CharacterProfile;
