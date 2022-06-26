import { F1Context } from "./F1Context"

interface ProviderProps {
    children: JSX.Element | JSX.Element[]
}

export const F1Provider = ({ children }: ProviderProps) => {
    return (
        <F1Context.Provider value={{}}>
            { children }
        </F1Context.Provider>
    )
}