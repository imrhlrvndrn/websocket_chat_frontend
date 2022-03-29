// styles
import { Flex } from '../../../../styledcomponents';

// components
import { Card, CardContent, CardHeader, Password } from '../../..';

export const StepPassword = ({ nextStep, previousStep }) => {
    return (
        <Card>
            <CardHeader text={`Please enter your password`} />
            <CardContent>
                <Password nextStep={nextStep} previousStep={previousStep} />
            </CardContent>
        </Card>
    );
};
