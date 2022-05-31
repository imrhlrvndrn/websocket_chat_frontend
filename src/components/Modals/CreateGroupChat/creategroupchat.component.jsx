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
    console.log('The step prop s=> ', Props);

    const renderWithProps = (Props = null) => {
        console.log('The step props in the function => ', Props);
        if (Props) {
            console.log('Processings Props...');
            let stepKeys = Object.keys(Props);
            console.log('Prop keys => ', stepKeys);
            let values = stepKeys?.map((key) => ([key] = Props[key]));
            console.log('Prop key/value pair => ', values);
            return values;
        }
        return {};
    };

    return (
        <Fragment>
            <ActiveStep
                nextStep={navigation.nextStep}
                previousStep={navigation.previousStep}
                {...Props}
            />
        </Fragment>
    );
};
