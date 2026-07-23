import React, { useId } from "react";
import { View } from "react-native";
import Svg, { Circle, Defs, Ellipse, LinearGradient, Path, Polygon, Rect, Stop } from "react-native-svg";
import { colors, shadeMap } from "../theme/theme";
import { SceneId } from "../data/types";

interface Props {
  scene: SceneId;
  size?: number;
}

type Paint = (fullColor: string) => string;

interface SceneProps {
  p: Paint;
  outline: string;
}

const VIEWBOX = "0 0 240 240";

function Shadow({ cx, rx, cy = 224, ry = 12 }: { cx: number; rx: number; cy?: number; ry?: number }) {
  return <Ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={colors.groundShadow} />;
}

function Shine({ cx, cy, rx = 18, ry = 10, rotate = -25 }: { cx: number; cy: number; rx?: number; ry?: number; rotate?: number }) {
  return <Ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={colors.highlight} transform={`rotate(${rotate} ${cx} ${cy})`} />;
}

function BirdHat({ p, outline }: SceneProps) {
  return (
    <>
      <Shadow cx={125} rx={80} />
      <Ellipse cx="120" cy="150" rx="55" ry="45" fill={p(colors.blush)} stroke={outline} strokeWidth={5} />
      <Path d="M75 150 Q40 140 55 115 Q75 125 80 150 Z" fill={p(colors.coral)} stroke={outline} strokeWidth={4} strokeLinejoin="round" />
      <Circle cx="145" cy="100" r="38" fill={p(colors.marigold)} stroke={outline} strokeWidth={5} />
      <Polygon points="178,95 208,105 178,112" fill={p(colors.coral)} stroke={outline} strokeWidth={3} />
      <Circle cx="158" cy="92" r="5" fill={colors.navy} />
      <Path d="M100 200 L95 220 M120 200 L120 222 M140 200 L145 220" stroke={colors.navy} strokeWidth={5} strokeLinecap="round" />
      <Polygon points="122,68 172,68 147,20" fill={p(colors.teal)} stroke={outline} strokeWidth={4} strokeLinejoin="round" />
      <Rect x="118" y="64" width="58" height="10" rx="5" fill={colors.navy} />
      <Circle cx="147" cy="18" r="8" fill={p(colors.blush)} stroke={outline} strokeWidth={3} />
      <Shine cx={130} cy={90} />
    </>
  );
}

function CatSunglasses({ p, outline }: SceneProps) {
  return (
    <>
      <Shadow cx={120} rx={85} />
      <Polygon points="70,90 95,40 115,85" fill={p(colors.marigold)} stroke={outline} strokeWidth={4} strokeLinejoin="round" />
      <Polygon points="170,90 145,40 125,85" fill={p(colors.marigold)} stroke={outline} strokeWidth={4} strokeLinejoin="round" />
      <Circle cx="120" cy="130" r="70" fill={p(colors.marigold)} stroke={outline} strokeWidth={5} />
      <Ellipse cx="120" cy="150" rx="30" ry="22" fill={p(colors.cream)} />
      <Rect x="65" y="112" width="45" height="26" rx="10" fill={colors.navy} />
      <Rect x="130" y="112" width="45" height="26" rx="10" fill={colors.navy} />
      <Rect x="108" y="120" width="24" height="8" fill={colors.navy} />
      <Path d="M120 150 Q120 160 108 158 M120 150 Q120 160 132 158" stroke={colors.ink} strokeWidth={4} strokeLinecap="round" fill="none" />
      <Path d="M60 150 L20 140 M60 158 L20 158 M60 166 L20 176" stroke={colors.ink} strokeWidth={3} strokeLinecap="round" />
      <Path d="M180 150 L220 140 M180 158 L220 158 M180 166 L220 176" stroke={colors.ink} strokeWidth={3} strokeLinecap="round" />
      <Shine cx={95} cy={95} />
    </>
  );
}

function DinoUmbrella({ p, outline }: SceneProps) {
  return (
    <>
      <Shadow cx={130} rx={70} />
      <Circle cx="70" cy="60" r="10" fill={p(colors.skyBlue)} />
      <Circle cx="170" cy="50" r="7" fill={p(colors.skyBlue)} />
      <Circle cx="190" cy="90" r="8" fill={p(colors.skyBlue)} />
      <Path d="M120 30 A90 90 0 0 1 210 120 L30 120 A90 90 0 0 1 120 30 Z" fill={p(colors.coral)} stroke={outline} strokeWidth={5} strokeLinejoin="round" />
      <Path d="M120 30 A90 90 0 0 1 210 120 L120 120 Z" fill={p(colors.marigold)} stroke={outline} strokeWidth={3} />
      <Rect x="115" y="118" width="10" height="55" rx="4" fill={colors.navy} />
      <Path
        d="M100 220 Q95 175 130 175 Q150 175 155 200 Q170 195 180 215 Q160 235 135 225 Q100 235 100 220 Z"
        fill={p(colors.teal)}
        stroke={outline}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <Polygon points="120,170 130,150 140,170" fill={p(colors.teal)} stroke={outline} strokeWidth={2} />
      <Polygon points="135,168 145,148 153,168" fill={p(colors.teal)} stroke={outline} strokeWidth={2} />
      <Circle cx="152" cy="200" r="6" fill={colors.cream} />
      <Circle cx="150" cy="200" r="3" fill={colors.navy} />
      <Shine cx={135} cy={70} rx={30} ry={14} />
    </>
  );
}

function ElephantCar({ p, outline }: SceneProps) {
  return (
    <>
      <Shadow cx={120} rx={95} />
      <Rect x="35" y="130" width="170" height="60" rx="20" fill={p(colors.coral)} stroke={outline} strokeWidth={5} />
      <Circle cx="80" cy="195" r="20" fill={colors.navy} stroke={outline} strokeWidth={3} />
      <Circle cx="170" cy="195" r="20" fill={colors.navy} stroke={outline} strokeWidth={3} />
      <Circle cx="80" cy="195" r="7" fill={p(colors.skyBlue)} />
      <Circle cx="170" cy="195" r="7" fill={p(colors.skyBlue)} />
      <Circle cx="120" cy="90" r="45" fill={p(colors.skyBlue)} stroke={outline} strokeWidth={5} />
      <Circle cx="85" cy="75" r="22" fill={p(colors.skyBlue)} stroke={outline} strokeWidth={4} />
      <Circle cx="155" cy="75" r="22" fill={p(colors.skyBlue)} stroke={outline} strokeWidth={4} />
      <Path d="M140 105 Q165 110 160 140 Q158 150 145 148" stroke={p(colors.skyBlue)} strokeWidth={16} strokeLinecap="round" fill="none" />
      <Circle cx="108" cy="88" r="5" fill={colors.navy} />
      <Circle cx="132" cy="88" r="5" fill={colors.navy} />
      <Circle cx="120" cy="145" r="12" fill={colors.navy} />
      <Circle cx="120" cy="145" r="5" fill={p(colors.marigold)} />
      <Shine cx={100} cy={72} />
    </>
  );
}

function FishCrown({ p, outline }: SceneProps) {
  return (
    <>
      <Shadow cx={120} rx={90} />
      <Circle cx="60" cy="80" r="6" fill={p(colors.skyBlue)} />
      <Circle cx="80" cy="60" r="4" fill={p(colors.skyBlue)} />
      <Ellipse cx="120" cy="140" rx="70" ry="48" fill={p(colors.teal)} stroke={outline} strokeWidth={5} />
      <Polygon points="40,140 5,115 5,165" fill={p(colors.teal)} stroke={outline} strokeWidth={3} strokeLinejoin="round" />
      <Circle cx="150" cy="130" r="8" fill={colors.navy} />
      <Path d="M100 165 Q120 180 140 165" stroke={colors.navy} strokeWidth={4} fill="none" strokeLinecap="round" />
      <Polygon points="80,95 100,55 115,90 135,55 155,90 170,60 175,100" fill={p(colors.marigold)} stroke={outline} strokeWidth={4} strokeLinejoin="round" />
      <Circle cx="100" cy="60" r="6" fill={p(colors.blush)} />
      <Circle cx="135" cy="60" r="6" fill={p(colors.blush)} />
      <Circle cx="170" cy="65" r="6" fill={p(colors.blush)} />
      <Shine cx={95} cy={120} />
    </>
  );
}

function BearCake({ p, outline }: SceneProps) {
  return (
    <>
      <Shadow cx={130} rx={90} />
      <Circle cx="70" cy="70" r="20" fill={p(colors.coral)} stroke={outline} strokeWidth={4} />
      <Circle cx="150" cy="70" r="20" fill={p(colors.coral)} stroke={outline} strokeWidth={4} />
      <Circle cx="110" cy="100" r="60" fill={p(colors.coral)} stroke={outline} strokeWidth={5} />
      <Ellipse cx="110" cy="115" rx="26" ry="20" fill={p(colors.cream)} />
      <Circle cx="90" cy="90" r="7" fill={colors.navy} />
      <Circle cx="130" cy="90" r="7" fill={colors.navy} />
      <Circle cx="110" cy="110" r="5" fill={colors.navy} />
      <Ellipse cx="170" cy="205" rx="55" ry="12" fill={p(colors.skyBlue)} />
      <Rect x="140" y="175" width="60" height="28" rx="6" fill={p(colors.blush)} stroke={outline} strokeWidth={3} />
      <Rect x="148" y="155" width="44" height="22" rx="6" fill={p(colors.marigold)} stroke={outline} strokeWidth={3} />
      <Rect x="167" y="135" width="6" height="20" fill={colors.navy} />
      <Path d="M170 135 Q175 125 170 118 Q165 125 170 135 Z" fill={p(colors.coral)} />
      <Shine cx={90} cy={80} />
    </>
  );
}

function RabbitBoots({ p, outline }: SceneProps) {
  return (
    <>
      <Shadow cx={120} rx={75} />
      <Ellipse cx="120" cy="140" rx="42" ry="46" fill={p(colors.cream)} stroke={outline} strokeWidth={5} />
      <Ellipse cx="95" cy="55" rx="14" ry="42" fill={p(colors.cream)} stroke={outline} strokeWidth={4} />
      <Ellipse cx="145" cy="55" rx="14" ry="42" fill={p(colors.cream)} stroke={outline} strokeWidth={4} />
      <Ellipse cx="95" cy="58" rx="7" ry="30" fill={p(colors.blush)} />
      <Ellipse cx="145" cy="58" rx="7" ry="30" fill={p(colors.blush)} />
      <Circle cx="105" cy="135" r="5" fill={colors.navy} />
      <Circle cx="135" cy="135" r="5" fill={colors.navy} />
      <Circle cx="120" cy="150" r="4" fill={p(colors.coral)} />
      <Rect x="88" y="175" width="26" height="32" rx="8" fill={p(colors.coral)} stroke={outline} strokeWidth={3} />
      <Rect x="126" y="175" width="26" height="32" rx="8" fill={p(colors.coral)} stroke={outline} strokeWidth={3} />
      <Rect x="88" y="175" width="26" height="10" rx="5" fill={p(colors.marigold)} />
      <Rect x="126" y="175" width="26" height="10" rx="5" fill={p(colors.marigold)} />
      <Shine cx={102} cy={110} />
    </>
  );
}

function FoxBalloon({ p, outline }: SceneProps) {
  return (
    <>
      <Shadow cx={120} rx={70} />
      <Path
        d="M120 60 Q160 70 155 115 Q155 145 120 150 Q85 145 85 115 Q80 70 120 60 Z"
        stroke={outline}
        strokeWidth={4}
        fill={p(colors.marigold)}
      />
      <Path d="M110 145 L100 175 L118 165 Z" fill={colors.navy} />
      <Path d="M120 145 L120 180 L120 145 Z" stroke={colors.navy} strokeWidth={3} />
      <Polygon points="90,75 70,35 105,60" fill={p(colors.coral)} stroke={outline} strokeWidth={3} strokeLinejoin="round" />
      <Polygon points="150,75 170,35 135,60" fill={p(colors.coral)} stroke={outline} strokeWidth={3} strokeLinejoin="round" />
      <Ellipse cx="100" cy="125" rx="16" ry="12" fill={p(colors.cream)} />
      <Ellipse cx="140" cy="125" rx="16" ry="12" fill={p(colors.cream)} />
      <Circle cx="108" cy="105" r="6" fill={colors.navy} />
      <Circle cx="132" cy="105" r="6" fill={colors.navy} />
      <Polygon points="112,122 128,122 120,132" fill={colors.navy} />
      <Shine cx={105} cy={85} />
    </>
  );
}

function OwlScarf({ p, outline }: SceneProps) {
  return (
    <>
      <Shadow cx={120} rx={90} />
      <Ellipse cx="70" cy="120" rx="20" ry="35" fill={p(colors.teal)} stroke={outline} strokeWidth={4} />
      <Ellipse cx="170" cy="120" rx="20" ry="35" fill={p(colors.teal)} stroke={outline} strokeWidth={4} />
      <Ellipse cx="120" cy="120" rx="65" ry="75" fill={p(colors.teal)} stroke={outline} strokeWidth={5} />
      <Circle cx="95" cy="105" r="26" fill={p(colors.cream)} />
      <Circle cx="145" cy="105" r="26" fill={p(colors.cream)} />
      <Circle cx="95" cy="105" r="11" fill={colors.navy} />
      <Circle cx="145" cy="105" r="11" fill={colors.navy} />
      <Polygon points="112,125 128,125 120,140" fill={p(colors.marigold)} />
      <Path d="M60 165 Q120 195 180 165 L180 185 Q120 215 60 185 Z" fill={p(colors.coral)} stroke={outline} strokeWidth={4} strokeLinejoin="round" />
      <Path d="M60 165 L45 210 M75 172 L62 215" stroke={p(colors.coral)} strokeWidth={8} strokeLinecap="round" />
      <Shine cx={100} cy={80} />
    </>
  );
}

function TurtleBackpack({ p, outline }: SceneProps) {
  return (
    <>
      <Ellipse cx="120" cy="195" rx="80" ry="14" fill={colors.groundShadow} />
      <Ellipse cx="120" cy="145" rx="20" ry="14" fill={p(colors.cream)} stroke={outline} strokeWidth={3} />
      <Circle cx="55" cy="150" r="16" fill={p(colors.cream)} stroke={outline} strokeWidth={3} />
      <Circle cx="46" cy="145" r="5" fill={colors.navy} />
      <Ellipse cx="90" cy="185" rx="12" ry="8" fill={p(colors.cream)} stroke={outline} strokeWidth={2} />
      <Ellipse cx="150" cy="185" rx="12" ry="8" fill={p(colors.cream)} stroke={outline} strokeWidth={2} />
      <Path d="M65 155 A75 60 0 0 1 195 150 Q200 100 120 90 Q40 100 65 155 Z" fill={p(colors.teal)} stroke={outline} strokeWidth={5} strokeLinejoin="round" />
      <Path d="M90 130 L150 130 M105 105 L105 145 M135 105 L135 145" stroke={colors.marigoldDark} strokeWidth={3} opacity={0.5} />
      <Rect x="95" y="60" width="55" height="50" rx="14" fill={p(colors.coral)} stroke={outline} strokeWidth={4} />
      <Path d="M100 60 Q100 40 122 40 Q145 40 145 60" stroke={p(colors.coral)} strokeWidth={8} fill="none" />
      <Circle cx="122" cy="85" r="6" fill={p(colors.marigold)} />
      <Shine cx={80} cy={105} />
    </>
  );
}

const SCENES: Record<SceneId, React.FC<SceneProps>> = {
  "bird-hat": BirdHat,
  "cat-sunglasses": CatSunglasses,
  "dino-umbrella": DinoUmbrella,
  "elephant-car": ElephantCar,
  "fish-crown": FishCrown,
  "bear-cake": BearCake,
  "rabbit-boots": RabbitBoots,
  "fox-balloon": FoxBalloon,
  "owl-scarf": OwlScarf,
  "turtle-backpack": TurtleBackpack,
};

export default function PromptIllustration({ scene, size = 220 }: Props) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, "");
  const Scene = SCENES[scene];
  const outline = colors.outline;

  const paint: Paint = (fullColor) =>
    shadeMap[fullColor] ? `url(#${uid}-${fullColor.replace("#", "")})` : fullColor;

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
        <Scene p={paint} outline={outline} />
      </Svg>
    </View>
  );
}
