import Moment from "react-moment"

interface propsHook {
    gmt?: boolean
    date: string
    time: string
    region: string
    capital: string
}

export const FormatDate = ({ gmt = false, date, time, region, capital }: propsHook) => {    
    return (
        <>
            <Moment date={`${date}T${time}`} format="DD/MM/YYYY HH:mm" />
            &nbsp;hrs
            {
                gmt ? (
                    <>
                        &nbsp;(GMT
                        <Moment date={date} format="Z" />)
                    </>
                ) : undefined
            }

        </>
    )
}