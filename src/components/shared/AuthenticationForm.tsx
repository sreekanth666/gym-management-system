import { FC } from 'react';
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    PaperProps,
    Button,
    Divider,
    Anchor,
    Stack,
} from '@mantine/core';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { database } from '../../services/firebase/setup';
import { useNavigate } from 'react-router-dom';

interface AuthenticationFormProps {}

const AuthenticationForm: FC<AuthenticationFormProps> = (props: PaperProps) => {
    const navigate = useNavigate()
    const [type, toggle] = useToggle(['login', 'register']);
    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
        },
        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });
    const handleUserAction = async() => {
        if (type === 'register') {
            try {
                const documentRef = collection(database, 'users')
                await addDoc(documentRef, form.values)
            } catch(error) {
            }
        } else {
            try {
                const { email, password } = form.values;
                const querySnapshot = await getDocs(query(collection(database, 'users'), where('email', '==', email)));
                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0];
                    const userData = userDoc.data();
                    if (userData.password === password) {
                        navigate('/dashboard')
                    } else {
                        console.log('Invalid credentials');
                    }
                } else {
                    console.log('user not found');
                }
        } catch (error) {
            console.log(error);
            
        }
    }
}
    return (
        <div className='d-flex align-items-center justify-content-center' style={{minHeight: '100dvh'}}>
            <Paper radius="md" p="xl" {...props} className='col-sm-12 col-md-6 col-lg-6 col-xl-6'>
                <Text size="lg" fw={500} className='text-center'>
                    Welcome to GMS, Please {type}
                </Text>
                <Divider label="Enter credentials" labelPosition="center" my="lg" />
                <form onSubmit={form.onSubmit(handleUserAction )} className='text-start'>
                    <Stack>
                        {type === 'register' && (
                            <TextInput
                                label="Name"
                                placeholder="Your name"
                                value={form.values.name}
                                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                                radius="md"
                            />
                        )}

                        <TextInput
                            required
                            label="Email"
                            placeholder="hello@mantine.dev"
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                            error={form.errors.email && 'Invalid email'}
                            radius="md"
                        />

                        <PasswordInput
                            required
                            label="Password"
                            placeholder="Your password"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                            error={form.errors.password && 'Password should include at least 6 characters'}
                            radius="md"
                        />
                    </Stack>

                    <Group justify="space-between" mt="xl">
                        <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
                            {type === 'register'
                                ? 'Already have an account? Login'
                                : "Don't have an account? Register"}
                        </Anchor>
                        <Button type="submit" radius="xl">
                            {upperFirst(type)}
                        </Button>
                    </Group>
                </form>
            </Paper>
        </div>
    );
};

export default AuthenticationForm;
