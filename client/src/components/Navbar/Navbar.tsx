import { endPoint } from "@/assets/assets";
import { useGetProfile } from "@/hooks/get/useGetProfile";
import { searchBoxToggle } from "@/zustand/searchBoxToggle";
import { useSearch } from "@/zustand/search";
import {
  Box,
  Button,
  Container,
  Flex,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  Link,
  Span,
} from "@chakra-ui/react";
import cookie from "js-cookie";
import { useState } from "react";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { isVisible, setVisible } = searchBoxToggle();
  const { query, setQuery } = useSearch();
  const [searchValue, setSearchValue] = useState(query);

  const handleGoogleOAuth = () =>
    (window.location.href = endPoint + "auth/google/callback");

  const { data } = useGetProfile();
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmedValue = searchValue.trim();
    if (!trimmedValue) return;

    setQuery(trimmedValue);
    navigate("/search");
    setSearchValue("");
  };

  return (
    <Box
      as="nav"
      borderBottom="1px solid var(--color-border-subtle)"
      bgColor="var(--color-background-secondary)"
      p={3}
    >
      <Container
        display="flex"
        alignItems="center"
        gap={4}
        justifyContent="space-between"
      >
        <Link
          className="brand"
          href="/"
          fontWeight={700}
          fontSize="xl"
          display={{ base: "none", lg: "flex" }}
          alignItems="center"
          gap={1.5}
        >
          <Icon color="var(--color-primary)">
            <FaCirclePlay />
          </Icon>
          <Span color="#fff">StreamFlow</Span>
        </Link>

        <Box
          className="search-box"
          display={!isVisible ? "flex" : "block"}
          gap={2}
          flexGrow={1}
        >
          <IconButton
            onClick={() => setVisible()}
            bgColor="transparent"
            display={{ base: !isVisible ? "flex" : "none", lg: "none" }}
            className="search-toggler-cancel"
          >
            <FaArrowLeft />
          </IconButton>

          <IconButton
            onClick={() => setVisible()}
            bgColor="transparent"
            display={{ base: isVisible ? "flex" : "none", lg: "none" }}
            className="search-toggler"
          >
            <FaSearch />
          </IconButton>

          <InputGroup
            maxW="750px"
            mx="auto"
            display={{ base: !isVisible ? "block" : "none", lg: "block" }}
            startElement={
              <Icon color="var(--color-primary-light)">
                <FaSearch />
              </Icon>
            }
          >
            <Input
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleSearch();
              }}
              borderColor="var(--color-border-subtle)"
              rounded="full"
              ps={8}
              _placeholder={{ color: "var(--color-primary-light)" }}
              placeholder="Search"
            />
          </InputGroup>
        </Box>

        <Flex gap={4} alignItems="center" className="user-activities">
          {cookie.get("refreshToken") ? (
            <Image
              w="36px"
              cursor="pointer"
              alt={data?.displayName}
              rounded="full"
              src={data?.image}
              onClick={() => navigate(`/library/${data?._id}`)}
            />
          ) : (
            <Button
              bgColor="var(--color-primary)"
              _hover={{ bgColor: "var(--color-primary-hover)" }}
              size="xs"
              rounded="full"
              onClick={handleGoogleOAuth}
            >
              Sign Up
            </Button>
          )}
        </Flex>
      </Container>
    </Box>
  );
}
