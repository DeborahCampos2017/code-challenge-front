import { Colors } from "./DataSection/utils";

export const checkboxStyles = {
  ".chakra-checkbox__control": {
    borderColor: Colors.primary,
    borderWidth: '2px',
    _checked: {
      bg: Colors.primary,
      borderColor: Colors.primary,
      _hover: {
        bg: Colors.primary,
        borderColor: Colors.primary,
      },
    },
  },
};
