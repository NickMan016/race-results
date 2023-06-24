import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { F1Context } from '../../context/F1DB/F1Context';
import { useForm } from '../../hooks/useForm';
import { SectionLoading } from '../Section/components/SectionLoading';
import { Section } from '../Section';
import { TableData } from '../TableData';
import { TableLoading } from '../TableData/components/TableLoading';

interface FormData {
    season: string
    search: string
}

export const Teams = () => {
    const years = [];
    const { form, handleChangeSelect } = useForm<FormData>({
        season: 'current',
        search: ''
    });
    const [isLoad, setIsLoad] = useState(false);
    const [isLoadTable, setIsLoadTable] = useState(false);
    const { season } = form;
    const { stateConstructors, getConstructors } = useContext(F1Context);
    const { ConstructorTable } = stateConstructors;
    const date = new Date();
    for (let index = (date.getFullYear() - 1); index >= 1950; index--) {
        years.push(index);
    }

    useEffect(() => {
        const responseConstructors = getConstructors(`${season}/constructors`);

        setTimeout(() => {
            responseConstructors.then(value => {
                setIsLoad(value)
                setIsLoadTable(value)
            })
        }, 2000);

    }, [])

    useEffect(() => {
        const responseConstructors = getConstructors(`${season}/constructors`);

        setTimeout(() => {
            responseConstructors.then(value => {
                setIsLoadTable(value)
            })
        }, 2000);
    }, [season])

    const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
        setIsLoadTable(false)
        handleChangeSelect(e);
    }

    return (
        <div className="mt-[5.25rem] mb-10">
            {
                isLoad ? (
                    <Section title="Teams" content={
                        <>
                            <form className="grid grid-cols-8 gap-2 sm:gap-4 py-2">
                                <div className="col-span-8 sm:col-span-4 lg:col-span-3 xl:col-span-2">
                                    <label className="font-bold block" htmlFor="season">Season</label>
                                    <select className="block outline-none w-full mt-1 p-2 bg-transparent border-gray-400 border-[3px] rounded-md dark:border-gray-700 dark:bg-gray-900" value={season} onChange={(e) => { handleChange(e) }} name="season" id="season">
                                        <option value="current">Current</option>
                                        {
                                            years.map((value, index) => (
                                                <option key={index} value={value}>{value}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </form>
                            <TableData tHead={[
                                { text: 'Name', center: false },
                                { text: 'Nationality', center: false },
                            ]} tBody={
                                <>
                                    {
                                        isLoadTable ? (
                                            <tbody>
                                                {
                                                    ConstructorTable?.Constructors.length === 0 ? (
                                                        <tr className="text-center">
                                                            <td colSpan={3}>No teams found with your search</td>
                                                        </tr>
                                                    ) : (
                                                        <>
                                                            {
                                                                ConstructorTable?.Constructors.map((value, index) => (
                                                                    <tr className="border-gray-700 border-b-[1px] hover:bg-gray-300 dark:border-gray-500 dark:hover:bg-gray-700" key={index}>
                                                                        <td className="p-3">
                                                                            <div className="inline-block">
                                                                            {value.name || 'Not Name'}
                                                                            </div>
                                                                            <div className="inline-block">
                                                                            <img className="block ml-4 mx-auto h-4" src={`https://race-results-images.up.railway.app/api/teams/${value.constructorId}/image`} alt="" />
                                                                            </div>
                                                                        </td>
                                                                        {/* <td className="">
                                                                            <img className="block mx-auto h-6" src={`https://race-results-images.up.railway.app/api/teams/${value.constructorId}/image`} alt="" />
                                                                        </td> */}
                                                                        <td className="p-3">{value.nationality}</td>
                                                                        <td></td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </>
                                                    )
                                                }
                                            </tbody>
                                        ) : (
                                            <TableLoading image={false} columns={2} />
                                        )
                                    }
                                </>
                            } />
                        </>
                    } />
                ) : (
                    <SectionLoading />
                )
            }
        </div>
    )

}