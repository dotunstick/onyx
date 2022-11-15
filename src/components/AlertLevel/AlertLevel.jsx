import React from 'react';
import { Critical, Healthy, Warning } from './AlertLevel.styled';

const AlertLevel = ({ warning, critical }) => {
    let noAlarmMessage = "This turbine has no alarms";
    let warningAlarmMessage = `This turbine has ${warning} warning alarm(s)`;
    let criticalAlarmMessage = `This turbine has ${critical} critical alarm(s)`;

    return (
        <>
            {warning && (<Warning>
                {warningAlarmMessage}
            </Warning>)
            }
            {critical && (<Critical>
                {criticalAlarmMessage}
            </Critical>)
            }
            {!warning && !critical && (<Healthy>
                {noAlarmMessage}
            </Healthy>)
            }
        </>
    );
}

export default AlertLevel;