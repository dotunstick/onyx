import React, { useEffect, useState } from 'react';
import TurbinesList from '../TurbinesList';
import { Filters, Wrapper } from './Turbines.styled';



const test = [
    {
        "turbine": "T1",
        "level": 1,
        "count": 2
    },
    {
        "turbine": "T6",
        "level": 2,
        "count": 1
    },
    {
        "turbine": "T13",
        "level": 1,
        "count": 1
    },
    {
        "turbine": "T13",
        "level": 2,
        "count": 1
    },
    {
        "turbine": "T25",
        "level": 2,
        "count": 3
    },
    {
        "turbine": "T43",
        "level": 1,
        "count": 2
    },
    {
        "turbine": "T44",
        "level": 1,
        "count": 4
    },
    {
        "turbine": "T44",
        "level": 2,
        "count": 1
    },
    {
        "turbine": "T67",
        "level": 2,
        "count": 2
    },
    {
        "turbine": "T82",
        "level": 1,
        "count": 1
    }
];



const Turbines = () => {
    const [turbines, setTurbines] = useState();
    const [filteredTurbines, setFilteredTurbines] = useState([]);
    const [filter, setFilter] = useState();
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        const getTurbines = async () => {
            try {
                const response = await fetch(
                    'https://run.mocky.io/v3/6a13fe7e-840c-4d82-b58f-c737139f0e55'
                );

                const data = await response.json();

                const mergedData = Object.values(data.reduce((accumulator, item) => {
                    let alarms = {};

                    if (item.level === 1) {
                        alarms.warning = item.count
                    }

                    if (item.level === 2) {
                        alarms.critical = item.count
                    }

                    const turbineItem = {
                        id: item.turbine,
                        ...alarms,
                    };

                    let duplicateTurbine = accumulator[turbineItem.id];

                    if (duplicateTurbine) {
                        accumulator[turbineItem.id] = {
                            ...duplicateTurbine,
                            ...alarms,
                        }
                    } else {
                        accumulator[turbineItem.id] = turbineItem;
                    }

                    return accumulator
                }, {}));

                setTurbines(mergedData);
                setShowError(false);
            } catch (error) {
                setShowError(true);
            }
        };

        getTurbines()
    }, []);

    useEffect(() => {
        if (filter) {
            setFilteredTurbines(turbines.filter(turbine =>
                turbine[filter] && turbine
            ));
        }
    }, [filter, turbines]);

    return (
        <Wrapper>
            <h1>Turbines</h1>
            {turbines && (
                <>
                    <label htmlFor="filters">Filters:</label>
                    <Filters name="filters" onChange={e => setFilter(e.target.value)}>
                        <option value="">All</option>
                        <option value="warning">Warning</option>
                        <option value="critical">Critical</option>
                    </Filters>
                    <TurbinesList turbines={filter ? filteredTurbines : turbines} />
                </>
            )
            }
            {showError && <p>An error has occured.</p>}
        </Wrapper>
    )
}

export default Turbines;