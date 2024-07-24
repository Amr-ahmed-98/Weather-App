import React, { createContext, useState } from "react";

export interface SearchState {
    search: string
    setSearch: React.Dispatch<React.SetStateAction<string>>
   
}

export const searchContex = createContext<SearchState | null>(null)

type searchNode = {
    children: React.ReactNode
}

const SearchProvider : React.FC<searchNode> = ({children}) => {
    const [search, setSearch] = useState<string>("")

    return (
        <searchContex.Provider value={{search, setSearch}} >
            {children}
        </searchContex.Provider>
    )
}

export default SearchProvider