export function calculateStepSize(min: number, max: number, maxTicksLimit: number) {
  const range = max - min;
  const numberOfTicks = Math.min(maxTicksLimit, range);
  const rawStepSize = range / (numberOfTicks - 1);

  const stepMagnitude = Math.pow(10, Math.floor(Math.log10(rawStepSize)));
  const normalizedStepSize = rawStepSize / stepMagnitude;

  let roundedStepSize;
  if (normalizedStepSize < 1.5) {
    roundedStepSize = 1;
  } else if (normalizedStepSize < 3) {
    roundedStepSize = 2;
  } else if (normalizedStepSize < 7) {
    roundedStepSize = 5;
  } else {
    roundedStepSize = 10;
  }

  return roundedStepSize * stepMagnitude;
}
