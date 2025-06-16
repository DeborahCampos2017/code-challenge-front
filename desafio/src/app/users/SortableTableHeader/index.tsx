import { ChevronDownIcon, ChevronUpIcon, Flex, Th } from "@chakra-ui/icons";
import { SortField, SortOrder } from "../types";

export const SortableTableHeader: React.FC<{
  field: SortField;
  label: string;
  currentField: SortField;
  currentOrder: SortOrder;
  onClick: (field: SortField) => void;
}> = ({ field, label, currentField, currentOrder, onClick }) => {
  const isActive = currentField === field;
  const SortIcon = isActive && currentOrder === 'asc' ? ChevronUpIcon : ChevronDownIcon;

  return (
    <Th
      cursor="pointer"
      onClick={() => onClick(field)}
      _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
      color="white"
    >
      <Flex align="center">
        {label}
        {isActive && <SortIcon ml={1} color="white" />}
      </Flex>
    </Th>
  );
};
