import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { F1Context } from "../../../../context/F1DB/F1Context";
import { Section } from "../../../Section"
import { SectionLoading } from "../../../Section/components/SectionLoading";

interface PropsSectionFinishSeason {
    showSectionFinishSeason: Dispatch<SetStateAction<boolean>>
}

export const SectionFinishSeason = ({ showSectionFinishSeason }: PropsSectionFinishSeason) => {
    const [isLoad, setIsLoad] = useState(false);
    const { stateDriverStanding, stateConstructorStanding, stateInfoDriverChampion, getDriverStanding, getConstructorStanding, getInfoDriverChampion, getSchedule } = useContext(F1Context);

    useEffect(() => {
            getSchedule(`current`)
            getDriverStanding('current/driverStandings');
            getConstructorStanding('current/constructorStandings');
            const response = getInfoDriverChampion();
    
            setTimeout(() => {
                response.then(value => {
                    showSectionFinishSeason(value);
                    setIsLoad(value);
                })
            }, 2000);
    }, [])


    return (
        <>
            {
                isLoad ? (
                    <div className="col-span-6 lg:col-span-3">
                        {stateDriverStanding.StandingsTable.StandingsLists[0].DriverStandings.map((value, index) => (
                            <div key={index}>
                                {
                                    index === 0 ? (
                                        <Section title={`Congratulations ${value.Driver.givenName} ${value.Driver.familyName}`} content={
                                            <div className="grid grid-cols-2">
                                                <div className="col-span-1">
                                                    <img className="mt-4 h-28 w-28 sm:h-32 sm:w-32 m-auto rounded-full" src={`https://race-results-api.onrender.com/api/drivers/${value.Driver.driverId}/image`} alt={`Foto de ${value.Driver.driverId}`} />
                                                </div>
                                                <div className="col-span-1 flex flex-col justify-center">
                                                    <div className="block text-lg">Points: {stateInfoDriverChampion.points}</div>
                                                    <div className="block text-lg">Races Won: {stateInfoDriverChampion.wins}</div>
                                                    <div className="block text-lg">Poles: {stateInfoDriverChampion.poles}</div>
                                                    <div className="block text-lg">Fastest Laps: {stateInfoDriverChampion.fastestlaps}</div>
                                                </div>
                                            </div>
                                        } />
                                    ) : undefined
                                }
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="col-span-6 lg:col-span-3">
                        <SectionLoading />
                    </div>
                )
            }
            {
                isLoad ? (
                    <div className="col-span-6 lg:col-span-3">
                        {
                            stateConstructorStanding.StandingsTable.StandingsLists[0].ConstructorStandings.map((value, index) => (
                                <div key={index}>
                                    {
                                        index === 0 ? (
                                            <Section title={`Congratulations ${value.Constructor.name}`} content={
                                                <div className="grid grid-cols-3">
                                                    <div className="col-span-2">
                                                        <img className="mt-4 h-24 sm:h-32 m-auto" src={`https://race-results-api.onrender.com/api/teams/${value.Constructor.constructorId}/image/miniImage/dark`} alt={`Foto de ${value.Constructor.constructorId}`} />
                                                    </div>
                                                    <div className="col-span-1 flex flex-col justify-center">
                                                        <div className="block mt-2 text-lg">Races Won: {value.wins}</div>
                                                        <div className="block text-lg">Points: {value.points}</div>
                                                    </div>
                                                </div>
                                            } />
                                        ) : undefined
                                    }
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div className="col-span-6 lg:col-span-3">
                        <SectionLoading />
                    </div>
                )
            }
        </>

    )
}