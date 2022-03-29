import { Fragment } from 'react';

// styles
import { Text } from '../../../../styledcomponents';

// components
import { Card, CardContent, CardHeader, Email } from '../../..';

export const StepEmail = ({ nextStep, previousStep }) => {
    return (
        <Fragment>
            <Card>
                <CardHeader text={`Please enter your email address`} />
                <CardContent>
                    <Email nextStep={nextStep} previousStep={previousStep} />
                    <Text
                        opacity='.6'
                        size='caption/large'
                        width='70%'
                        margin='1rem 0 0 0'
                        align='center'
                    >
                        By continuing you're agreeing to our Privacy Terms &amp; Community
                        Guidelines
                    </Text>
                </CardContent>
            </Card>
        </Fragment>
    );
};
