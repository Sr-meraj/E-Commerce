import React from 'react';


const Step = ({ label, isActive }) => {
    const stepClassName = isActive ? 'step step-success after:step-white' : 'step';

    return (
        <li className={stepClassName}>
            {label}
        </li>
    );
};

const Steps = ({ activeStep }) => {
    const steps = [
        { label: 'Placed', id: 1, },
        { label: 'Order Confirmed', id: 2, },
        { label: 'Shipped', id: 3, },
        { label: 'Out for delivery', id: 4, },
        { label: 'Delivered', id: 5, },
    ];

    return (
        <ul className="steps w-full">
            {steps.map((step) => {
                const isActive = step.id <= activeStep;

                return <Step key={step.id} label={step.label} isActive={isActive} />;
            })}
        </ul>
    );
};

export default Steps;
