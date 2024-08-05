import { Container, Text, Button, PasswordInput, TextInput, Anchor } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAt, IconLock, IconUser } from '@tabler/icons-react';

function SignUpPage() {
    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: {
            name: (value) => (value.length < 2 ? 'Name must be at least 2 characters long' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length < 6 ? 'Password should be at least 6 characters long' : null),
            confirmPassword: (value, values) => (value !== values.password ? 'Passwords do not match' : null),
        },
    });

    return (
        <Container size="lg" w={350} py="xl">
            <Text align="center" size="xl" weight="bold" mb="md">
                Create an account
            </Text>
            <Text align="center" size="sm" color="gray" mb="lg">
                Please enter your details to sign up
            </Text>
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <TextInput
                    label="Name"
                    placeholder="Your name"
                    size="md"
                    icon={<IconUser size={18} />}
                    mb="md"
                    {...form.getInputProps('name')}
                />
                <TextInput
                    label="Email"
                    placeholder="your@email.com"
                    size="md"
                    icon={<IconAt size={18} />}
                    mb="md"
                    {...form.getInputProps('email')}
                />
                <PasswordInput
                    label="Password"
                    placeholder="Password"
                    size="md"
                    icon={<IconLock size={18} />}
                    mb="md"
                    {...form.getInputProps('password')}
                />
                <PasswordInput
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    size="md"
                    icon={<IconLock size={18} />}
                    mb="md"
                    {...form.getInputProps('confirmPassword')}
                />
                <Button type="submit" w={"100%"} size="md" radius="md">
                    Sign Up
                </Button>
            </form>
            <Text align="center" size="sm" mt="md" c={"gray"}>
                Already have an account?{' '}
                <Anchor c={"red"} href="/login">
                    Log In
                </Anchor>
            </Text>
        </Container>
    );
}

export default SignUpPage;