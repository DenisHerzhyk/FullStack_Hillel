interface AnimalType {
    name: string;
    species: string;
    foods: {
        likes: string[],
        dislikes: string[]
    }
}

export default AnimalType;