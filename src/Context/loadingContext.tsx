import React, { createContext, Dispatch, useState } from "react";

export type LoadingState = {
    loading: boolean;
    setLoading:Dispatch<React.SetStateAction<boolean>>
}

export const LoadingPageContext = createContext<LoadingState | null>(null)

interface LoadingPageProps {
    children:React.ReactNode
}

const LoadingPageProvider : React.FC<LoadingPageProps> = ({children})=>{
    const [loading, setLoading] = useState<boolean>(true)
    return(
        <LoadingPageContext.Provider value={{loading, setLoading}}>
            {children}
        </LoadingPageContext.Provider>
    )
}

export default LoadingPageProvider

























// import React, { Dispatch, createContext, useState } from "react";

// interface LoadingPageContextType {
//     loadingPage: boolean;
//     setLoadingPage: Dispatch<React.SetStateAction<boolean>>;
// }

// export const LoadingPageContext = createContext<LoadingPageContextType | null>(null);

// interface LoadingPageProviderProps {
//     children: React.ReactNode;
// }

// const LoadingPageProvider: React.FC<LoadingPageProviderProps> = ({ children }) => {
//     const [loadingPage, setLoadingPage] = useState<boolean>(true);

//     return (
//         <LoadingPageContext.Provider value={{ loadingPage, setLoadingPage }}>
//             {children}
//         </LoadingPageContext.Provider>
//     );
// };

// export default LoadingPageProvider;