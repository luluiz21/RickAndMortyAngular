export class Character {
    id?: number;
    name?: 'Alive' | 'Dead' | 'unknown';
    status?: string;
    species?: string;
    type?: string;
    gender?: 'Female' | 'Male' | 'Genderless' | 'unknown';
    origin?: CharacterLocation;
    location?: CharacterLocation;
    image?: string;
    episode?: string[];
    url?: string;
    create?: string;
}

export class CharacterLocation{
    name?: string;
    url?: string;
}