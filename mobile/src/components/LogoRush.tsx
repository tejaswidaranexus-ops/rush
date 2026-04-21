import React from "react";
import Svg, { Rect, Line, Path } from "react-native-svg";

export default function LogoR({ size = 180 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 1024 1024">
      {/* Background */}
      <Rect width="1024" height="1024" rx="200" fill="#FF0125" />

      {/* Stem */}
      <Line
        x1="280"
        y1="200"
        x2="280"
        y2="820"
        stroke="#FFFFFF"
        strokeWidth="52"
        strokeLinecap="square"
      />

      {/* Bowl */}
      <Path
        d="M280 200 L520 200 Q760 200 760 420 Q760 640 520 640 L280 640"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="52"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />

      {/* Leg */}
      <Line
        x1="520"
        y1="640"
        x2="780"
        y2="820"
        stroke="#FFFFFF"
        strokeWidth="52"
        strokeLinecap="square"
      />

      {/* Speed lines */}
      <Line
        x1="790"
        y1="255"
        x2="950"
        y2="255"
        stroke="#FFD700"
        strokeWidth="44"
        strokeLinecap="square"
      />
      <Line
        x1="790"
        y1="380"
        x2="970"
        y2="380"
        stroke="#FFD700"
        strokeWidth="28"
        strokeLinecap="square"
      />
      <Line
        x1="790"
        y1="480"
        x2="955"
        y2="480"
        stroke="#FFD700"
        strokeWidth="16"
        strokeLinecap="square"
      />
    </Svg>
  );
}
