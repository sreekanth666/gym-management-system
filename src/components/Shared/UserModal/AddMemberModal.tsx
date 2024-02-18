import { Button, Flex, Modal, NumberInput, PasswordInput, SimpleGrid, TextInput, Textarea, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconCoinRupee, IconHome, IconHospital, IconLock, IconMail, IconPencil, IconPlus, IconRuler, IconUser, IconWeight } from '@tabler/icons-react';
import { FC, useEffect } from 'react';
import { addDocService } from '../../../services/app/common/addDoc.service';
import { DB } from '../../../constants/db.constant';
import { notifications } from '@mantine/notifications';
import { SUCCESS_MESSAGE } from '../../../constants/success.constants';
import { ERROR_MESSAGE } from '../../../constants/error.constant';
import { partialUpdateDocService } from '../../../services/app/common/updateDoc.service';

interface AddMemberModalProps {
    isEditing: boolean
    editingData?: any
}

const AddMemberModal: FC<AddMemberModalProps> = ({ isEditing, editingData }) => {    
    const [opened, { open, close }] = useDisclosure(false);
    const userDetails = useForm({
        initialValues: {
            username: "",
            email: "",
            address: "",
            fees: "",
            weight: "",
            height: "",
            healthCondition: "",
            password: "",
            role: "member"
        },
        validate: {
            username: (value) => (value.length === 0 ? "Username is required" : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            address: (value) => (value.length === 0 ? "Address is required" : null),
            fees: (value) => (value.length === 0 ? "Fees detail is required" : null),
            weight: (value) => (value.length === 0 ? "Physical detail is required" : null),
            height: (value) => (value.length === 0 ? "Physical detail is required" : null),
            healthCondition: (value) => (value.length === 0 ? "Health detail is required" : null),
            password: (value) => (value.length > 6 ? null : "Password must be at least 7 characters")
        }
    })

    const formSubmitHandler = async () => {
        if (!isEditing) {
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
        if (isEditing) {
            try {
                const result = await partialUpdateDocService(editingData.id, userDetails.values, DB.USER)
                if (result.success) {
                    close()
                    notifications.show({
                        title: 'Success',
                        message: SUCCESS_MESSAGE.UPDATED,
                        color: 'green'
                    })
                } else {
                    notifications.show({
                        title: 'Error',
                        message: ERROR_MESSAGE.DEFAULT,
                        color: 'red'
                    })
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    useEffect(() => {
        if (isEditing) {
            userDetails.setFieldValue('address', editingData.address)
            userDetails.setFieldValue('email', editingData.email)
            userDetails.setFieldValue('fees', editingData.fees)
            userDetails.setFieldValue('healthCondition', editingData.healthCondition)
            userDetails.setFieldValue('password', editingData.password)
            userDetails.setFieldValue('username', editingData.username)
            userDetails.setFieldValue('weight', editingData.weight)
            userDetails.setFieldValue('height', editingData.height)
        }
    }, [])
    return (
        <>
            {
                isEditing ?
                <IconPencil onClick={open} style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                :
                <Button mb="md" onClick={open} rightSection={<IconPlus />} radius='xl'>Add Member</Button>
            }

            <Modal size="xl" opened={opened} onClose={close} title="Add Member" centered>
                <form onSubmit={userDetails.onSubmit(formSubmitHandler)}>
                    <SimpleGrid cols={2}>
                        <TextInput label="Name" placeholder="Enter Name" leftSection={<IconUser />} {...userDetails.getInputProps('username')} />
                        <TextInput label="Email" placeholder="Enter Email" leftSection={<IconMail />} {...userDetails.getInputProps('email')} />
                        <PasswordInput label="Password" placeholder="Enter Password" leftSection={<IconLock />} {...userDetails.getInputProps('password')} />
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
                        <Textarea label="Address" placeholder="Enter Address" leftSection={<IconHome />} {...userDetails.getInputProps('address')} />
                        <Textarea label="Health Condition" placeholder="Enter Health Condition" leftSection={<IconHospital />} {...userDetails.getInputProps('healthCondition')} />
                    </SimpleGrid>
                    <Flex justify={'center'}><Button mt="xl" radius='xl' type='submit'>{isEditing ? "Update User" : "Register User"}</Button></Flex>
                </form>
            </Modal>
        </>
    );
};

export default AddMemberModal;