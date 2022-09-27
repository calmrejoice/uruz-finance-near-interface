import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

import { BRAND_COLOR, BRAND_HOVER_COLOR } from "./styleConstants";

/**Custom Config */
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

/**Custom Styles */
const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      bg: mode("white", "black.900")(props),
    },
  }),
};

/**Custom Components */
const buttonStyle = {
  defaultProps: {
    variant: "brand",
  },
  variants: {
    brand: {
      color: "white",
      bgColor: BRAND_COLOR,
      fontSize: "sm",
      _hover: {
        bgColor: BRAND_HOVER_COLOR,
      },
    },
    brandLink: (props: StyleFunctionProps) => ({
      color: mode("black", "white")(props),
      _hover: {
        color: "gray.500",
      },
    }),
  },
};

const textStyle = {
  baseStyle: (props: StyleFunctionProps) => ({
    color: mode("black", "white")(props),
  }),
  variants: {
    helper: (props: StyleFunctionProps) => ({
      color: mode("gray.500", "white")(props),
      fontSize: "sm",
    }),
  },
};

const headingStyle = {
  baseStyle: (props: StyleFunctionProps) => ({
    color: mode("black", "white")(props),
  }),
  defaultProps: {
    fontSize: "sm",
  },
};

const inputStyle = {
  defaultProps: {
    focusBorderColor: BRAND_COLOR,
  },
};

const components = {
  Button: buttonStyle,
  Text: textStyle,
  Heading: headingStyle,
  Input: inputStyle,
};

/**Custom Fonts */
const fonts = {
  heading: "Source Sans Pro, sans-serif",
  body: "Open Sans, sans-serif",
};

const theme = extendTheme({ config, styles, components, fonts });

export default theme;
