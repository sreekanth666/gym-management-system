import { Button, Flex, Modal, NumberInput, SimpleGrid, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconCoinRupee, IconHome, IconHospital, IconMail, IconPlus, IconRuler, IconUser, IconWeight } from '@tabler/icons-react';
import { FC } from 'react';
import { addDocService } from '../../../services/app/common/addDoc.service';
import { DB } from '../../../constants/db.constant';
import { notifications } from '@mantine/notifications';
import { SUCCESS_MESSAGE } from '../../../constants/success.constants';
import { ERROR_MESSAGE } from '../../../constants/error.constant';

interface AddMemberModalProps {
}

const AddMemberModal: FC<AddMemberModalProps> = ({ }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const userDetails = useForm({
        initialValues: {
            username: "",
            email: "",
            address: "",
            fees: "",
            weight: "",
            height: "",
            healthCondition: ""
        },
        validate: {
            username: (value) => (value.length === 0 ? "Username is required" : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            address: (value) => (value.length === 0 ? "Address is required" : null),
            fees: (value) => (value.length === 0 ? "Fees detail is required" : null),
            weight: (value) => (value.length === 0 ? "Physical detail is required" : null),
            height: (value) => (value.length === 0 ? "Physical detail is required" : null),
            healthCondition: (value) => (value.length === 0 ? "Health detail is required" : null)
        }
    })

    const formSubmitHandler = async () => {
        try {
            const result = await addDocService(userDetails.values, DB.USER)
            console.log(result);
            if (result.success) {
                close()
                notifications.show({
                    title: 'Success',
                    message: SUCCESS_MESSAGE.REGISTER,
                    color: 'green'
                })
            } else {
                notifications.show({
                    title: 'Error',
                    message: ERROR_MESSAGE.REG_FAIL,
                    color: 'red'
                })
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <Button mb="md" onClick={open} rightSection={<IconPlus />} radius='xl'>Add Member</Button>

            <Modal size="xl" opened={opened} onClose={close} title="Add Member" centered>
                <form onSubmit={userDetails.onSubmit(formSubmitHandler)}>
                    <SimpleGrid cols={2}>
                        <TextInput label="Name" placeholder="Enter Name" leftSection={<IconUser />} {...userDetails.getInputProps('username')} />
                        <TextInput label="Email" placeholder="Enter Email" leftSection={<IconMail />} {...userDetails.getInputProps('email')} />
                        <Textarea label="Address" placeholder="Enter Address" leftSection={<IconHome />} {...userDetails.getInputProps('address')} />
                        <NumberInput
                            placeholder="Fee Per Month"
                            label="Fees (Rs)"
                            hideControls
                            leftSection={<IconCoinRupee />}
                            {...userDetails.getInputProps('fees')}
                        />
                        <NumberInput
                            placeholder="Enter Weight"
                            label="Weight (Kg)"
                            hideControls
                            leftSection={<IconWeight />}
                            {...userDetails.getInputProps('weight')}
                        />
                        <NumberInput
                            placeholder="Enter Height"
                            label="Height (cm)"
                            hideControls
                            leftSection={<IconRuler />}
                            {...userDetails.getInputProps('height')}
                        />
                        <Textarea label="Health Condition" placeholder="Enter Health Condition" leftSection={<IconHospital />} {...userDetails.getInputProps('healthCondition')} />
                    </SimpleGrid>
                    <Flex justify={'center'}><Button mt="xl" radius='xl' type='submit'>Register User</Button></Flex>
                </form>
            </Modal>
        </>
    );
};

export default AddMemberModal;