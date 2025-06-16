import { Box, Flex, Text, Circle, useBreakpointValue } from '@chakra-ui/react';

type StepIndicatorProps = {
  currentStep: number;
}

const steps = [
  { number: 1, title: 'Dados Pessoais' },
  { number: 2, title: 'Endereço' },
  { number: 3, title: 'Conclusão do Cadastro' },
];

const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const stepSize = useBreakpointValue({ base: "32px", md: "40px" });
  const fontSize = useBreakpointValue({ base: "xs", md: "sm" });
  const titleMaxW = useBreakpointValue({ base: "60px", md: "80px" });
  const lineWidth = useBreakpointValue({ base: "40px", md: "60px" });

  return (
    <Box mb={{ base: 6, md: 8 }} px={{ base: 2, md: 0 }}>
      <Flex
        justify="center"
        align="center"
        direction={{ base: "column", sm: "row" }}
        gap={{ base: 4, sm: 0 }}
      >
        {steps.map((step, index) => (
          <>
            <Flex
              align="center"
              direction="column"
              position="relative"
              flex={{ base: "none", sm: "1" }}
              maxW={{ base: "120px", sm: "none" }}
            >
              <Circle
                size={stepSize}
                bg={currentStep >= step.number ? '#ff4d4d' : 'gray.300'}
                color="white"
                fontWeight="bold"
                fontSize={{ base: "sm", md: "md" }}
                transition="all 0.3s ease"
              >
                {step.number}
              </Circle>
              <Text
                mt={2}
                fontSize={fontSize}
                textAlign="center"
                maxW={titleMaxW}
                color={currentStep >= step.number ? '#ff4d4d' : 'gray.600'}
                fontWeight={currentStep >= step.number ? 'semibold' : 'normal'}
                lineHeight="1.2"
              >
                {step.title}
              </Text>
              {index < steps.length - 1 && !isMobile && (
                <Box
                  w={lineWidth}
                  h="2px"
                  bg={currentStep > step.number ? '#ff4d4d' : 'gray.300'}
                  mx={2}
                  transition="all 0.3s ease"
                />
              )}
            </Flex>
          </>
        ))}
      </Flex>
    </Box>
  );
};

export default StepIndicator;
