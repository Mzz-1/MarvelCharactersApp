interface ButtonInterface{
    disabled?:boolean,
    text:string,
    margint?:number,
    marginb?:number,
    float?:string,
    onClick:any,
}

export const PaginationButtons = ({ disabled, onClick, text }:ButtonInterface) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className="w-[130px] h-[50px] rounded-md text-white bg-[#3f3838] font-cinzel"
        >
            {text}
        </button>
    );
};

export const SearchButton = ({ disabled, onClick, text }:ButtonInterface) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className="w-[150px] h-[65px] rounded-md  text-white bg-[#3f3838] font-cinzel hidden sm:inline"
        >
            {text}
        </button>
    );
};

export const ActionButton = ({ disabled, onClick, text,margint,marginb,float }:ButtonInterface) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`px-5 py-3 rounded-md text-white bg-[#3f3838] min-w-[150px] font-cinzel ml-auto mb-${marginb} mt-${margint} float-${float}`}
        >
            {text}
        </button>
    );
};
