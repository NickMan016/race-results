export interface Country {
    name: string
    alpha3Code: string
    timezones: string[]
    flags: Flag
    independent: string
}

export interface Flag {
    svg: string
    png: string
}