export function getArcStyle(count: number, index: number): React.CSSProperties {
    const ratio = (index / (count - 1)) * 2 - 1;
    const rotation = ratio * 6;
    const shiftRem = (1 - Math.abs(ratio)) * 1;
  
    return {
        transform: `rotate(${rotation.toFixed(1)}deg) translateY(${-shiftRem}rem)`,
        transition: 'transform 200ms ease',
        display: 'inline-block',
    };
}