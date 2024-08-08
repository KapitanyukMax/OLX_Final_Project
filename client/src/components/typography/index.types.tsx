import { TypographyProps } from '@mui/material';

export type TypographyTypeProps = TypographyProps & {
  className?: 'primaryLabel' | 'headLabel' | 'withIconLabel' | 'noBackgroundLabel';
};
