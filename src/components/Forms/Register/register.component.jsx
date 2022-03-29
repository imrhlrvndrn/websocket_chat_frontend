import { Fragment } from 'react';
import { StepAvatar, StepEmail, StepName, StepPassword } from '../..';
import { useSteps } from '../../../hooks';

export const Register = ({ tabs, switchTab }) => {
    const [currentStep, ActiveStep, navigation] = useSteps(
        [StepEmail, StepPassword, StepName, StepAvatar],
        { redirectTo: '/', from: '/authenticate?tab_state=login' }
    );

    // * Unsetting the new room details as soon as this component is unmounted
    // useEffect(() => {
    //     return ()=> activationDispatch({type:'SET_NEW_ROOM', payload:{new_room:{}}})
    // })

    return (
        <Fragment>
            <ActiveStep
                tabs={tabs}
                switchTab={switchTab}
                nextStep={navigation.nextStep}
                previousStep={navigation.previousStep}
            />
        </Fragment>
    );
};
