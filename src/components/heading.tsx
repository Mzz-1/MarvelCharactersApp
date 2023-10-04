interface HeadingInterface{
    children:any,
}

export const Heading = ({children}:HeadingInterface) => {
    return (
        <h2 className="font-bold text-[30px] mt-3 lg:mt-0 lg:my-7 font-cinzel">
           {children}
        </h2>
    );
};

