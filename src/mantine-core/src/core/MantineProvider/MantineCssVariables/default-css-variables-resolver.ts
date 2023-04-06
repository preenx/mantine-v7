import { MantineTheme } from '../theme.types';
import { keys, rem } from '../../utils';
import { getPrimaryShade, rgba } from '../color-functions';
import { ConvertCSSVariablesInput } from '../convert-css-variables';

function assignSizeVariables(
  variables: Record<string, string>,
  sizes: Record<string, string>,
  name: string
) {
  keys(sizes).forEach((size) =>
    Object.assign(variables, { [`--mantine-${name}-${size}`]: sizes[size] })
  );
}

export function defaultCssVariablesResolver(theme: MantineTheme): ConvertCSSVariablesInput {
  const darkPrimaryShade = getPrimaryShade(theme, 'dark');
  const lightPrimaryShade = getPrimaryShade(theme, 'light');
  const defaultRadius =
    theme.defaultRadius in theme.radius
      ? theme.radius[theme.defaultRadius]
      : rem(theme.defaultRadius);

  const result: ConvertCSSVariablesInput = {
    variables: {
      '--mantine-cursor-type': theme.cursorType,
      '--mantine-webkit-font-smoothing': theme.fontSmoothing ? 'antialiased' : 'unset',
      '--mantine-color-scheme': 'light dark',
      '--mantine-moz-font-smoothing': theme.fontSmoothing ? 'grayscale' : 'unset',
      '--mantine-color-white': theme.white,
      '--mantine-color-black': theme.black,
      '--mantine-color-primary': `var(--mantine-color-${theme.primaryColor}-filled)`,
      '--mantine-line-height': theme.lineHeight,
      '--mantine-font-family': theme.fontFamily,
      '--mantine-font-family-monospace': theme.fontFamilyMonospace,
      '--mantine-font-family-headings': theme.headings.fontFamily,
      '--mantine-heading-font-weight': theme.headings.fontWeight,
      '--mantine-radius-default': defaultRadius,
    },
    light: {
      '--mantine-color-text': theme.black,
      '--mantine-color-body': theme.white,
      '--mantine-color-error': theme.colors.red[6],
      '--mantine-color-placeholder': theme.colors.gray[5],
      '--mantine-color-anchor': theme.colors[theme.primaryColor][lightPrimaryShade],
      '--mantine-color-default': theme.white,
      '--mantine-color-default-hover': theme.colors.gray[0],
      '--mantine-color-default-color': theme.black,
      '--mantine-color-default-border': theme.colors.gray[4],
    },
    dark: {
      '--mantine-color-text': 'var(--mantine-color-dark-0)',
      '--mantine-color-body': theme.colors.dark[7],
      '--mantine-color-error': theme.colors.red[9],
      '--mantine-color-placeholder': theme.colors.dark[3],
      '--mantine-color-anchor': theme.colors[theme.primaryColor][4],
      '--mantine-color-default': theme.colors.dark[6],
      '--mantine-color-default-hover': theme.colors.dark[5],
      '--mantine-color-default-color': theme.white,
      '--mantine-color-default-border': theme.colors.dark[4],
    },
  };

  assignSizeVariables(result.variables, theme.shadows, 'shadow');
  assignSizeVariables(result.variables, theme.fontSizes, 'font-size');
  assignSizeVariables(result.variables, theme.radius, 'radius');
  assignSizeVariables(result.variables, theme.spacing, 'spacing');
  assignSizeVariables(result.variables, theme.breakpoints, 'breakpoint');

  keys(theme.colors).forEach((color) => {
    theme.colors[color].forEach((shade, index) => {
      result.variables[`--mantine-color-${color}-${index}`] = shade;
    });

    const lightFilledHover =
      lightPrimaryShade === 9 ? theme.colors[color][8] : theme.colors[color][lightPrimaryShade + 1];

    const darkFilledHover =
      darkPrimaryShade === 9 ? theme.colors[color][8] : theme.colors[color][darkPrimaryShade + 1];

    result.light['--mantine-color-dimmed'] = 'var(--mantine-color-gray-6)';
    result.light[`--mantine-color-${color}-filled`] = theme.colors[color][lightPrimaryShade];
    result.light[`--mantine-color-${color}-filled-hover`] = lightFilledHover;
    result.light[`--mantine-color-${color}-light`] = rgba(
      theme.colors[color][lightPrimaryShade],
      0.1
    );
    result.light[`--mantine-color-${color}-light-hover`] = rgba(
      theme.colors[color][lightPrimaryShade],
      0.12
    );
    result.light[`--mantine-color-${color}-light-color`] = theme.colors[color][lightPrimaryShade];
    result.light[`--mantine-color-${color}-outline`] = theme.colors[color][lightPrimaryShade];
    result.light[`--mantine-color-${color}-outline-hover`] = rgba(
      theme.colors[color][lightPrimaryShade],
      0.05
    );

    result.dark['--mantine-color-dimmed'] = 'var(--mantine-color-dark-2)';
    result.dark[`--mantine-color-${color}-filled`] = theme.colors[color][darkPrimaryShade];
    result.dark[`--mantine-color-${color}-filled-hover`] = darkFilledHover;
    result.dark[`--mantine-color-${color}-light`] = rgba(
      theme.colors[color][darkPrimaryShade],
      0.1
    );
    result.dark[`--mantine-color-${color}-light-hover`] = rgba(
      theme.colors[color][darkPrimaryShade],
      0.12
    );
    result.dark[`--mantine-color-${color}-light-color`] =
      theme.colors[color][Math.min(darkPrimaryShade, 6)];
    result.dark[`--mantine-color-${color}-outline`] =
      theme.colors[color][Math.min(darkPrimaryShade, 6)];
    result.dark[`--mantine-color-${color}-outline-hover`] = rgba(
      theme.colors[color][Math.min(darkPrimaryShade, 6)],
      0.05
    );
  });

  const headings = theme.headings.sizes;

  keys(headings).forEach((heading) => {
    result.variables[`--mantine-${heading}-font-size`] = headings[heading].fontSize;
    result.variables[`--mantine-${heading}-line-height`] = headings[heading].lineHeight;
    result.variables[`--mantine-${heading}-font-weight`] =
      headings[heading].fontWeight || theme.headings.fontWeight;
  });

  return result;
}
