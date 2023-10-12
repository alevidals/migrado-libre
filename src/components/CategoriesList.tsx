"use client";

import type { Category } from "@/lib/types";

import Link from "next/link";
import { useState } from "react";

interface CategoriesListProps {
  categories: Category[];
  parentId?: string;
}

interface ListItemProps {
  category: Category;
  categories: Category[];
}

function ListItem({ category, categories }: ListItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => setIsExpanded((isExpanded) => !isExpanded);

  const hasSubcategories = categories.filter(({ parentId }) => parentId === category.id).length;

  return (
    <li className="ml-2">
      {hasSubcategories ? (
        <button className="text-white" type="button" onClick={handleClick}>
          {isExpanded ? "-" : "+"}
        </button>
      ) : null}
      <Link href={`/${category.id}`}>{category.name}</Link>
      {isExpanded ? <CategoriesList categories={categories} parentId={category.id} /> : null}
    </li>
  );
}

export function CategoriesList({ categories, parentId }: CategoriesListProps) {
  const parentCategories = categories.filter((category) => parentId === category.parentId);

  return (
    <ul>
      {parentCategories.map((category) => (
        <ListItem key={category.id} categories={categories} category={category} />
      ))}
    </ul>
  );
}
