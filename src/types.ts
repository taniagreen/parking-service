interface Fuel {
    capacity: number;
    level: number;
};

export type Size = 'small' | 'large';

export interface Vehicle {
    licencePlate: string;
    size: Size;
    fuel: Fuel;
};

export interface Employee {
    name: string;
    commission: number;
};

export interface EmployeeWithProfit extends Employee {
    profit: number;
};


export interface Assignment {
    licencePlate: string;
    employee: string;
    fuelAdded: number;
    price: number;
};
