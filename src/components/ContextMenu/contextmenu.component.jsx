import React, { forwardRef, Fragment } from 'react';
import { useContextMenu, useExternalEventDetector } from '../../hooks';
import { Text } from '../../styled_components';

// Styled components
import StyledContextMenu from './contextmenu.styledcomponent';

export const ContextMenu =
    // forwardRef(
    ({ menu, targetIdentifier = '#dummy' }) => {
        const { elementRef, visibility, setVisibility } = useExternalEventDetector([
            'click',
            'contextmenu',
        ]);
        const { xPos, yPos } = useContextMenu(targetIdentifier, setVisibility);

        console.log('contextMenu Props => ', {
            menu,
            targetIdentifier,
            visibility,
            setVisibility,
        });

        return (
            <Fragment>
                {visibility && (
                    <div ref={elementRef}>
                        <StyledContextMenu style={{ top: yPos, left: xPos }}>
                            {menu.map((menuItem) => (
                                <Text className='contextMenu_item'>{menuItem?.label}</Text>
                            ))}
                        </StyledContextMenu>
                    </div>
                )}
            </Fragment>
        );
    };
// );
