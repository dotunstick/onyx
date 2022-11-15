import styled from 'styled-components';

export const Warning = styled.div`
    ::before {
        display: inline-block;
        content: '';
        height: 0.75rem;
        width: 0.75rem;
        border-radius: 100%;
        background: orange;
        margin-right: 0.25rem;
    }
`

export const Critical = styled.div`
    ::before {
        display: inline-block;
        content: '';
        height: 0.75rem;
        width: 0.75rem;
        border-radius: 100%;
        background: red;
        margin-right: 0.25rem;
    }
`

export const Healthy = styled.div`
    ::before {
        display: inline-block;
        content: '';
        height: 0.75rem;
        width: 0.75rem;
        border-radius: 100%;
        background: green;
        margin-right: 0.25rem;
    }
`