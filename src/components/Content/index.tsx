import { useEffect, useState } from 'react';
import { SectionResults } from './components/SectionResults';
import { SectionRace } from './components/SeccionRace';
import { SectionDriverStanding } from './components/SectionDriverStanding';
import { SectionConstructorStanding } from './components/SectionConstructorStanding';
import { SectionFlags } from './components/SectionFlags';

export const Content = () => {
    const [showFlags, setShowFlags] = useState(true);

    useEffect(() => {
        window.onresize = () => {
            if (window.innerWidth <= 1024)
                setShowFlags(false)
            else
                setShowFlags(true)
        }

    }, [])

    return (
        <>
            <div className="grid grid-cols-3 gap-0 lg:gap-5">
                <div className="col-span-3 lg:col-span-2">
                    <SectionRace />
                    <SectionResults />
                    {
                        showFlags ? (
                            <SectionFlags />
                        ) : undefined
                    }
                </div>
                <div className="col-span-3 lg:col-span-1">
                    <SectionDriverStanding />
                    <SectionConstructorStanding />
                </div>
            </div>
        </>
    )
}