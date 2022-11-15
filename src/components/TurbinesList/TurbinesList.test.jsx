import React from 'react';
import { render, screen } from '@testing-library/react';
import TurbinesList from './TurbinesList';

const turbines = [
    {
        "turbine": "T1",
        "level": 1,
        "count": 2
    },
    {
        "turbine": "T6",
    },
];

describe('TurbinesList', () => {
    test('renders an error message if a list of turbines does not exist', () => {
        render(<TurbinesList turbines={[]} />);
        expect(screen.getByText('Unable to retrieve turbine data')).toBeInTheDocument();
    });

    test('renders a list of turbines if they exist', () => {
        render(<TurbinesList turbines={turbines} />);
        expect(screen.getAllByRole('listitem')).toHaveLength(2);
    });
});