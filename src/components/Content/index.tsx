import { useEffect, useState } from 'react';
import { SectionResults } from './components/SectionResults';
import { SectionRace } from './components/SeccionRace';
import { SectionDriverStanding } from './components/SectionDriverStanding';
import { SectionConstructorStanding } from './components/SectionConstructorStanding';
import { SectionFlags } from './components/SectionFlags';
import './Content.css'

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
        <div className="contenedor grid__contenedor">
            <div className="principal__contenedor">
                <SectionRace title='Next Race Info' />
                <SectionResults title='Result of Last Race' />
                {
                    showFlags ? (
                        <SectionFlags />
                    ) : undefined
                }
            </div>
            <div className="sidebar__contenedor">
                <SectionDriverStanding />
                <SectionConstructorStanding />
            </div>
        </div>
    )
}