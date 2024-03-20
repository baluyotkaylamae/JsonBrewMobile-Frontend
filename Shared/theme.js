import { extendTheme } from "native-base";

const theme = extendTheme({
    colors: {
      primary: {
        500: "white", // Background color
      },
      // Add more color overrides as needed
      brand: {
        500: "forestgreen", // Text color
      },
    },
  });

  export default theme;