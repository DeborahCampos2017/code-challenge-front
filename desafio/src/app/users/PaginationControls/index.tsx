import { Button, Flex, Text } from "@chakra-ui/react";
import { PaginationInfo } from "../types";
import { generatePageNumbers, THEME_COLOR, THEME_COLOR_HOVER } from "../utils";

export const PaginationControls: React.FC<{
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
}> = ({ pagination, onPageChange }) => {
  const pageNumbers = generatePageNumbers(pagination);
  const { currentPage, totalPages } = pagination;

  if (totalPages <= 1) return null;

  return (
    <Flex justify="center" align="center" gap={2}>
      <Button
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
        variant="outline"
        borderColor={THEME_COLOR}
        color={THEME_COLOR}
        _hover={{ bg: 'rgba(255, 77, 77, 0.1)' }}
      >
        Anterior
      </Button>
      
      {pageNumbers.map((page, index) => (
        page === -1 ? (
          <Text key={index} px={2} color="gray.500">...</Text>
        ) : (
          <Button
            key={page}
            size="sm"
            onClick={() => onPageChange(page)}
            variant={currentPage === page ? 'solid' : 'outline'}
            bg={currentPage === page ? THEME_COLOR : 'transparent'}
            color={currentPage === page ? 'white' : THEME_COLOR}
            borderColor={THEME_COLOR}
            _hover={{
              bg: currentPage === page ? THEME_COLOR_HOVER : 'rgba(255, 77, 77, 0.1)'
            }}
          >
            {page}
          </Button>
        )
      ))}
      
      <Button
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
        variant="outline"
        borderColor={THEME_COLOR}
        color={THEME_COLOR}
        _hover={{ bg: 'rgba(255, 77, 77, 0.1)' }}
      >
        Próxima
      </Button>
    </Flex>
  );
};
