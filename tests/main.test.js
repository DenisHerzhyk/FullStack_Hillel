import {sum, divide} from "../src/main.js";
import {test, expect, describe} from 'vitest';

//sum
describe("Sum function", () => {
    test("sum(1,2) returns 3", async () => {
        await expect(sum(1, 2)).resolves.toBe(3);
    });
    test("sum(-1, -2) returns -3", async () => {
        await expect(sum(-1, -2)).resolves.toBe(-3);
    });
    test("sum(0.5, 2.7) returns 3.2", async () => {
        await expect(sum(0.5, 2.7)).resolves.toBe(3.2);
    })
    test("sum(-4,5) returns 1", async () => {
        await expect(sum(-4, 5)).resolves.toBe(1);
    })
    test("sum('10', 5) returns 15", async () => {
        await expect(sum('10', 5)).resolves.toBe(15);
    })
})

//divide
describe("Divide function", () => {
    test("divide(6,3) returns 2", async () => {
        await expect(divide(6,3)).resolves.toBe(2);
    })
    test("divide(0, 3) returns 0", async () => {
        await expect(divide(0, 3)).resolves.toBe(0);
    })
    test("divide(-6,3) returns -2", async () => {
        await expect(divide(-6, 3)).resolves.toBe(-2);
    })
    test("divide(6,'3') returns 2", async () => {
        await expect(divide(6, '3')).resolves.toBe(2);
    })
    test("divide(6,0) returns error - Cannot divide by zero", async () => {
        await expect(() => divide(6, 0)).rejects.toThrowError("Cannot divide by zero");
    })
})

