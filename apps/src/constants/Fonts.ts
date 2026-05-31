const baseGabarito = {
  FontFamily: "Gabarito"
};

const Fonts = {
  Gabarito: {
    ...baseGabarito,
    wordWrap: "break-word",
  },
  Gabarito_halka: {
    ...baseGabarito,
    color: "#5FA1CA",
    fontSize: 20,
    fontWeight: "700",
    textTransform: "uppercase",
  },
};

export default Fonts;
