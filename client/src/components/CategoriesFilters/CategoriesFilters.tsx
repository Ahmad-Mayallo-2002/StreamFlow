import { Button, HStack } from "@chakra-ui/react";
import "./CategoriesFilters.css";
import { useState } from "react";
import { useCategory } from "@/zustand/category";
import { useGetCategories } from "@/hooks/get/useGetCategories";

export default function CategoriesFilters() {
  const [activeCategory, setActiveCategory] = useState<string>("");

  const setCategory = useCategory((state) => state.setCategory);

  const { data } = useGetCategories("categories?take=20");

  const handleActiveCategory = (category: string) => {
    setActiveCategory(category);
    setCategory(category);
  };

  return (
    <>
      <HStack
        gap={4}
        h="fit"
        w="full"
        overflowX="auto"
        className="categories"
        p={4}
        borderBottom="1px solid var(--color-border-subtle)"
      >
        <Button
          bgColor="var(--color-surface)"
          _hover={{ bgColor: "var(--color-surface-hover)" }}
          rounded="full"
          size="sm"
          onClick={() => handleActiveCategory("")}
          className={!activeCategory ? "active-category" : ""}
        >
          All
        </Button>
        {data?.data.map((category) => (
          <Button
            bgColor="var(--color-surface)"
            _hover={{ bgColor: "var(--color-surface-hover)" }}
            key={category._id}
            size="sm"
            rounded="full"
            value={category.name}
            onClick={() => handleActiveCategory(category._id)}
            className={activeCategory === category._id ? "active-category" : ""}
          >
            {category.name}
          </Button>
        ))}
      </HStack>
    </>
  );
}
