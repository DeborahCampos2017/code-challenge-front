import { Box, Text, VStack } from "@chakra-ui/react";
import { DataFieldProps, DataSectionProps } from "./types";
import { Colors } from "./utils";

export const DataField = ({ label, value }: DataFieldProps) => (
  <Text color={Colors.black}>
    <strong style={{ color: Colors.primary }}>{label}:</strong> {value}
  </Text>
);

export const DataSection = ({ title, children }: DataSectionProps) => (
  <Box>
    <Text fontSize="lg" fontWeight="bold" mb={4} color={Colors.primary}>
      {title}
    </Text>
    <VStack align="stretch" spacing={2}>
      {children}
    </VStack>
  </Box>
);

export const ErrorMessage = ({ message }: { message: string }) => (
  <Box
    p={4}
    bg={Colors.redBackground}
    borderLeft="4px solid"
    borderColor={Colors.redBorder}
    borderRadius="md"
  >
    <Text color={Colors.redError} fontSize="sm">
      {message}
    </Text>
  </Box>
);
