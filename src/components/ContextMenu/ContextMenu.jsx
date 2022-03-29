import React from 'react';
import useContextMenu from '../../utils/useContextMenu';

// Styled components
import StyledContextMenu from './StyledContextMenu';

const ContextMenu = ({ menu }) => {
    const { xPos, yPos, showMenu } = useContextMenu();

    return (
        <>
            {showMenu && (
                <StyledContextMenu style={{ top: yPos, left: xPos }}>
                    {menu.map((menuItem) => (
                        <span className='contextMenu_item'>{menuItem}</span>
                    ))}
                </StyledContextMenu>
            )}
        </>
    );
};

export default ContextMenu;
