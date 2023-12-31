import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacter } from "../redux-store/characterSlice";
import { Loader } from "../components/loader";
import CharacterCard from "../components/characterCard";
import { useNavigate } from "react-router-dom";

interface CharacterProfileInterface {
    characterData: any;
    fetchStatus: string;
}

const CharacterProfile: React.FC<CharacterProfileInterface> = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    //Fetch character information
    useEffect(() => {
        dispatch(fetchCharacter({ id }));
    }, []);

    const character = useSelector((state: any) => state.character);

    const { characterData, fetchStatus } = character;

    return (
        <div className="m-auto flex items-center justify-center py-7 lg:py-0 lg:h-[85vh] flex-col">
            {fetchStatus !== "success" ? (
                <Loader />
            ) : (
                <>
                    <span
                        className="font-roboto font-semibold mb-5 lg:mb-0 mt-7 hover:cursor-pointer text-[#ed1d24]"
                        onClick={() => navigate(-1)}
                    >
                        RETURN HOME
                    </span>
                    <CharacterCard characterData={characterData} />
                </>
            )}
        </div>
    );
};

export default CharacterProfile;
