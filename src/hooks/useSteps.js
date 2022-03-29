import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSteps = (
    steps = [],
    options = { redirectTo: null, from: null },
    initialStep = 1
) => {
    const navigate = useNavigate();
    console.log('steps => ', steps);
    const processedSteps = steps.reduce(
        (acc, curValue, curIndex) => [...acc, { step: curIndex + 1, component: curValue }],
        []
    );
    console.log('processed steps => ', processedSteps);
    const [totalSteps, setTotalSteps] = useState(processedSteps);
    const [currentStep, setCurrentStep] = useState(initialStep);

    const jumpTo = (step) => {
        if (typeof step !== 'number') return;

        if (!!totalSteps[step]) return setCurrentStep(step);
    };

    const nextStep = (event, redirectTo = '') => {
        console.log('nextStep triggered');
        redirectTo = redirectTo ? redirectTo : options.redirectTo;
        let nextStep = currentStep + 1;

        if (nextStep > totalSteps.length && redirectTo) return navigate(redirectTo);
        return setCurrentStep(nextStep);
    };

    const previousStep = (event, goBackTo = '') => {
        goBackTo = goBackTo ? goBackTo : options.from;
        console.log('goBack =>', goBackTo);
        let previousStep = currentStep - 1;
        console.log('previousStep =>', previousStep);
        if (previousStep <= 0 && goBackTo) return navigate(goBackTo);
        return setCurrentStep(previousStep);
    };

    return [
        currentStep,
        totalSteps[currentStep - 1]?.component,
        {
            jumpTo,
            nextStep,
            previousStep,
        },
    ];
};
