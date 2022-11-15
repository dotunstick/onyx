import React from 'react';
import { render, screen } from '@testing-library/react';
import AlertLevel from './AlertLevel';

describe('AlertLevel', () => {
    test.each`
        level         |    critical       |   warning       |   message                                    
        ${'warning'}  |    ${0}           |   ${3}          |   ${'This turbine has 3 warning alarm(s)'}   
        ${'critical'} |    ${1}           |   ${0}          |   ${'This turbine has 1 critical alarm(s)'}  
        ${'healthy'}  |    ${undefined}   |   ${undefined}  |   ${'This turbine has no alarms'}            
        ${'critical'} |    ${2}           |   ${2}          |   ${'This turbine has 2 critical alarm(s)'}  
    `('renders the correct message for $level alarm level', ({ critical, warning, message, extraMessage }) => {
        render(<AlertLevel warning={warning} critical={critical} />);
        expect(screen.getByText(message)).toBeInTheDocument();
    });
});