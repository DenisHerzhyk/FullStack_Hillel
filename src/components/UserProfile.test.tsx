import UserProfile from './UserProfile';
import React from 'react';
import {render,act, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import fetchData from './fetchData';
import AnimalInterface from './AnimalInterface';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Loading Check Test", () => {    
    test("displays loading message initially", async () => {
        render(<UserProfile />); 
        expect(screen.getByText(/🔄Loading.../i)).toBeInTheDocument();
    });

    test("display error message initially", async() => {
        mockedAxios.get.mockResolvedValue({
            data: [
                {
                    "name": "",
                    "species" : "cat",
                    "foods": {
                      "likes": ["tuna", "catnip"],
                      "dislikes": ["ham", "zucchini"]
                    }
                },
                {
                    "name": "Barky",
                    "species" : "dog",
                    "foods": {
                        "likes": ["bones", "carrots"],
                        "dislikes": ["tuna"]
                    }
                },
                {
                    "name": "Purrpaws",
                    "species" : "cat",
                    "foods": {
                        "likes": ["mice"],
                        "dislikes": ["cookies"]
                    }
                }
            ]
        })
        await act(async () => {
            render(<UserProfile/>)
        })
    
        await waitFor(() => {
            expect(screen.getByText(/Error: Invalid data: Animal name is required/i)).toBeInTheDocument();
        }, {timeout: 3000})
    })

    test("display correct data", async() => {
        mockedAxios.get.mockResolvedValue({
            data: [
                {
                    "name": "Meowsy",
                    "species" : "cat",
                    "foods": {
                      "likes": ["tuna", "catnip"],
                      "dislikes": ["ham", "zucchini"]
                    }
                },
                {
                    "name": "Barky",
                    "species" : "dog",
                    "foods": {
                        "likes": ["bones", "carrots"],
                        "dislikes": ["tuna"]
                    }
                },
                {
                    "name": "Purrpaws",
                    "species" : "cat",
                    "foods": {
                        "likes": ["mice"],
                        "dislikes": ["cookies"]
                    }
                }
            ]
        })
        
        await act(async() => {
            render(<UserProfile/>)
        })
    
        await waitFor(() => {
            const nameItem = screen.getByText("Meowsy").closest('li');
            expect(nameItem).toHaveTextContent("MeowsyType: cat❤️Likes: tuna, catnip💔Displikes: ham, zucchini")
        }, {timeout: 3000})
        
    })


    test("verify correct requested data" , async () => {
        mockedAxios.get.mockResolvedValue({
            data: [
                {
                    "name": "Meowsy",
                    "species" : "cat",
                    "foods": {
                      "likes": ["tuna", "catnip"],
                      "dislikes": ["ham", "zucchini"]
                    }
                },
                {
                    "name": "Barky",
                    "species" : "dog",
                    "foods": {
                        "likes": ["bones", "carrots"],
                        "dislikes": ["tuna"]
                    }
                },
                {
                    "name": "Purrpaws",
                    "species" : "cat",
                    "foods": {
                        "likes": ["mice"],
                        "dislikes": ["cookies"]
                    }
                }
            ]
        })
        const animalData: AnimalInterface[] = await fetchData()
        animalData.forEach((a) => {
            expect(a.name).toBeTruthy();
            expect(a.species).toMatch(/cat|dog/);
            expect(a.foods.likes).toBeInstanceOf(Array);
            expect(a.foods.dislikes).toBeInstanceOf(Array);
        })
    })
})