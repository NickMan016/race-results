import Moment from "react-moment"

interface propsHook {
    date: string
    time: string
}

export const FormatDate = ({ date, time }: propsHook) => {    
    return (
        <>
            <Moment date={`${date}T${time}`} format="ddd, MMM DD HH:mm [hrs]" />
        </>
    )
}