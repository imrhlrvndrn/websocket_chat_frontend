import React, { useRef } from 'react';
import { useContextMenu } from '../../hooks';
import { Text } from '../../styledcomponents';

// Styled components
import StyledContextMenu from './contextmenu.styledcomponent';

export const ContextMenu = ({ menu, className = 'dummy', children }) => {
    const contextMenuRef = useRef(null);
    const { xPos, yPos, showMenu } = useContextMenu(`${className}-contextmenu`);

    return (
        <div
            className={`${className}-contextmenu`}
            onClick={() => console.log('The ref is clicked via the hook')}
        >
            {children}
            {showMenu && (
                <StyledContextMenu style={{ top: yPos, left: xPos }}>
                    {menu.map((menuItem) => (
                        <Text className='contextMenu_item'>{menuItem}</Text>
                    ))}
                </StyledContextMenu>
            )}
        </div>
    );
};
