<AppShell
      navbar={
        <AppShellNavbar width={{ base: 300 }} p="md">
          <Container>
            <Group position="center">
              <Title>Profile</Title>
            </Group>
            <Stack>
              <Button variant="filled">Change Password</Button>
            </Stack>
          </Container>
        </AppShellNavbar>
      }
      main={
        <AppShellMain p="md">
          <Container size="sm" ml={30}>
            <Stack mt={10} mb={20}>
              <Title c={"red.6"}>Profile</Title>
              <Text c={"gray.6"}>Manage your account settings</Text>
            </Stack>
            <Text>Profile Information</Text>
            <Text>Name: {user.userName}</Text>
            <Text>Email: {user.userEmail}</Text>
            <Text weight="bold">Account Settings</Text>
            <form onSubmit={form.onSubmit((values, event) => {
              event.preventDefault();
              handleSubmit(values);
            })}>
              <PasswordInput label="Password" placeholder="Password" size="md" icon={<IconLock size={18} />} mb="md" {...form.getInputProps("password")} />
              <PasswordInput label="New Password" placeholder="New Password" size="md" icon={<IconLock size={18} />} mb="md" {...form.getInputProps("newPassword")} />
              <PasswordInput label="Confirm Password" placeholder="Confirm Password" size="md" icon={<IconLock size={18} />} mb="md" {...form.getInputProps("confirmPassword")} />
              <Button type="submit" variant="filled">
                Submit
              </Button>
            </form>
          </Container>
        </AppShellMain>
      }
    />