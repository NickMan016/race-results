import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { F1Context } from '../../context/F1DB/F1Context';
import { useForm } from '../../hooks/useForm';
import { SectionLoading } from '../Section/components/SectionLoading';
import { Section } from '../Section';
import { TableData } from '../TableData';
import { TableLoading } from '../TableData/components/TableLoading';

interface FormData {
    season: string
    team: string
    search: string
}

export const Drivers = () => {
    const years = [];
    const { form, handleChangeSelect } = useForm<FormData>({
        season: 'current',
        team: '0',
        search: ''
    });
    const [isLoad, setIsLoad] = useState(false);
    const [isLoadTable, setIsLoadTable] = useState(false);
    const { season, team } = form;
    const { stateConstructors, stateDrivers, getConstructors, getDrivers } = useContext(F1Context);
    const { ConstructorTable } = stateConstructors;
    const { DriverTable } = stateDrivers;
    const date = new Date();
    for (let index = (date.getFullYear() - 1); index >= 1950; index--) {
        years.push(index);
    }

    useEffect(() => {
        getConstructors(`${season}/constructors`);
        const responseDrivers = getDrivers(queryDrivers());

        setTimeout(() => {
            responseDrivers.then(value => {
                setIsLoad(value)
                setIsLoadTable(value)
            })
        }, 2000);
    }, [])

    useEffect(() => {
        const responseDrivers = getDrivers(queryDrivers());

        setTimeout(() => {
            responseDrivers.then(value => {
                setIsLoadTable(value)
            })
        }, 2000);
    }, [season, team])


    const queryDrivers = (): string => {
        let query: string = `${season}`;

        if (team !== "0") {
            query += `/constructors/${team}`
        }

        query += '/drivers'

        return query;
    }

    const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
        setIsLoadTable(false)
        const { value, name } = e.target;
        handleChangeSelect(e);
        if (name === 'season') {
            await getConstructors(`${value}/constructors`);
        }
    }

    return (
        <div className="mt-[5.25rem] mb-10">
            {
                isLoad ? (
                    <Section title="Drivers" content={
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

                                <div className="col-span-8 sm:col-span-4 lg:col-span-3 xl:col-span-2">
                                    <label className="font-bold block" htmlFor="">Team</label>
                                    <select className="block outline-none w-full mt-1 p-2 bg-transparent border-gray-400 border-[3px] rounded-md dark:border-gray-700 dark:bg-gray-900" value={team} onChange={handleChange} name="team" id="">
                                        <option value="0">All</option>
                                        {
                                            ConstructorTable?.Constructors.map((value, index) => (
                                                <option key={index} value={value.constructorId}>{value.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </form>
                            <TableData tHead={[
                                { text: '', center: true },
                                { text: 'Driver', center: false },
                                { text: 'Number', center: false },
                                { text: 'Nationality', center: false },
                            ]} tBody={
                                <>
                                    {
                                        isLoadTable ? (
                                            <tbody>
                                                {
                                                    DriverTable?.Drivers.length === 0 ? (
                                                        <tr className="text-center">
                                                            <td colSpan={4}>No drivers found with your search</td>
                                                        </tr>
                                                    ) : (
                                                        <>
                                                            {

                                                                DriverTable?.Drivers.map((value, index) => (
                                                                    <tr className="border-gray-700 border-b-[1px] hover:bg-gray-300 dark:border-gray-500 dark:hover:bg-gray-700" key={index}>
                                                                        <td className="col__img">
                                                                            <img className="h-8 w-8 m-auto rounded-full" src={`https://race-results-api.onrender.com/api/drivers/${value.driverId}/image`} alt={`Foto de ${value.driverId}`} />
                                                                        </td>
                                                                        <td className="p-3">{`${value.givenName} ${value.familyName}`}</td>
                                                                        <td className="p-3">{value.permanentNumber || 'Not Number'}</td>
                                                                        <td className="p-3">{value.nationality}</td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </>
                                                    )
                                                }
                                            </tbody>
                                        ) : (
                                            <TableLoading image={true} columns={3} />
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