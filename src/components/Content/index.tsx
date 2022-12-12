import { useEffect, useState } from 'react';
import { SectionResults } from './components/SectionResults';
import { SectionRace } from './components/SeccionRace';
import { SectionDriverStanding } from './components/SectionDriverStanding';
import { SectionConstructorStanding } from './components/SectionConstructorStanding';
import { SectionFlags } from './components/SectionFlags';
import { SectionQualifying } from './components/SectionQualifying';
import { SectionSprint } from './components/SectionSprint';
// import { SectionFinishSeason } from './components/SectionFinishSeason';

export const Content = () => {
    const [showFlags, setShowFlags] = useState(true);
    const [showSection, setShowSection] = useState(true);
    const [showSectionRace, setShowSectionRace] = useState(true);
    const [showSectionSprint, setShowSectionSprint] = useState(true);

    useEffect(() => {
        if (window.innerWidth <= 1024)
            setShowFlags(false)
        else
            setShowFlags(true)

        window.onresize = () => {
            if (window.innerWidth <= 1024)
                setShowFlags(false)
            else
                setShowFlags(true)
        }

    }, [])

    return (
        <>
            <div className="grid grid-cols-6 gap-0 lg:gap-5">
                {/* <div className="col-span-3">
                    <SectionFinishSeason />
                </div> */}
                <div className="col-span-6 xl:col-span-4">
                    {
                        showSectionRace ? (
                            <SectionRace showSectionRace={setShowSectionRace} />
                        ) : undefined
                    }
                    {
                        showSectionSprint ? (
                            <SectionSprint showSectionSprint={setShowSectionSprint} />
                        ) : (
                            <>
                                {
                                    showSection ? (
                                        <SectionQualifying showSectionQualifying={setShowSection} />
                                    ) : (
                                        <SectionResults />
                                    )
                                }
                            </>
                        )
                    }
                    {
                        showFlags ? (
                            <SectionFlags />
                        ) : undefined
                    }
                </div>
                <div className="col-span-6 xl:col-span-2">
                    <SectionDriverStanding />
                    <SectionConstructorStanding />
                </div>
            </div>
        </>
    )
}