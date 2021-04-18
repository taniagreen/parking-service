import { EmployeeWithProfit, Vehicle } from "../types";

const {
    getPrice,
    getFuelAdded,
    parkingPriceForSmallVehicle,
    parkingPriceForLargeVehicle,
    fuelPrice,
    getIndexWithMinimumProfit,
    getEmployeeProfit,
    getAssignments
} = require('../helpers.ts');

describe('helpers', () => {
    describe('getPrice', () => {
        test('given small size and no refuel needed should return parking price for small vehicle', () => {
            expect(getPrice('small', 11, 100)).toBe(parkingPriceForSmallVehicle);
        });
        test('given large size and no refuel needed should return parking price for small vehicle', () => {
            expect(getPrice('large', 11, 100)).toBe(parkingPriceForLargeVehicle);
        });
        test('given small size and refuel of 90 litres needed should return parking price for small vehicle plus price for 90 litres of fuel', () => {
            expect(getPrice('small', 10, 100)).toBe(parkingPriceForSmallVehicle + fuelPrice * 90);
        });
        test('given large size and refuel of 90 litres needed should return parking price for large vehicle plus price for 90 litres of fuel', () => {
            expect(getPrice('large', 10, 100)).toBe(parkingPriceForLargeVehicle + fuelPrice * 90);
        });
    });
    describe('getFuelAdded', () => {
        test('should return the difference between capacity and level', () => {
            expect(getFuelAdded(100, 10)).toBe(100 - 10);
        });
    });
    describe('getIndexWithMinimumProfit', () => {
        test('given an array of two objects with profit property equal to 0 should return the first object', () => {
            const employees: EmployeeWithProfit[] = [
                {
                    name: 'A',
                    commission: 11,
                    profit: 0
                },
                {
                    name: 'B',
                    commission: 15,
                    profit: 0
                },
            ];
            expect(getIndexWithMinimumProfit(employees)).toBe(0);
        });
        test('given an empty array should return -1', () => {
            const employees: EmployeeWithProfit[] = [];
            expect(getIndexWithMinimumProfit(employees)).toBe(-1);
        });
        test('given an array of two objects with equal profit property should return the first object', () => {
            const employees: EmployeeWithProfit[] = [
                {
                    name: 'A',
                    commission: 11,
                    profit: 10
                },
                {
                    name: 'B',
                    commission: 15,
                    profit: 10
                },
            ];
            expect(getIndexWithMinimumProfit(employees)).toBe(0);
        });
        test('given an array of two objects with different profit property should return the object with larger profit', () => {
            const employees: EmployeeWithProfit[] = [
                {
                    name: 'A',
                    commission: 11,
                    profit: 16
                },
                {
                    name: 'B',
                    commission: 15,
                    profit: 15
                },
            ];
            expect(getIndexWithMinimumProfit(employees)).toBe(1);
        });
    });
    describe('getEmployeeProfit', () => {
        test('given price is 0 should return profit value unchanged', () => {
            const employee: EmployeeWithProfit = {
                name: 'A',
                commission: 11,
                profit: 0
            }
            expect(getEmployeeProfit(employee, 0)).toBe(employee.profit);
        });
        test('given commission is 10 and price is 10 should return profit enlarged by 100', () => {
            const employee: EmployeeWithProfit = {
                name: 'A',
                commission: 10,
                profit: 0
            }
            expect(getEmployeeProfit(employee, 10)).toBe(employee.profit + 100);
        });
    });
    describe('getAssignments', () => {
        test('given vehicles is an empty array should return an empty array', () => {
            const employees: EmployeeWithProfit[] = [
                {
                    name: 'A',
                    commission: 11,
                    profit: 16
                },
                {
                    name: 'B',
                    commission: 15,
                    profit: 15
                },
            ];
            expect(getAssignments([], employees)).toStrictEqual([]);
        });
        test('given vehicles is an empty array should return an empty array', () => {
            const vehicles: Vehicle[] = [
                {
                    licencePlate: 'A',
                    size: 'small',
                    fuel: {
                        capacity: 58,
                        level: 0.5
                    }
                },
                {
                    licencePlate: 'B',
                    size: 'large',
                    fuel: {
                        capacity: 88,
                        level: 0.5
                    }
                },
            ];
            expect(getAssignments(vehicles, [])).toStrictEqual([]);
        });
        test('given vehicles is an empty array and employees is an empty array should return an empty array', () => {
            expect(getAssignments([], [])).toStrictEqual([]);
        });
    });
});