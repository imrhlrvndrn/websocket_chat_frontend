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
        (acc, curValue, curIndex) => [
            ...acc,
            { step: curIndex + 1, component: curValue, Props: null },
        ],
        []
    );
    console.log('processed steps => ', processedSteps);
    const [totalSteps, setTotalSteps] = useState(processedSteps);
    const [currentStep, setCurrentStep] = useState(initialStep);

    const jumpTo = (step) => {
        if (typeof step !== 'number') return;

        if (!!totalSteps[step]) return setCurrentStep(step);
    };

    const nextStep = (event, redirectTo = '', props=null) => {
        console.log('nextStep triggered');
        redirectTo = redirectTo ? redirectTo : options.redirectTo;
        let nextStep = currentStep + 1;

        if (nextStep > totalSteps.length && redirectTo) return navigate(redirectTo);
        else if (nextStep > totalSteps.length) return;
        else {
            if(props) setTotalSteps(prevState => prevState?.map(step => ({...step, Props: props})))
            return setCurrentStep(nextStep);
        }
    };

    const previousStep = (event, goBackTo = '', props=null) => {
        goBackTo = goBackTo ? goBackTo : options.from;
        console.log('goBack =>', goBackTo);
        let previousStep = currentStep - 1;
        console.log('previousStep =>', previousStep);

        if (previousStep <= 0 && goBackTo) return navigate(goBackTo);
        else if (previousStep <= 0) return;
        else {
            if(props) setTotalSteps(prevState => prevState?.map(step => ({...step, Props: props})))
            return setCurrentStep(previousStep);
        }
    };

    return [
        currentStep,
        {
            ActiveStep: totalSteps[currentStep - 1]?.component,
            Props: totalSteps[currentStep - 1]?.Props,
        },
        {
            jumpTo,
            nextStep,
            previousStep,
        },
    ];
};
