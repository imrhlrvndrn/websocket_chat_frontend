//components
import { Modal, Input, Button } from '../../';
import { useModalManager, useTheme } from '../../../context';

// styled components
import { Flex } from '../../../styled_components';
import { SelectInput } from '../../shared/SelectInput/selectinput.component';

export const CreateGroupInvite = () => {
    const [{ theme }] = useTheme();
    const { hideModal } = useModalManager();

    return (
        <Modal title={{ content: 'Create New Invite Link' }}>
            <form style={{ width: '500px' }} onSubmit={() => {}}>
                <Input
                    placeholder='https://localhost:3000/invite?token=fkldasfjneqirugbnrjkegjeiurh4325h4uith45j'
                    onChange={
                        (event) => {}
                        // setSearch((prevState) => ({ ...prevState, query: event?.target?.value }))
                    }
                    style={{ backgroundColor: theme?.colors?.mediumBackground }}
                />
                <SelectInput/>
                <Flex margin='4rem 0 0 0'>
                    <Button variant='secondary' onClick={() => hideModal()}>
                        Cancel
                    </Button>
                    <Button disabled={false} type='submit'>
                        Generate a new link
                    </Button>
                </Flex>
            </form>
        </Modal>
    );
};
