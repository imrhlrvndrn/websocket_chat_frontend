import { Fragment, useState } from 'react';
import { useTheme } from '../../../context';
import { useExternalEventDetector } from '../../../hooks';
import { ArrowRight } from '../../../react_icons';

// styled components
import { Flex, Text } from '../../../styled_components';
import {
    SelectInputContainer,
    SelectOption,
    SelectOptionsContainer,
} from './selectinput.styledcomponent';

export const SelectInput = ({
    onSelect,
    select_options = ['Dummy Option 1', 'Dummy Option 2'],
}) => {
    const [{ theme }] = useTheme();
    const { visibility, setVisibility, elementRef } = useExternalEventDetector(['click']);
    const [selectedOptionValue, setSelectedOptionValue] = useState('None');

    const displaySelectOptions = () => {
        setVisibility((prevState) => !prevState);
        console.log('Select input is clicked...');
    };

    return (
        <Fragment>
            <SelectInputContainer tabIndex={0} onClick={displaySelectOptions}>
                <Flex>
                    <Text style={{ flexGrow: 1 }}>{selectedOptionValue}</Text>
                    <ArrowRight color={theme?.colors?.icon} />
                </Flex>
            </SelectInputContainer>
            <SelectOptionsContainer
                margin={visibility ? '1rem 0' : '0'}
                background={visibility ? theme?.colors?.mediumBackground : 'transparent'}
                className='selectOptionContainer'
                ref={elementRef}
            >
                {visibility &&
                    select_options?.map((option) => (
                        <SelectOption tabIndex={0}>
                            <Text>{option}</Text>
                        </SelectOption>
                    ))}
            </SelectOptionsContainer>
        </Fragment>
    );
};
