import { Assignment, Employee, EmployeeWithProfit, Vehicle, Size } from './types';

export const fuelPrice = 1.75;
export const parkingPriceForSmallVehicle = 25;
export const parkingPriceForLargeVehicle = 35;
const refuelThresholdPercent = 10;

export const getPrice = (size: Size, level: number, capacity: number): number => {
    let price = size === 'small' ? parkingPriceForSmallVehicle : parkingPriceForLargeVehicle;

    const isRefueled = (capacity/100)*level <= refuelThresholdPercent;

    if (isRefueled) {
        price = price + getFuelAdded(capacity, level)*fuelPrice;
    }

    return price;
};

export const getFuelAdded = (capacity: number, level: number): number => {
    return capacity - level;
};

export const getIndexWithMinimumProfit = (employees: EmployeeWithProfit[]): number => {
    const profits = employees.map(employee => employee.profit);
    const minimumProfit = Math.min(...profits) as number;

    return employees.findIndex(employee => employee.profit === minimumProfit);
};

export const getEmployeeProfit = (employee: EmployeeWithProfit, price: number): number => {
    return employee.profit + price*employee.commission;
};

export const getAssignments = (vehicles: Vehicle[], employees: Employee[]): Assignment[] => {
    if (!vehicles.length || !employees.length) {
        return [];
    }

    let employeesData = employees.map(item => ({ ...item, profit: 0 }));

    return vehicles.map(item => {
        const price = getPrice(item.size, item.fuel.level, item.fuel.capacity);
        const index = getIndexWithMinimumProfit(employeesData);

        if (index >= 0) {
            employeesData[index].profit = getEmployeeProfit(employeesData[index], price);
        };

        return {
            licencePlate: item.licencePlate,
            employee: employeesData[index]?.name,
            fuelAdded: getFuelAdded(item.fuel.capacity, item.fuel.level),
            price: price
        };
    })
};
