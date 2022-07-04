export interface Country {
    name: string
    alpha3Code: string
    altSpellings: string[]
    region: string
    capital: string
    timezones: string[]
    flags: Flag
    independent: string
}

export interface Flag {
    svg: string
    png: string
}