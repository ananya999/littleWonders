import React, { useId } from "react";
import { View } from "react-native";
import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, Polygon, Rect, Stop } from "react-native-svg";
import { colors, shadeMap } from "../theme/theme";
import { PuzzleItemId } from "../data/puzzleTypes";

interface Props {
  item: PuzzleItemId;
  /** "outline" renders an unfilled dashed guide line, for the tracing activity. */
  tone?: "full" | "silhouette" | "outline";
  size?: number;
  /** Overrides every painted region with a single color (used by the coloring activity). */
  tintColor?: string;
}

type Tone = "full" | "silhouette" | "outline";
type Paint = (fullColor: string) => string;

const VIEWBOX = "0 0 240 240";

interface ShapeProps {
  p: Paint;
  tone: Tone;
  outline: string;
}

/** Soft ellipse cast on the "ground" beneath a shape. Only shown in full color. */
function Shadow({ cx, rx, cy = 222, ry = 12 }: { cx: number; rx: number; cy?: number; ry?: number }) {
  return <Ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={colors.groundShadow} />;
}

/** Small glossy highlight streak on a rounded surface. */
function Shine({ cx, cy, rx = 18, ry = 10, rotate = -25 }: { cx: number; cy: number; rx?: number; ry?: number; rotate?: number }) {
  return <Ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={colors.highlight} transform={`rotate(${rotate} ${cx} ${cy})`} />;
}

/** Two dot eyes + a curved smile, for a friendly storybook character feel. */
function Face({
  leftEye,
  rightEye,
  eyeR = 7,
  smile,
  outline,
}: {
  leftEye: [number, number];
  rightEye: [number, number];
  eyeR?: number;
  smile: string;
  outline: string;
}) {
  return (
    <>
      <Circle cx={leftEye[0]} cy={leftEye[1]} r={eyeR} fill={colors.white} />
      <Circle cx={rightEye[0]} cy={rightEye[1]} r={eyeR} fill={colors.white} />
      <Circle cx={leftEye[0]} cy={leftEye[1] + 1} r={eyeR * 0.55} fill={colors.navy} />
      <Circle cx={rightEye[0]} cy={rightEye[1] + 1} r={eyeR * 0.55} fill={colors.navy} />
      <Path d={smile} stroke={outline} strokeWidth={4} strokeLinecap="round" fill="none" />
    </>
  );
}

function CarSedan({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={85} />}
      <Rect x="35" y="130" width="170" height="50" rx="20" fill={p(colors.coral)} stroke={outline} strokeWidth={5} />
      <Path d="M65 130 Q80 90 120 90 Q160 90 175 130 Z" fill={p(colors.teal)} stroke={outline} strokeWidth={5} strokeLinejoin="round" />
      <Rect x="90" y="100" width="60" height="30" rx="6" fill={p(colors.cream)} />
      {full && <Face leftEye={[105, 113]} rightEye={[135, 113]} eyeR={5} smile="M104 122 Q120 130 136 122" outline={outline} />}
      <Circle cx="80" cy="182" r="20" fill={p(colors.navy)} stroke={outline} strokeWidth={4} />
      <Circle cx="160" cy="182" r="20" fill={p(colors.navy)} stroke={outline} strokeWidth={4} />
      <Circle cx="80" cy="182" r="8" fill={p(colors.skyBlue)} />
      <Circle cx="160" cy="182" r="8" fill={p(colors.skyBlue)} />
      {full && <Shine cx={95} cy={148} />}
    </>
  );
}

function CarTruck({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={90} />}
      <Rect x="30" y="120" width="110" height="65" rx="10" fill={p(colors.marigold)} stroke={outline} strokeWidth={5} />
      <Rect x="140" y="145" width="65" height="40" rx="8" fill={p(colors.coral)} stroke={outline} strokeWidth={5} />
      <Rect x="150" y="155" width="35" height="22" rx="4" fill={p(colors.cream)} />
      {full && <Face leftEye={[161, 165]} rightEye={[176, 165]} eyeR={4} smile="M158 172 Q167 177 176 172" outline={outline} />}
      <Circle cx="75" cy="192" r="20" fill={p(colors.navy)} stroke={outline} strokeWidth={4} />
      <Circle cx="165" cy="192" r="20" fill={p(colors.navy)} stroke={outline} strokeWidth={4} />
      <Circle cx="75" cy="192" r="8" fill={p(colors.skyBlue)} />
      <Circle cx="165" cy="192" r="8" fill={p(colors.skyBlue)} />
      {full && <Shine cx={55} cy={138} />}
    </>
  );
}

function CarBus({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={100} />}
      <Rect x="25" y="90" width="190" height="90" rx="18" fill={p(colors.teal)} stroke={outline} strokeWidth={5} />
      <Rect x="40" y="105" width="35" height="30" rx="6" fill={p(colors.cream)} />
      <Rect x="85" y="105" width="35" height="30" rx="6" fill={p(colors.cream)} />
      <Rect x="130" y="105" width="35" height="30" rx="6" fill={p(colors.cream)} />
      <Rect x="175" y="105" width="25" height="30" rx="6" fill={p(colors.cream)} />
      {full && <Face leftEye={[102, 120]} rightEye={[147, 120]} eyeR={4} smile="M95 155 Q120 165 145 155" outline={outline} />}
      <Circle cx="70" cy="188" r="18" fill={p(colors.navy)} stroke={outline} strokeWidth={4} />
      <Circle cx="170" cy="188" r="18" fill={p(colors.navy)} stroke={outline} strokeWidth={4} />
      <Circle cx="70" cy="188" r="7" fill={p(colors.marigold)} />
      <Circle cx="170" cy="188" r="7" fill={p(colors.marigold)} />
      {full && <Shine cx={55} cy={108} />}
    </>
  );
}

function CarScooter({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={80} cy={210} />}
      <Rect x="60" y="45" width="8" height="90" rx="4" fill={p(colors.navy)} stroke={outline} strokeWidth={3} />
      <Rect x="35" y="45" width="58" height="10" rx="5" fill={p(colors.coral)} stroke={outline} strokeWidth={3} />
      <Path d="M60 135 Q140 135 175 165" stroke={p(colors.marigold)} strokeWidth={12} strokeLinecap="round" fill="none" />
      <Path d="M60 135 Q140 135 175 165" stroke={outline} strokeWidth={2} strokeLinecap="round" fill="none" opacity={0.35} />
      <Polygon points="42,50 30,42 30,58" fill={p(colors.teal)} stroke={outline} strokeWidth={2} />
      <Circle cx="60" cy="185" r="18" fill={p(colors.navy)} stroke={outline} strokeWidth={4} />
      <Circle cx="178" cy="172" r="18" fill={p(colors.navy)} stroke={outline} strokeWidth={4} />
      {full && <Shine cx={50} cy={60} rx={10} ry={5} />}
    </>
  );
}

function CarTaxi({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={85} />}
      <Rect x="35" y="130" width="170" height="50" rx="20" fill={p(colors.marigold)} stroke={outline} strokeWidth={5} />
      <Path d="M65 130 Q80 90 120 90 Q160 90 175 130 Z" fill={p(colors.marigold)} stroke={outline} strokeWidth={5} strokeLinejoin="round" />
      <Rect x="90" y="100" width="60" height="30" rx="6" fill={p(colors.cream)} />
      {full && <Face leftEye={[105, 113]} rightEye={[135, 113]} eyeR={5} smile="M104 122 Q120 130 136 122" outline={outline} />}
      <Rect x="108" y="76" width="24" height="14" rx="3" fill={p(colors.coral)} stroke={outline} strokeWidth={3} />
      <Rect x="50" y="150" width="16" height="14" fill={colors.navy} />
      <Rect x="66" y="150" width="16" height="14" fill={colors.white} stroke={outline} strokeWidth={1} />
      <Rect x="158" y="150" width="16" height="14" fill={colors.navy} />
      <Rect x="174" y="150" width="16" height="14" fill={colors.white} stroke={outline} strokeWidth={1} />
      <Circle cx="80" cy="182" r="20" fill={p(colors.navy)} stroke={outline} strokeWidth={4} />
      <Circle cx="160" cy="182" r="20" fill={p(colors.navy)} stroke={outline} strokeWidth={4} />
      <Circle cx="80" cy="182" r="8" fill={p(colors.skyBlue)} />
      <Circle cx="160" cy="182" r="8" fill={p(colors.skyBlue)} />
      {full && <Shine cx={95} cy={148} />}
    </>
  );
}

function CarFiretruck({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={95} />}
      <Rect x="30" y="125" width="140" height="55" rx="10" fill={p(colors.coral)} stroke={outline} strokeWidth={5} />
      <Rect x="160" y="140" width="45" height="40" rx="8" fill={p(colors.coral)} stroke={outline} strokeWidth={5} />
      <Rect x="168" y="150" width="28" height="20" rx="4" fill={p(colors.cream)} />
      {full && <Face leftEye={[176, 160]} rightEye={[189, 160]} eyeR={4} smile="M172 167 Q182 171 191 167" outline={outline} />}
      <Rect x="35" y="100" width="120" height="10" rx="4" fill={p(colors.navy)} strokeWidth={2} />
      <Path
        d="M40 100 L40 125 M55 100 L55 125 M70 100 L70 125 M85 100 L85 125 M100 100 L100 125 M115 100 L115 125 M130 100 L130 125 M145 100 L145 125"
        stroke={colors.navy}
        strokeWidth={3}
      />
      <Rect x="60" y="112" width="20" height="10" rx="3" fill={p(colors.marigold)} stroke={outline} strokeWidth={2} />
      <Circle cx="70" cy="192" r="20" fill={p(colors.navy)} stroke={outline} strokeWidth={4} />
      <Circle cx="160" cy="192" r="20" fill={p(colors.navy)} stroke={outline} strokeWidth={4} />
      <Circle cx="70" cy="192" r="8" fill={p(colors.skyBlue)} />
      <Circle cx="160" cy="192" r="8" fill={p(colors.skyBlue)} />
      {full && <Shine cx={50} cy={138} />}
    </>
  );
}

function CarMotorcycle({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={80} cy={212} />}
      <Path d="M70 155 Q120 132 165 155" stroke={p(colors.coral)} strokeWidth={14} strokeLinecap="round" fill="none" />
      <Path d="M70 155 Q120 132 165 155" stroke={outline} strokeWidth={2} strokeLinecap="round" fill="none" opacity={0.3} />
      <Rect x="95" y="112" width="45" height="18" rx="9" fill={p(colors.navy)} stroke={outline} strokeWidth={3} />
      <Rect x="150" y="95" width="8" height="42" rx="4" fill={p(colors.navy)} stroke={outline} strokeWidth={3} />
      <Rect x="128" y="88" width="46" height="8" rx="4" fill={p(colors.coral)} stroke={outline} strokeWidth={3} />
      <Circle cx="70" cy="180" r="28" fill={p(colors.navy)} stroke={outline} strokeWidth={4} />
      <Circle cx="170" cy="180" r="28" fill={p(colors.navy)} stroke={outline} strokeWidth={4} />
      <Circle cx="70" cy="180" r="11" fill={p(colors.skyBlue)} />
      <Circle cx="170" cy="180" r="11" fill={p(colors.skyBlue)} />
      {full && <Shine cx={100} cy={120} rx={14} ry={6} />}
    </>
  );
}

function CarTrain({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={95} />}
      <Rect x="40" y="110" width="140" height="60" rx="14" fill={p(colors.teal)} stroke={outline} strokeWidth={5} />
      <Path d="M180 110 Q205 110 205 140 L205 170 L180 170 Z" fill={p(colors.coral)} stroke={outline} strokeWidth={5} strokeLinejoin="round" />
      <Rect x="60" y="80" width="18" height="35" rx="4" fill={p(colors.navy)} stroke={outline} strokeWidth={3} />
      <Circle cx="190" cy="140" r="10" fill={p(colors.marigold)} stroke={outline} strokeWidth={3} />
      {full && <Face leftEye={[100, 135]} rightEye={[130, 135]} eyeR={6} smile="M100 155 Q115 163 130 155" outline={outline} />}
      <Circle cx="70" cy="185" r="18" fill={p(colors.navy)} stroke={outline} strokeWidth={4} />
      <Circle cx="120" cy="185" r="18" fill={p(colors.navy)} stroke={outline} strokeWidth={4} />
      <Circle cx="170" cy="185" r="18" fill={p(colors.navy)} stroke={outline} strokeWidth={4} />
      <Circle cx="70" cy="185" r="7" fill={p(colors.marigold)} />
      <Circle cx="120" cy="185" r="7" fill={p(colors.marigold)} />
      <Circle cx="170" cy="185" r="7" fill={p(colors.marigold)} />
      {full && <Shine cx={70} cy={125} />}
    </>
  );
}

function FruitApple({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={68} />}
      <Path
        d="M120 90 C80 90 60 130 65 165 C70 195 100 210 120 200 C140 210 170 195 175 165 C180 130 160 90 120 90 Z"
        fill={p(colors.coral)}
        stroke={outline}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <Path d="M120 90 Q110 65 90 60" stroke={p(colors.marigoldDark)} strokeWidth={6} fill="none" strokeLinecap="round" />
      <Ellipse cx="140" cy="65" rx="16" ry="9" fill={p(colors.teal)} stroke={outline} strokeWidth={3} transform="rotate(-25 140 65)" />
      {full && <Face leftEye={[100, 145]} rightEye={[140, 145]} smile="M104 168 Q120 180 136 168" outline={outline} />}
      {full && <Shine cx={88} cy={125} />}
    </>
  );
}

function FruitBanana({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={125} rx={75} />}
      <Path
        d="M75 70 Q60 130 90 175 Q120 210 175 195 Q150 190 135 165 Q160 175 175 150 Q130 165 110 130 Q95 100 100 65 Z"
        fill={p(colors.marigold)}
        stroke={outline}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <Path d="M75 70 Q80 60 95 60" stroke={p(colors.marigoldDark)} strokeWidth={6} fill="none" strokeLinecap="round" />
      {full && <Face leftEye={[95, 128]} rightEye={[118, 118]} eyeR={6} smile="M98 142 Q112 155 128 140" outline={outline} />}
      {full && <Shine cx={95} cy={100} rx={12} ry={22} rotate={20} />}
    </>
  );
}

function FruitWatermelon({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={82} />}
      <Path d="M40 130 A80 80 0 0 0 200 130 Z" fill={p(colors.teal)} stroke={outline} strokeWidth={5} strokeLinejoin="round" />
      <Path d="M55 130 A65 65 0 0 0 185 130 Z" fill={p(colors.cream)} />
      <Path d="M68 130 A52 52 0 0 0 172 130 Z" fill={p(colors.coral)} stroke={outline} strokeWidth={4} />
      <Circle cx="100" cy="150" r="4" fill={colors.navy} />
      <Circle cx="140" cy="150" r="4" fill={colors.navy} />
      <Circle cx="120" cy="160" r="4" fill={colors.navy} />
      {full && <Face leftEye={[97, 108]} rightEye={[143, 108]} eyeR={6} smile="M100 138 Q120 148 140 138" outline={outline} />}
      {full && <Shine cx={95} cy={118} />}
    </>
  );
}

function FruitStrawberry({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={65} />}
      <Path
        d="M120 90 C160 90 185 130 175 165 C165 200 140 210 120 210 C100 210 75 200 65 165 C55 130 80 90 120 90 Z"
        fill={p(colors.coral)}
        stroke={outline}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <Circle cx="100" cy="135" r="4" fill={colors.marigold} />
      <Circle cx="140" cy="135" r="4" fill={colors.marigold} />
      <Circle cx="120" cy="155" r="4" fill={colors.marigold} />
      <Circle cx="100" cy="175" r="4" fill={colors.marigold} />
      <Circle cx="140" cy="175" r="4" fill={colors.marigold} />
      <Polygon points="95,90 120,60 145,90" fill={p(colors.teal)} stroke={outline} strokeWidth={4} strokeLinejoin="round" />
      {full && <Face leftEye={[100, 145]} rightEye={[140, 145]} eyeR={6} smile="M106 168 Q120 178 134 168" outline={outline} />}
      {full && <Shine cx={92} cy={120} rx={12} ry={16} />}
    </>
  );
}

function FruitGrapes({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={65} />}
      <Circle cx="95" cy="120" r="22" fill={p(colors.blush)} stroke={outline} strokeWidth={4} />
      <Circle cx="145" cy="120" r="22" fill={p(colors.blush)} stroke={outline} strokeWidth={4} />
      <Circle cx="120" cy="140" r="22" fill={p(colors.blush)} stroke={outline} strokeWidth={4} />
      <Circle cx="95" cy="160" r="22" fill={p(colors.blush)} stroke={outline} strokeWidth={4} />
      <Circle cx="145" cy="160" r="22" fill={p(colors.blush)} stroke={outline} strokeWidth={4} />
      <Circle cx="120" cy="180" r="22" fill={p(colors.blush)} stroke={outline} strokeWidth={4} />
      <Path d="M120 95 Q100 80 105 60" stroke={p(colors.teal)} strokeWidth={6} strokeLinecap="round" fill="none" />
      <Ellipse cx="100" cy="55" rx="18" ry="12" fill={p(colors.teal)} stroke={outline} strokeWidth={3} transform="rotate(-20 100 55)" />
      {full && <Face leftEye={[112, 136]} rightEye={[128, 136]} eyeR={4} smile="M114 146 Q120 150 126 146" outline={outline} />}
      {full && <Shine cx={88} cy={110} />}
    </>
  );
}

function FruitOrange({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={70} />}
      <Circle cx="120" cy="135" r="68" fill={p(colors.marigold)} stroke={outline} strokeWidth={5} />
      <Ellipse cx="120" cy="68" rx="14" ry="8" fill={p(colors.teal)} stroke={outline} strokeWidth={3} />
      <Path d="M120 68 L120 50" stroke={p(colors.teal)} strokeWidth={5} strokeLinecap="round" />
      {full && <Face leftEye={[98, 128]} rightEye={[142, 128]} eyeR={7} smile="M102 155 Q120 168 138 155" outline={outline} />}
      {full && <Shine cx={92} cy={108} />}
    </>
  );
}

function FruitPineapple({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={60} />}
      <Ellipse cx="120" cy="150" rx="50" ry="65" fill={p(colors.marigold)} stroke={outline} strokeWidth={5} />
      <Path
        d="M85 100 L105 100 M95 120 L115 120 M85 140 L105 140 M95 160 L115 160 M135 100 L155 100 M125 120 L145 120 M135 140 L155 140 M125 160 L145 160"
        stroke={colors.marigoldDark}
        strokeWidth={3}
        fill="none"
      />
      <Polygon points="120,85 100,40 120,55 140,40" fill={p(colors.teal)} stroke={outline} strokeWidth={4} strokeLinejoin="round" />
      <Polygon points="100,60 80,30 105,50" fill={p(colors.teal)} stroke={outline} strokeWidth={3} strokeLinejoin="round" />
      <Polygon points="140,60 160,30 135,50" fill={p(colors.teal)} stroke={outline} strokeWidth={3} strokeLinejoin="round" />
      {full && <Face leftEye={[102, 150]} rightEye={[138, 150]} eyeR={6} smile="M106 170 Q120 178 134 170" outline={outline} />}
      {full && <Shine cx={95} cy={130} />}
    </>
  );
}

function FruitMango({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={62} />}
      <Path
        d="M120 70 C160 75 178 120 165 160 C155 195 130 210 110 205 C80 198 65 165 75 130 C82 105 95 70 120 70 Z"
        fill={p(colors.coral)}
        stroke={outline}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <Path d="M118 70 Q112 55 100 50" stroke={p(colors.teal)} strokeWidth={5} strokeLinecap="round" fill="none" />
      {full && <Face leftEye={[105, 140]} rightEye={[140, 135]} eyeR={6} smile="M110 160 Q125 170 142 158" outline={outline} />}
      {full && <Shine cx={100} cy={110} rx={14} ry={20} rotate={15} />}
    </>
  );
}

function VegCarrot({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={45} />}
      <Polygon points="120,215 95,90 145,90" fill={p(colors.coral)} stroke={outline} strokeWidth={5} strokeLinejoin="round" />
      <Path d="M120 90 L110 55 M120 90 L120 50 M120 90 L130 55" stroke={p(colors.teal)} strokeWidth={7} strokeLinecap="round" />
      {full && <Face leftEye={[110, 118]} rightEye={[130, 118]} eyeR={5} smile="M112 135 Q120 141 128 135" outline={outline} />}
      {full && <Shine cx={108} cy={140} rx={8} ry={20} rotate={10} />}
    </>
  );
}

function VegBroccoli({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={60} />}
      <Rect x="108" y="150" width="24" height="55" rx="8" fill={p(colors.marigold)} stroke={outline} strokeWidth={4} />
      <Circle cx="95" cy="120" r="30" fill={p(colors.teal)} stroke={outline} strokeWidth={4} />
      <Circle cx="145" cy="120" r="30" fill={p(colors.teal)} stroke={outline} strokeWidth={4} />
      <Circle cx="120" cy="95" r="32" fill={p(colors.teal)} stroke={outline} strokeWidth={4} />
      {full && <Face leftEye={[110, 92]} rightEye={[130, 92]} eyeR={5} smile="M112 107 Q120 113 128 107" outline={outline} />}
      {full && <Shine cx={106} cy={82} rx={12} ry={7} />}
    </>
  );
}

function VegCorn({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={55} />}
      <Ellipse cx="120" cy="130" rx="45" ry="80" fill={p(colors.marigold)} stroke={outline} strokeWidth={5} />
      <Path
        d="M90 60 100 90 110 60 120 90 130 60 140 90 150 60 M90 100 100 130 110 100 120 130 130 100 140 130 150 100 M90 140 100 170 110 140 120 170 130 140 140 170 150 140"
        stroke={colors.marigoldDark}
        strokeWidth={4}
        fill="none"
        strokeLinecap="round"
      />
      <Path d="M85 60 Q60 40 70 90" stroke={p(colors.teal)} strokeWidth={14} fill="none" strokeLinecap="round" />
      <Path d="M155 60 Q180 40 170 90" stroke={p(colors.teal)} strokeWidth={14} fill="none" strokeLinecap="round" />
      {full && <Face leftEye={[108, 165]} rightEye={[132, 165]} eyeR={5} smile="M110 185 Q120 191 130 185" outline={outline} />}
    </>
  );
}

function VegTomato({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={72} />}
      <Circle cx="120" cy="135" r="70" fill={p(colors.coral)} stroke={outline} strokeWidth={5} />
      <Path d="M120 65 L110 50 M120 65 L120 45 M120 65 L130 50" stroke={p(colors.teal)} strokeWidth={7} strokeLinecap="round" />
      <Ellipse cx="120" cy="68" rx="22" ry="10" fill={p(colors.teal)} stroke={outline} strokeWidth={3} />
      {full && <Face leftEye={[98, 128]} rightEye={[142, 128]} eyeR={7} smile="M102 155 Q120 168 138 155" outline={outline} />}
      {full && <Shine cx={92} cy={108} />}
    </>
  );
}

function VegPotato({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={68} />}
      <Ellipse cx="120" cy="140" rx="70" ry="52" fill={p(colors.tan)} stroke={outline} strokeWidth={5} />
      <Circle cx="90" cy="120" r="3" fill={colors.marigoldDark} />
      <Circle cx="150" cy="155" r="3" fill={colors.marigoldDark} />
      <Circle cx="100" cy="170" r="3" fill={colors.marigoldDark} />
      {full && <Face leftEye={[100, 130]} rightEye={[140, 130]} eyeR={6} smile="M104 155 Q120 165 136 155" outline={outline} />}
      {full && <Shine cx={95} cy={115} />}
    </>
  );
}

function VegOnion({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={60} />}
      <Path
        d="M120 90 C160 95 175 140 155 175 C140 200 100 200 85 175 C65 140 80 95 120 90 Z"
        fill={p(colors.marigold)}
        stroke={outline}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <Path d="M100 95 Q120 130 140 95" stroke={colors.marigoldDark} strokeWidth={3} fill="none" opacity={0.5} />
      <Path d="M120 90 Q118 70 125 55 M120 90 Q122 70 115 55" stroke={p(colors.teal)} strokeWidth={4} strokeLinecap="round" fill="none" />
      {full && <Face leftEye={[102, 145]} rightEye={[138, 145]} eyeR={6} smile="M106 168 Q120 178 134 168" outline={outline} />}
      {full && <Shine cx={95} cy={125} />}
    </>
  );
}

function VegEggplant({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={60} />}
      <Path
        d="M120 85 C165 90 180 140 160 175 C145 205 95 205 80 175 C60 140 75 90 120 85 Z"
        fill={p(colors.purple)}
        stroke={outline}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <Path d="M100 88 L90 60 M120 85 L120 55 M140 88 L150 60" stroke={p(colors.teal)} strokeWidth={6} strokeLinecap="round" />
      <Ellipse cx="120" cy="88" rx="26" ry="10" fill={p(colors.teal)} stroke={outline} strokeWidth={3} />
      {full && <Face leftEye={[100, 145]} rightEye={[138, 145]} eyeR={6} smile="M104 168 Q120 178 136 168" outline={outline} />}
      {full && <Shine cx={95} cy={125} />}
    </>
  );
}

function VegPea({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={70} />}
      <Path
        d="M50 130 Q60 90 120 90 Q180 90 190 130 Q180 170 120 170 Q60 170 50 130 Z"
        fill={p(colors.teal)}
        stroke={outline}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <Circle cx="85" cy="130" r="17" fill={colors.peaGreen} stroke={outline} strokeWidth={3} />
      <Circle cx="120" cy="130" r="17" fill={colors.peaGreen} stroke={outline} strokeWidth={3} />
      <Circle cx="155" cy="130" r="17" fill={colors.peaGreen} stroke={outline} strokeWidth={3} />
      {full && <Face leftEye={[95, 155]} rightEye={[145, 155]} eyeR={5} smile="M100 170 Q120 178 140 170" outline={outline} />}
      {full && <Shine cx={80} cy={105} />}
    </>
  );
}

function AnimalDog({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={68} />}
      <Ellipse cx="78" cy="110" rx="26" ry="38" fill={p(colors.tan)} stroke={outline} strokeWidth={5} transform="rotate(-20 78 110)" />
      <Ellipse cx="162" cy="110" rx="26" ry="38" fill={p(colors.tan)} stroke={outline} strokeWidth={5} transform="rotate(20 162 110)" />
      <Circle cx="120" cy="140" r="68" fill={p(colors.tan)} stroke={outline} strokeWidth={5} />
      <Ellipse cx="120" cy="170" rx="30" ry="22" fill={p(colors.cream)} stroke={outline} strokeWidth={3} />
      <Circle cx="120" cy="160" r="7" fill={colors.navy} />
      {full && <Face leftEye={[98, 128]} rightEye={[142, 128]} eyeR={7} smile="M108 178 Q120 185 132 178" outline={outline} />}
      {full && <Shine cx={92} cy={110} />}
    </>
  );
}

function AnimalCat({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={65} />}
      <Polygon points="75,95 95,50 105,100" fill={p(colors.coral)} stroke={outline} strokeWidth={5} strokeLinejoin="round" />
      <Polygon points="165,95 145,50 135,100" fill={p(colors.coral)} stroke={outline} strokeWidth={5} strokeLinejoin="round" />
      <Circle cx="120" cy="140" r="65" fill={p(colors.coral)} stroke={outline} strokeWidth={5} />
      <Path d="M60 140 L20 130 M60 150 L18 150 M60 160 L20 170" stroke={outline} strokeWidth={3} strokeLinecap="round" />
      <Path d="M180 140 L220 130 M180 150 L222 150 M180 160 L220 170" stroke={outline} strokeWidth={3} strokeLinecap="round" />
      <Polygon points="112,155 128,155 120,168" fill={colors.navy} />
      {full && <Face leftEye={[98, 130]} rightEye={[142, 130]} eyeR={7} smile="M108 175 Q120 180 132 175" outline={outline} />}
      {full && <Shine cx={92} cy={112} />}
    </>
  );
}

function AnimalElephant({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={75} />}
      <Ellipse cx="55" cy="130" rx="38" ry="45" fill={p(colors.skyBlue)} stroke={outline} strokeWidth={5} />
      <Ellipse cx="185" cy="130" rx="38" ry="45" fill={p(colors.skyBlue)} stroke={outline} strokeWidth={5} />
      <Circle cx="120" cy="130" r="70" fill={p(colors.skyBlue)} stroke={outline} strokeWidth={5} />
      <Path d="M105 175 Q95 215 120 220 Q135 222 130 205" fill={p(colors.skyBlue)} stroke={outline} strokeWidth={5} strokeLinejoin="round" />
      {full && <Face leftEye={[98, 118]} rightEye={[142, 118]} eyeR={7} smile="M104 150 Q120 158 136 150" outline={outline} />}
      {full && <Shine cx={92} cy={100} />}
    </>
  );
}

function AnimalLion({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={78} />}
      <Circle cx="120" cy="140" r="78" fill={colors.marigoldDark} stroke={outline} strokeWidth={5} />
      <Circle cx="120" cy="140" r="55" fill={p(colors.marigold)} stroke={outline} strokeWidth={5} />
      <Circle cx="95" cy="90" r="14" fill={p(colors.marigold)} stroke={outline} strokeWidth={4} />
      <Circle cx="145" cy="90" r="14" fill={p(colors.marigold)} stroke={outline} strokeWidth={4} />
      <Ellipse cx="120" cy="168" rx="20" ry="14" fill={p(colors.cream)} stroke={outline} strokeWidth={3} />
      <Circle cx="120" cy="158" r="6" fill={colors.navy} />
      {full && <Face leftEye={[100, 130]} rightEye={[140, 130]} eyeR={7} smile="M108 175 Q120 182 132 175" outline={outline} />}
      {full && <Shine cx={95} cy={110} />}
    </>
  );
}

function AnimalRabbit({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={65} />}
      <Ellipse cx="95" cy="70" rx="16" ry="48" fill={p(colors.blush)} stroke={outline} strokeWidth={5} transform="rotate(-8 95 70)" />
      <Ellipse cx="145" cy="70" rx="16" ry="48" fill={p(colors.blush)} stroke={outline} strokeWidth={5} transform="rotate(8 145 70)" />
      <Ellipse cx="95" cy="75" rx="7" ry="30" fill={colors.cream} transform="rotate(-8 95 75)" />
      <Ellipse cx="145" cy="75" rx="7" ry="30" fill={colors.cream} transform="rotate(8 145 75)" />
      <Circle cx="120" cy="150" r="62" fill={p(colors.blush)} stroke={outline} strokeWidth={5} />
      <Ellipse cx="120" cy="175" rx="18" ry="12" fill={colors.cream} stroke={outline} strokeWidth={3} />
      <Circle cx="120" cy="167" r="5" fill={colors.navy} />
      {full && <Face leftEye={[100, 140]} rightEye={[140, 140]} eyeR={7} smile="M108 182 Q120 188 132 182" outline={outline} />}
      {full && <Shine cx={95} cy={122} />}
    </>
  );
}

function AnimalBear({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={72} />}
      <Circle cx="75" cy="88" r="22" fill={p(colors.brown)} stroke={outline} strokeWidth={5} />
      <Circle cx="165" cy="88" r="22" fill={p(colors.brown)} stroke={outline} strokeWidth={5} />
      <Circle cx="120" cy="140" r="72" fill={p(colors.brown)} stroke={outline} strokeWidth={5} />
      <Ellipse cx="120" cy="165" rx="28" ry="20" fill={p(colors.tan)} stroke={outline} strokeWidth={3} />
      <Circle cx="120" cy="155" r="7" fill={colors.navy} />
      {full && <Face leftEye={[98, 128]} rightEye={[142, 128]} eyeR={7} smile="M108 178 Q120 185 132 178" outline={outline} />}
      {full && <Shine cx={92} cy={110} />}
    </>
  );
}

function AnimalDuck({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={68} cy={210} />}
      <Ellipse cx="115" cy="160" rx="70" ry="50" fill={p(colors.teal)} stroke={outline} strokeWidth={5} />
      <Circle cx="150" cy="95" r="40" fill={p(colors.teal)} stroke={outline} strokeWidth={5} />
      <Path d="M185 100 Q210 100 208 115 Q205 128 182 120 Z" fill={p(colors.marigold)} stroke={outline} strokeWidth={4} strokeLinejoin="round" />
      {full && <Face leftEye={[140, 85]} rightEye={[168, 85]} eyeR={6} smile="M150 100 Q160 104 170 100" outline={outline} />}
      {full && <Shine cx={90} cy={140} />}
    </>
  );
}

function AnimalMonkey({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={68} />}
      <Circle cx="72" cy="120" r="26" fill={p(colors.purple)} stroke={outline} strokeWidth={5} />
      <Circle cx="168" cy="120" r="26" fill={p(colors.purple)} stroke={outline} strokeWidth={5} />
      <Circle cx="120" cy="140" r="66" fill={p(colors.purple)} stroke={outline} strokeWidth={5} />
      <Ellipse cx="120" cy="155" rx="34" ry="28" fill={p(colors.tan)} stroke={outline} strokeWidth={4} />
      {full && <Face leftEye={[102, 140]} rightEye={[138, 140]} eyeR={7} smile="M106 168 Q120 178 134 168" outline={outline} />}
      {full && <Shine cx={92} cy={110} />}
    </>
  );
}

function FoodPizza({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={75} />}
      <Path d="M120 60 L195 195 L45 195 Z" fill={p(colors.tan)} stroke={outline} strokeWidth={5} strokeLinejoin="round" />
      <Path d="M120 85 L175 185 L65 185 Z" fill={p(colors.marigold)} stroke={outline} strokeWidth={4} strokeLinejoin="round" />
      <Circle cx="105" cy="130" r="9" fill={colors.coral} stroke={outline} strokeWidth={2} />
      <Circle cx="140" cy="145" r="9" fill={colors.coral} stroke={outline} strokeWidth={2} />
      <Circle cx="115" cy="165" r="9" fill={colors.coral} stroke={outline} strokeWidth={2} />
      {full && <Face leftEye={[100, 150]} rightEye={[140, 150]} eyeR={6} smile="M105 168 Q120 175 135 168" outline={outline} />}
      {full && <Shine cx={95} cy={110} />}
    </>
  );
}

function FoodSandwich({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={75} />}
      <Path d="M50 140 Q120 100 190 140 L190 155 Q120 125 50 155 Z" fill={p(colors.tan)} stroke={outline} strokeWidth={5} strokeLinejoin="round" />
      <Rect x="55" y="155" width="130" height="12" fill={p(colors.teal)} stroke={outline} strokeWidth={3} />
      <Rect x="55" y="167" width="130" height="12" fill={p(colors.coral)} stroke={outline} strokeWidth={3} />
      <Rect x="50" y="179" width="140" height="26" rx="6" fill={p(colors.tan)} stroke={outline} strokeWidth={5} />
      {full && <Face leftEye={[100, 135]} rightEye={[140, 135]} eyeR={6} smile="M104 148 Q120 154 136 148" outline={outline} />}
      {full && <Shine cx={90} cy={118} />}
    </>
  );
}

function FoodIcecream({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={55} cy={215} />}
      <Polygon points="90,140 150,140 120,215" fill={p(colors.tan)} stroke={outline} strokeWidth={5} strokeLinejoin="round" />
      <Circle cx="120" cy="100" r="45" fill={p(colors.blush)} stroke={outline} strokeWidth={5} />
      {full && <Face leftEye={[102, 92]} rightEye={[138, 92]} eyeR={6} smile="M106 112 Q120 120 134 112" outline={outline} />}
      {full && <Shine cx={98} cy={78} />}
    </>
  );
}

function FoodCookie({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={68} />}
      <Circle cx="120" cy="140" r="68" fill={p(colors.brown)} stroke={outline} strokeWidth={5} />
      <Circle cx="95" cy="115" r="6" fill={colors.navy} />
      <Circle cx="145" cy="120" r="6" fill={colors.navy} />
      <Circle cx="110" cy="160" r="6" fill={colors.navy} />
      <Circle cx="150" cy="155" r="6" fill={colors.navy} />
      <Circle cx="85" cy="150" r="6" fill={colors.navy} />
      {full && <Face leftEye={[100, 128]} rightEye={[140, 128]} eyeR={7} smile="M106 172 Q120 179 134 172" outline={outline} />}
      {full && <Shine cx={92} cy={110} />}
    </>
  );
}

function FoodEgg({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={78} cy={205} />}
      <Path
        d="M60 150 Q40 110 90 100 Q110 80 140 95 Q180 90 190 130 Q200 170 160 185 Q120 200 80 185 Q55 175 60 150 Z"
        fill={p(colors.cream)}
        stroke={outline}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <Circle cx="125" cy="140" r="35" fill={p(colors.marigold)} stroke={outline} strokeWidth={4} />
      {full && <Face leftEye={[112, 132]} rightEye={[140, 132]} eyeR={6} smile="M114 152 Q126 158 140 152" outline={outline} />}
      {full && <Shine cx={105} cy={125} rx={10} ry={7} />}
    </>
  );
}

function FoodBread({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={72} />}
      <Path
        d="M50 180 Q45 110 120 95 Q195 110 190 180 Q190 200 120 200 Q50 200 50 180 Z"
        fill={p(colors.tan)}
        stroke={outline}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <Path d="M80 110 L80 190 M120 100 L120 195 M160 110 L160 190" stroke={colors.marigoldDark} strokeWidth={3} opacity={0.5} />
      {full && <Face leftEye={[100, 145]} rightEye={[140, 145]} eyeR={7} smile="M105 168 Q120 176 135 168" outline={outline} />}
      {full && <Shine cx={92} cy={125} />}
    </>
  );
}

function FoodMilk({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={45} />}
      <Rect x="100" y="55" width="40" height="20" rx="4" fill={p(colors.skyBlue)} stroke={outline} strokeWidth={4} />
      <Path
        d="M90 75 L150 75 L165 110 L165 195 Q165 205 155 205 L85 205 Q75 205 75 195 L75 110 Z"
        fill={p(colors.cream)}
        stroke={outline}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <Rect x="85" y="130" width="70" height="35" rx="4" fill={p(colors.skyBlue)} stroke={outline} strokeWidth={3} opacity={0.85} />
      {full && <Face leftEye={[105, 175]} rightEye={[135, 175]} eyeR={6} smile="M108 190 Q120 196 132 190" outline={outline} />}
      {full && <Shine cx={95} cy={100} rx={8} ry={20} />}
    </>
  );
}

function FoodCupcake({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={65} />}
      <Path d="M65 150 L175 150 L160 200 Q120 212 80 200 Z" fill={p(colors.tan)} stroke={outline} strokeWidth={5} strokeLinejoin="round" />
      <Path d="M65 150 L80 200 M175 150 L160 200" stroke={colors.marigoldDark} strokeWidth={2} opacity={0.4} />
      <Path
        d="M70 150 Q60 100 90 90 Q100 60 120 85 Q140 55 150 90 Q180 100 170 150 Z"
        fill={p(colors.purple)}
        stroke={outline}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <Circle cx="120" cy="75" r="10" fill={p(colors.blush)} stroke={outline} strokeWidth={3} />
      {full && <Face leftEye={[105, 130]} rightEye={[135, 130]} eyeR={6} smile="M108 143 Q120 149 132 143" outline={outline} />}
      {full && <Shine cx={95} cy={105} />}
    </>
  );
}

function ObjToothbrush({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={55} cy={215} />}
      <Rect x="105" y="90" width="30" height="120" rx="14" fill={p(colors.teal)} stroke={outline} strokeWidth={5} />
      <Rect x="90" y="50" width="60" height="45" rx="10" fill={p(colors.cream)} stroke={outline} strokeWidth={4} />
      <Path d="M95 55 L95 90 M110 50 L110 90 M130 50 L130 90 M145 55 L145 90" stroke={outline} strokeWidth={4} strokeLinecap="round" />
      {full && <Face leftEye={[108, 130]} rightEye={[132, 130]} eyeR={6} smile="M110 155 Q120 161 130 155" outline={outline} />}
      {full && <Shine cx={112} cy={110} rx={6} ry={25} />}
    </>
  );
}

function ObjSpoon({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={45} cy={215} />}
      <Rect x="108" y="120" width="24" height="90" rx="12" fill={p(colors.skyBlue)} stroke={outline} strokeWidth={5} />
      <Ellipse cx="120" cy="90" rx="42" ry="55" fill={p(colors.skyBlue)} stroke={outline} strokeWidth={5} />
      {full && <Face leftEye={[102, 82]} rightEye={[138, 82]} eyeR={7} smile="M106 108 Q120 116 134 108" outline={outline} />}
      {full && <Shine cx={98} cy={65} />}
    </>
  );
}

function ObjCup({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={65} />}
      <Rect x="65" y="95" width="110" height="100" rx="14" fill={p(colors.coral)} stroke={outline} strokeWidth={5} />
      <Path d="M175 115 Q210 115 210 145 Q210 175 175 175" fill="none" stroke={p(colors.coral)} strokeWidth={14} strokeLinecap="round" />
      <Path d="M175 115 Q210 115 210 145 Q210 175 175 175" fill="none" stroke={outline} strokeWidth={4} strokeLinecap="round" opacity={0.5} />
      {full && <Face leftEye={[100, 135]} rightEye={[140, 135]} eyeR={7} smile="M104 160 Q120 168 136 160" outline={outline} />}
      {full && <Shine cx={85} cy={112} />}
    </>
  );
}

function ObjBall({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={68} />}
      <Circle cx="120" cy="140" r="68" fill={p(colors.marigold)} stroke={outline} strokeWidth={5} />
      <Path d="M52 140 A68 68 0 0 0 188 140 Z" fill={p(colors.teal)} stroke={outline} strokeWidth={4} />
      <Path d="M120 72 L120 208 M52 140 L188 140" stroke={outline} strokeWidth={3} opacity={0.4} />
      {full && <Face leftEye={[100, 128]} rightEye={[140, 128]} eyeR={7} smile="M106 172 Q120 179 134 172" outline={outline} />}
      {full && <Shine cx={92} cy={110} />}
    </>
  );
}

function ObjShoe({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={78} cy={205} />}
      <Path
        d="M40 175 Q40 140 80 130 L140 110 Q160 100 175 115 L200 140 Q205 160 190 170 L190 185 L40 185 Z"
        fill={p(colors.purple)}
        stroke={outline}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <Rect x="35" y="185" width="165" height="20" rx="10" fill={p(colors.cream)} stroke={outline} strokeWidth={4} />
      <Path d="M100 130 L120 155 M120 122 L138 148 M140 116 L155 140" stroke={outline} strokeWidth={4} strokeLinecap="round" />
      {full && <Face leftEye={[70, 155]} rightEye={[95, 160]} eyeR={5} smile="M65 170 Q80 175 95 170" outline={outline} />}
      {full && <Shine cx={70} cy={140} rx={10} ry={6} />}
    </>
  );
}

function ObjUmbrella({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={62} cy={215} />}
      <Path
        d="M50 130 Q50 70 120 65 Q190 70 190 130 Q160 110 120 130 Q80 110 50 130 Z"
        fill={p(colors.coral)}
        stroke={outline}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <Path d="M85 100 L85 130 M120 90 L120 130 M155 100 L155 130" stroke={p(colors.teal)} strokeWidth={8} opacity={0.7} />
      <Rect x="114" y="128" width="12" height="80" rx="6" fill={p(colors.navy)} stroke={outline} strokeWidth={3} />
      <Path d="M114 205 Q95 210 95 190" fill="none" stroke={p(colors.navy)} strokeWidth={8} strokeLinecap="round" />
      {full && <Face leftEye={[100, 100]} rightEye={[140, 100]} eyeR={6} smile="M104 115 Q120 120 136 115" outline={outline} />}
      {full && <Shine cx={90} cy={85} />}
    </>
  );
}

function ObjClock({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={70} />}
      <Circle cx="120" cy="140" r="70" fill={p(colors.marigold)} stroke={outline} strokeWidth={5} />
      <Circle cx="120" cy="140" r="56" fill={p(colors.cream)} stroke={outline} strokeWidth={3} />
      <Rect x="82" y="55" width="10" height="16" rx="4" fill={p(colors.marigold)} stroke={outline} strokeWidth={2} />
      <Rect x="148" y="55" width="10" height="16" rx="4" fill={p(colors.marigold)} stroke={outline} strokeWidth={2} />
      <Path d="M120 140 L120 105 M120 140 L145 150" stroke={colors.navy} strokeWidth={5} strokeLinecap="round" />
      <Circle cx="120" cy="140" r="6" fill={colors.navy} />
      {full && <Face leftEye={[100, 165]} rightEye={[140, 165]} eyeR={6} smile="M104 185 Q120 191 136 185" outline={outline} />}
      {full && <Shine cx={95} cy={115} />}
    </>
  );
}

function ObjBook({ p, tone, outline }: ShapeProps) {
  const full = tone === "full";
  return (
    <>
      {full && <Shadow cx={120} rx={75} />}
      <Rect x="50" y="80" width="140" height="120" rx="10" fill={p(colors.teal)} stroke={outline} strokeWidth={5} />
      <Rect x="60" y="90" width="120" height="100" rx="6" fill={p(colors.coral)} />
      <Path d="M120 90 L120 190" stroke={colors.marigoldDark} strokeWidth={3} opacity={0.4} />
      <Path
        d="M70 105 L110 105 M70 120 L110 120 M70 135 L110 135 M130 105 L170 105 M130 120 L170 120 M130 135 L170 135"
        stroke={colors.white}
        strokeWidth={3}
        opacity={0.6}
      />
      {full && <Face leftEye={[100, 155]} rightEye={[140, 155]} eyeR={6} smile="M104 172 Q120 179 136 172" outline={outline} />}
      {full && <Shine cx={90} cy={105} />}
    </>
  );
}

const ITEMS: Record<PuzzleItemId, React.FC<ShapeProps>> = {
  "car-sedan": CarSedan,
  "car-truck": CarTruck,
  "car-bus": CarBus,
  "car-scooter": CarScooter,
  "car-taxi": CarTaxi,
  "car-firetruck": CarFiretruck,
  "car-motorcycle": CarMotorcycle,
  "car-train": CarTrain,
  "fruit-apple": FruitApple,
  "fruit-banana": FruitBanana,
  "fruit-watermelon": FruitWatermelon,
  "fruit-strawberry": FruitStrawberry,
  "fruit-grapes": FruitGrapes,
  "fruit-orange": FruitOrange,
  "fruit-pineapple": FruitPineapple,
  "fruit-mango": FruitMango,
  "veg-carrot": VegCarrot,
  "veg-broccoli": VegBroccoli,
  "veg-corn": VegCorn,
  "veg-tomato": VegTomato,
  "veg-potato": VegPotato,
  "veg-onion": VegOnion,
  "veg-eggplant": VegEggplant,
  "veg-pea": VegPea,
  "animal-dog": AnimalDog,
  "animal-cat": AnimalCat,
  "animal-elephant": AnimalElephant,
  "animal-lion": AnimalLion,
  "animal-rabbit": AnimalRabbit,
  "animal-bear": AnimalBear,
  "animal-duck": AnimalDuck,
  "animal-monkey": AnimalMonkey,
  "food-pizza": FoodPizza,
  "food-sandwich": FoodSandwich,
  "food-icecream": FoodIcecream,
  "food-cookie": FoodCookie,
  "food-egg": FoodEgg,
  "food-bread": FoodBread,
  "food-milk": FoodMilk,
  "food-cupcake": FoodCupcake,
  "obj-toothbrush": ObjToothbrush,
  "obj-spoon": ObjSpoon,
  "obj-cup": ObjCup,
  "obj-ball": ObjBall,
  "obj-shoe": ObjShoe,
  "obj-umbrella": ObjUmbrella,
  "obj-clock": ObjClock,
  "obj-book": ObjBook,
};

export default function PuzzleIllustration({ item, tone = "full", size = 160, tintColor }: Props) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, "");
  const Shape = ITEMS[item];
  const outline = tone === "silhouette" || tone === "outline" ? colors.shadowStroke : colors.outline;

  const paint: Paint = (fullColor) => {
    if (tone === "outline") return "none";
    if (tone === "silhouette") return colors.shadowFill;
    if (tintColor) return tintColor;
    return shadeMap[fullColor] ? `url(#${uid}-${fullColor.replace("#", "")})` : fullColor;
  };

  const shapeEl = <Shape p={paint} tone={tone} outline={outline} />;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width="100%" height="100%" viewBox={VIEWBOX}>
        <Defs>
          {Object.entries(shadeMap).map(([hex, [light, dark]]) => (
            <LinearGradient key={hex} id={`${uid}-${hex.replace("#", "")}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor={light} />
              <Stop offset="100%" stopColor={dark} />
            </LinearGradient>
          ))}
        </Defs>
        {tone === "outline" ? <G strokeDasharray="10 8">{shapeEl}</G> : shapeEl}
      </Svg>
    </View>
  );
}
