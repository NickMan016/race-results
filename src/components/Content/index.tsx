import { useEffect, useState } from 'react';
import { SectionResults } from './components/SectionResults';
import { SectionRace } from './components/SeccionRace';
import { SectionDriverStanding } from './components/SectionDriverStanding';
import { SectionConstructorStanding } from './components/SectionConstructorStanding';
import { SectionFlags } from './components/SectionFlags';
import { Section } from '../Section';

export const Content = () => {
    const [showFlags, setShowFlags] = useState(true);

    useEffect(() => {
        window.onresize = () => {
            if (window.innerWidth <= 1200)
                setShowFlags(false)
            else
                setShowFlags(true)
        }

    }, [])

    return (
        <>
            <div className="grid grid-cols-3 gap-5">
                <div className="col-span-2">
                    <Section title='Next Race Info' content={<SectionRace />} />
                    <Section title='Result of Last Race' content={<SectionResults />} />
                    {
                        showFlags ? (
                            <Section title='Flags' content={<SectionFlags />} />
                        ) : undefined
                    }
                </div>
                <div className="col-span-1">
                    <Section title='Driver Championship' content={<SectionDriverStanding />} />
                    <Section title='Constructor Championship' content={<SectionConstructorStanding />} />
                </div>
            </div>
            {/* <div className="principal__contenedor">
                <SectionRace title='Next Race Info' />
                <SectionResults title='Result of Last Race' />
                {
                    showFlags ? (
                        <SectionFlags />
                    ) : undefined
                }
            </div> */}
            {/* <div className="sidebar__contenedor">
                <SectionDriverStanding />
                <SectionConstructorStanding />
            </div> */}
        </>
    )
}