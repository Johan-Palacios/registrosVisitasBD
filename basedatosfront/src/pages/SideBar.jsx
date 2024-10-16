import { Avatar, AvatarBadge, Box, Drawer, DrawerContent, DrawerOverlay, Flex, Icon, IconButton, Text, useDisclosure } from "@chakra-ui/react";
import SidebarContent from '@components/userInteraction/SidebarContent.jsx'
import { AtSignIcon, HamburgerIcon } from "@chakra-ui/icons";

const Sidebar = () => {
  const sidebar = useDisclosure();
    return (
    <Box
      as="section"
      bg="gray.50"
      _dark={{
        bg: "gray.700",
        }}
      minH="100vh"
    >
      <SidebarContent
        display={{
          base: "none",
          md: "unset",
        }}
      />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box
        ml={{
          base: 0,
          md: 60,
        }}
        transition=".3s ease"
      >
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg="white"
          _dark={{
            bg: "gray.800",
          }}
          borderBottomWidth="1px"
          color="inherit"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{
              base: "inline-flex",
              md: "none",
            }}
            onClick={sidebar.onOpen}
            icon={<HamburgerIcon/>}
            size="sm"
          />
          <Text
            w="96"
            display={{
              base: "none",
              md: "flex",
            }}
          >
            Proyecto BD I
          </Text>

          <Flex
            align="center">
            <Icon color="gray.500" as={AtSignIcon} cursor="pointer" />
            <Avatar
              ml="4"
              size="sm"
              name="Johan-Palacios"
              src="https://avatars.githubusercontent.com/u/77251405?v=4"
              cursor="pointer"
            >
              <AvatarBadge bg='green.500' boxSize='1.25em' />

            </Avatar>
          </Flex>
        </Flex>

        <Box as="main" p="4">
          {/* Add content here, remove div below  */}
          <Box borderWidth="4px" borderStyle="dashed" rounded="md" h="96" />
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar

