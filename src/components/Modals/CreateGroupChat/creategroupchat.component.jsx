import { Fragment } from 'react';
import { useSteps } from '../../../hooks';

// components
import { GroupName, AddMembers } from '../..';

export const CreateGroupChat = () => {
    const [currentStep, ActiveStep, navigation] = useSteps([GroupName, AddMembers]);

    return (
        <Fragment>
            <ActiveStep nextStep={navigation.nextStep} previousStep={navigation.previousStep} />
        </Fragment>
    );
};
