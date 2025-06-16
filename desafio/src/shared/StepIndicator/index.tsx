import { Box, Flex, Text, Circle } from '@chakra-ui/react';

type StepIndicatorProps = {
  currentStep: number;
}

const steps = [
  { number: 1, title: 'Dados Pessoais' },
  { number: 2, title: 'Endereço' },
  { number: 3, title: 'Conclusão do Cadastro' },
];

const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  return (
    <Flex justify="center" mb={8}>
      {steps.map((step, index) => (
        <Flex key={step.number} align="center" direction="column">
          <Circle
            size="40px"
            bg={currentStep >= step.number ? '#ff4d4d' : 'gray.300'}
            color="white"
            fontWeight="bold"
          >
            {step.number}
          </Circle>
          <Text mt={2} fontSize="sm" textAlign="center" minW="200px" color='black'>
            {step.title}
          </Text>
          {index < steps.length - 1 && (
            <Box
              position="absolute"
              left="50%"
              transform="translateX(-50%)"
              mt="-20px"
              ml="40px"
              w="60px"
              h="2px"
              bg={currentStep > step.number ? '#ff4d4d' : 'gray.300'}
              zIndex={-1}
            />
          )}
        </Flex>
      ))}
    </Flex>
  );
};

export default StepIndicator;
