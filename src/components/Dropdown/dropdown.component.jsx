import { Fragment, useEffect } from 'react';
import { useTheme } from '../../context';
import { useExternalEventDetector } from '../../hooks';
import { ReactComponent as ChevronRight } from '../../react_icons/chevron_right.svg';

// styles
import { Text } from '../../styled_components';
import { Dropdown, DropdownItem } from './dropdown.styledcomponent';

export const DropdownMenu = ({ visible, setDropdownMapping, menus }) => {
    const [{ theme }] = useTheme();

    const captureDropdownMenuItemEvents = (event, menu_item) => {
        setDropdownMapping((prevState) =>
            prevState?.map((menu) => (menu?.visible ? { ...menu, visible: false } : menu))
        );
        menu_item?.event_handler();
    };

    return (
        <Fragment>
            {visible && (
                <Dropdown>
                    {menus?.map((menu_item) => (
                        <DropdownMenuItem
                            left_icon={
                                <ChevronRight stroke={theme?.colors?.constants?.primary?.medium} />
                            }
                            right_icon={
                                <ChevronRight stroke={theme?.colors?.constants?.primary?.medium} />
                            }
                            onClick={(event) => captureDropdownMenuItemEvents(event, menu_item)}
                        >
                            <Text width='max-content'>{menu_item?.label}</Text>
                        </DropdownMenuItem>
                    ))}
                </Dropdown>
            )}
        </Fragment>
    );
};

export const DropdownMenuItem = ({ left_icon, right_icon, children, ...props }) => {
    return (
        <DropdownItem {...props}>
            <div className='icon-left icon-button'>{left_icon}</div>
            {children}
            <div className='icon-right' style={{ marginRight: 0 }}>
                {right_icon}
            </div>
        </DropdownItem>
    );
};
