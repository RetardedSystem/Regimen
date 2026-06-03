// We dont fucking this file anymore
import { TextStyle } from "react-native";
type FontStyles = {
  [key: string]: TextStyle;
};

const Fonts: FontStyles = {
  Gabarito_bold: {
    fontFamily: "Gabarito",
    fontWeight: "700",
  },

  Gabarito_medium: {
    fontFamily: "Gabarito",
    fontWeight: "500",
  },

  Gabarito_light: {
    fontFamily: "Gabarito",
    fontWeight: "200",
  },
  Nunito_bold: {
    fontFamily: "Nunito_700Bold",
  },

  Nunito_medium: {
    fontFamily: "Nunito_400Regular",
  },

  Nunito_light: {
    fontFamily: "Nunito_200ExtraLight",
  },
  // Change this
  description: {
    color: "black",
    fontSize: 18,
    fontFamily: "Geologica",
    fontWeight: "200",
  },
};

export default Fonts;
