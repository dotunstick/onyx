import React from 'react';
import AlertLevel from '../AlertLevel';
import { Name, StyledEmptyMessage, StyledTurbinesList, TurbineListItem } from './TurbinesList.styled';

const NoTurbinesMessage = () => <StyledEmptyMessage>Unable to retrieve turbine data</StyledEmptyMessage>;

const TurbinesList = ({ turbines }) => turbines.length > 0 ? (
    <StyledTurbinesList>
        {turbines.map((turbine, index) => (
            <TurbineListItem key={`${index}${turbine.id}`}>
                <Name>{turbine.id}</Name>
                <AlertLevel warning={turbine.warning} critical={turbine.critical} />
            </TurbineListItem>
        ))}
    </StyledTurbinesList>
) : <NoTurbinesMessage />

export default TurbinesList;