import React, { Fragment } from 'react';
import { useSteps } from '../../../hooks';

// components
import { GroupName, AddMembers, StepAvatar } from '../..';

export const CreateGroupChat = () => {
    // const [currentStep, ActiveStep, navigation] = useSteps([GroupName, AddMembers, StepAvatar]);
    const [currentStep, ActiveStep, navigation] = useSteps([AddMembers]);

    return (
        <Fragment>
            <ActiveStep nextStep={navigation.nextStep} previousStep={navigation.previousStep} />
        </Fragment>
    );
};
