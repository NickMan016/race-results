import { ChangeEvent, useState } from "react"



export const useForm = <T extends Object>( INITIAL_STATE: T ) => {
    const [form, setForm] = useState(INITIAL_STATE);

    const handleChangeSelect = ( { target }: ChangeEvent<HTMLSelectElement> ) => {
        const { name, value } = target;

        setForm({
            ...form,
            [ name ]: value
        })
    }

    const handleChangeInput = ( { target }: ChangeEvent<HTMLInputElement> ) => {
        const { name, value } = target;

        setForm({
            ...form,
            [ name ]: value
        })
    }

    return {
        form,
        setForm,
        handleChangeInput,
        handleChangeSelect
    }
} 