import Svg, { Path } from "react-native-svg";

/**
 * It is the Icon converted into a React Component, as there are more then one Color in this SVG
 * The Original SVG is saved in the same Directory.
 */

export default function GoalExpanded({
  fillColor,
  strokeColor,
  style,
  onPress,
}: any) {
  return (
    <Svg
      width="30"
      height="46"
      viewBox="0 0 30 46"
      fill="none"
      style={style}
      onPress={onPress}
    >
      <Path
        d="M5 28V12L1.5 8.00001C1.5 6.89544 3.89543 2.00001 5 2.00001C6.10457 2.00001 10.5 1.5 13 7.50001L9 12V28C9 35.732 15.268 42 23 42H28C29.1046 42 30 42.8954 30 44C30 45.1046 29.1046 46 28 46H23C13.0589 46 5 37.9411 5 28Z"
        fill={fillColor}
      />
      <Path
        d="M7 1.25C10.1756 1.25 12.75 3.82436 12.75 7C12.75 10.1756 10.1756 12.75 7 12.75C3.82436 12.75 1.25 10.1756 1.25 7C1.25 3.82436 3.82436 1.25 7 1.25Z"
        stroke={strokeColor}
        strokeWidth="2.5"
      />
    </Svg>
  );
}
