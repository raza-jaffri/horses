import { ValidationError } from "apollo-server"
import { idText } from "typescript"

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
]

const breeds = [
  {
    id: 1,
    name: "Nukra",
    origin: "Desi",
    picture: "No pic",
    biography: "Bla bla bla bla bla bla bla bla ",
    bloodType: "warm blooded",
    colour: "White",
  },
  {
    id: 2,
    name: "Fresian",
    origin: "England",
    picture: "No pic",
    biography: "Bla bal bal bal bla bla bla 2",
    bloodType: "cold blooded",
    colour: "Black",
  },
]

export const resolvers = {
  Mutation: {
    addBreed: (
      root: any,
      {
        name,
        origin,
        bloodType,
        colour,
        biography,
        picture,
      }: {
        name: string
        origin: string
        bloodType: string
        colour: string
        biography: string
        picture: string
      },
      context
    ) => {
      if (name) {
        const filterByName = (breed) =>
          breed.name.toLowerCase() === name.toLowerCase()
        const filteredBreeds = breeds.filter(filterByName)
        if (filteredBreeds.length > 0) {
          throw new ValidationError("The breed you entered already exists!")
        }
        breeds.push({
          id: breeds.length + 1,
          name: name,
          biography: biography,
          bloodType: bloodType,
          origin: origin,
          picture: picture,
          colour: colour,
        })
        return true
      }
      return false
    },

    updateBreed: (
      root: any,
      {
        id,
        name,
        origin,
        bloodType,
        colour,
        biography,
        picture,
      }: {
        id: number
        name: string
        origin: string
        bloodType: string
        colour: string
        biography: string
        picture: string
      },
      context
    ) => {
      if (id === undefined) throw new ValidationError(`Must provide ID!`)

      // if(1) if(2) if(0) true -> 1, false -> 0, "" -> falsy, "word" -> truthy
      const filterdById = (breed) => breed.id === id

      /**
       * function filteredById(breed) {
       *  return breed.id === id
       * }
       */

      const filteredBreedIndex = breeds.findIndex(filterdById)
      if (filteredBreedIndex > -1) {
        if (name) breeds[filteredBreedIndex].name = name
        if (biography) breeds[filteredBreedIndex].biography = biography
        if (colour) breeds[filteredBreedIndex].colour = colour
        if (picture) breeds[filteredBreedIndex].picture = picture
        if (origin) breeds[filteredBreedIndex].origin = origin
        return id
      }
      throw new ValidationError(`Breed not found for id: ${id}`)
    },
    deleteBreed: (root: any, { id }: { id: number }, context) => {
      if (id === undefined) throw new ValidationError(`Must provide ID!`)

      const filterById = (breed) => breed.id === id
      const filterByIndex = breeds.findIndex(filterById)

      if (filterByIndex !== -1) {
        breeds.splice(filterByIndex, 1)
        return true
      }
      throw new ValidationError(`Breed not found for id: ${id}`)
    },
  },
  Query: {
    books: () => books,
    breeds: (
      root: any,
      {
        name,
        origin,
        bloodType,
      }: { name: string; origin: string; bloodType: string },
      context
    ) => {
      let newBreeds = breeds
      if (name) {
        const filterByName = (breed) =>
          breed.name.toLowerCase() === name.toLowerCase()
        newBreeds = breeds.filter(filterByName)
      }
      if (origin) {
        const filterByOrigin = (breed) =>
          breed.origin.toLowerCase() === origin.toLowerCase()
        newBreeds = newBreeds.filter(filterByOrigin)
      }
      if (bloodType) {
        const filterByBloodType = (breed) =>
          breed.bloodType.toLowerCase() === bloodType.toLowerCase()
        newBreeds = newBreeds.filter(filterByBloodType)
      }

      return newBreeds
    },
    existingBreeds: (root: any, { name }: { name: string }, context) => {
      if (name) {
        const breedThere = (breed) =>
          breed.name.toLowerCase() === name.trim().toLowerCase()
        const filteredBreedsByName = breeds.filter(breedThere)
        return filteredBreedsByName.length > 0
      }
      return false
    },
  },
}
//origin: (root: any, { origin }: { origin: string }, context) => {
//const filteredBreeds = breeds.filter((breed) => {
//return breed.origin.toLowerCase() === origin.toLowerCase()
//})
//if (filteredBreeds.length < 1) throw new ValidationError("ghalat input")
//return filteredBreeds
//},
//breed: (root: any, { name }: { name: string }, context) => {
//const filteredBreeds = breeds.filter((breed) => {
//return breed.name.toLowerCase() === name.toLowerCase()
//})
//if (filteredBreeds && filteredBreeds.length > 0)
//return filteredBreeds.pop()
//throw new ValidationError("No Breed found for name!")
//},
