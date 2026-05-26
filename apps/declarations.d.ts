// This file is used to declare modules for TypeScript.

// This Declaration handles the svg imports as React Components.
declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";

  const content: React.FC<SvgProps>;

  export default content;
}
