import React, { Fragment } from 'react';
import { useSteps } from '../../../hooks';

// components
import { GroupName, AddMembers, GroupIcon } from '../..';

export const CreateGroupChat = () => {
    const [currentStep, ActiveStep, navigation] = useSteps([GroupName, AddMembers, GroupIcon]);

    return (
        <Fragment>
            <ActiveStep nextStep={navigation.nextStep} previousStep={navigation.previousStep} />
        </Fragment>
    );
};
