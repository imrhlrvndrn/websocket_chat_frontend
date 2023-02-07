import React, { Fragment } from 'react';
import { useSteps } from '../../../hooks';

// components
import { GroupName, AddMembers, GroupIcon } from '../..';
import { SuccessStep } from '../../MultiStepForm/CreateGroupChat/SuccessStep/successstep.component';

export const CreateGroupChat = () => {
    const [currentStep, { ActiveStep, Props }, navigation] = useSteps([
        GroupName,
        AddMembers,
        GroupIcon,
        SuccessStep,
    ]);

    return (
        <Fragment>
            <ActiveStep
                nextStep={navigation?.nextStep}
                previousStep={navigation?.previousStep}
                {...Props}
            />
        </Fragment>
    );
};
