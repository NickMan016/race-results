export interface CountriesAPIBaseResponse {
    data: Country[]
}

export interface Country {
    name: NameFlag
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

export interface NameFlag {
    common: string
}