import './Content.css'
import { useContext, useEffect, useState } from "react"
import { F1Context } from "../../context/F1DB/F1Context"
import { SectionLoading } from './components/SectionLoading';
import { SectionResults } from './components/SectionResults';

export const Content = () => {
    const [isLoad, setIsLoad] = useState(false);
    const { stateRaces, getResults } = useContext(F1Context);

    useEffect(() => {
        getResults('current/last/results.json');

        setTimeout(() => {
            setIsLoad(true);
        }, 2000);
    }, [])



    return (
        <div className="contenedor">
            {
                isLoad ? (
                    <>
                        <SectionResults loading={false} title={`Result of the Last Race`} raceName={`${stateRaces.RaceTable?.Races[0].raceName}`} locality={`${stateRaces.RaceTable?.Races[0].Circuit.Location.locality}`} country={`${stateRaces.RaceTable?.Races[0].Circuit.Location.country}`} dataResultTable={stateRaces.RaceTable?.Races[0].Results} />
                    </>
                ) : (
                    <>
                        <SectionLoading />
                        <SectionLoading />
                    </>
                )

            }
        </div>
    )
}