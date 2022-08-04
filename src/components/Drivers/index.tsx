import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { F1Context } from '../../context/F1DB/F1Context';
import { useForm } from '../../hooks/useForm';
import { SectionLoading } from '../Content/components/SectionLoading';
import { TableLoading } from './components/TableLoading';
import './Drivers.css'

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
        <div className="contenedor">
            {
                isLoad ? (
                    <div className="seccion">
                        <div className="titulo__seccion">Drivers</div>
                        <form className="formulario__filtros">
                            <div className="form__group">
                                <label className="label__input" htmlFor="season">Season</label>
                                <select className="form__input" value={season} onChange={(e) => { handleChange(e) }} name="season" id="season">
                                    <option value="current">Current</option>
                                    {
                                        years.map((value, index) => (
                                            <option key={index} value={value}>{value}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="form__group">
                                <label className="label__input" htmlFor="">Team</label>
                                <select className="form__input" value={team} onChange={handleChange} name="team" id="">
                                    <option value="0">All</option>
                                    {
                                        ConstructorTable?.Constructors.map((value, index) => (
                                            <option key={index} value={value.constructorId}>{value.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </form>
                        <div className="contenedor__tabla">
                            <table className="tabla">
                                <thead>
                                    <tr className="thead">
                                        <th></th>
                                        <th>Driver</th>
                                        <th>Number</th>
                                        <th>Nationality</th>
                                    </tr>
                                </thead>
                                <>
                                    {
                                        isLoadTable ? (
                                            <tbody>
                                                {
                                                    DriverTable?.Drivers.length === 0 ? (
                                                        <tr className="fila__error">
                                                            <td colSpan={4}>No drivers found with your search</td>
                                                        </tr>
                                                    ) : (
                                                        <>
                                                            {

                                                                DriverTable?.Drivers.map((value, index) => (
                                                                    <tr key={index}>
                                                                        <td className="col__img">
                                                                            {/* <img src={require(`./../../assets/img/drivers/${value.driverId}.png`) || require('./../../assets/img/generic.png')} alt={`Foto de ${value.driverId}`} /> */}
                                                                        </td>
                                                                        <td>{`${value.givenName} ${value.familyName}`}</td>
                                                                        <td>{value.permanentNumber || 'Not Number'}</td>
                                                                        <td>{value.nationality}</td>
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
                            </table>
                        </div>
                    </div>
                ) : (
                    <SectionLoading />
                )
            }
        </div >
    )

}