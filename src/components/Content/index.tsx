import './Content.css'
import { SectionResults } from './components/SectionResults';
import { SectionRace } from './components/SeccionRace';
import { useContext } from 'react';
import { F1Context } from '../../context/F1DB/F1Context';
import { SectionDriverStanding } from './components/SectionDriverStanding';
import { SectionConstructorStanding } from './components/SectionConstructorStanding';
import { SectionFlags } from './components/SectionFlags';
import data from './../../data/data.json';

export const Content = () => {
    
    return (
        <div className="contenedor grid__contenedor">
            <div className="principal__contenedor">
                <SectionRace title='Next Race Info' round={data.round} />
                <SectionResults title='Result of Last Race' />
                <SectionFlags />
            </div>
            <div className="sidebar__contenedor">
                <SectionDriverStanding />
                <SectionConstructorStanding />
            </div>
        </div>
    )
}