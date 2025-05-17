// src/utils/HariValidator.ts

export enum Hari {
    Senin = "Senin",
    Selasa = "Selasa",
    Rabu = "Rabu",
    Kamis = "Kamis",
    Jumat = "Jumat",
    Sabtu = "Sabtu",
    Minggu = "Minggu"
}

export function isValidHari(input: string): boolean {
    const formattedInput = capitalizeFirstLetter(input.trim().toLowerCase());
    return Object.values(Hari).includes(formattedInput as Hari);
}

export function formatHari(input: string): Hari | null {
    const formattedInput = capitalizeFirstLetter(input.trim().toLowerCase());
    return isValidHari(formattedInput) ? formattedInput as Hari : null;
}

function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
