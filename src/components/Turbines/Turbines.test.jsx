import React from 'react';
import { render, screen } from '@testing-library/react';
import Turbines from './Turbines';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

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

describe('Turbines', () => {
    test('renders a filter and a list of turbines if they exist', async () => {
        jest.spyOn(global, "fetch").mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve(turbines)
            })
        );

        await act(async () => {
            render(<Turbines />);
        });

        expect(screen.getAllByRole('listitem')).toHaveLength(2);
        expect(screen.getByRole('combobox')).toBeInTheDocument();
        expect(screen.queryByText('An error has occured.')).not.toBeInTheDocument();
    });

    test('filters the results when a filter is selected', async () => {
        jest.spyOn(global, "fetch").mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve(turbines)
            })
        );

        await act(async () => {
            render(<Turbines />);
        });

        const filter = screen.getByRole('combobox');
        userEvent.selectOptions(filter, 'warning');
        expect(screen.getAllByRole('listitem')).toHaveLength(1);
    });

    test('does not render a list of turbines or filter if no turbine data can be retrieved', async () => {
        jest.spyOn(global, "fetch").mockImplementationOnce(() =>
            Promise.reject(() => 'Error!')
        );

        await act(async () => {
            render(<Turbines />);
        });

        expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
        expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
        expect(screen.getByText('An error has occured.')).toBeInTheDocument();
    });
});