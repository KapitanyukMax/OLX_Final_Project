import React from 'react';
import NewTypography from '../typography';
import { SvgIconProps } from '@mui/material';
import {LabelContainer, LabelTextBlock, LabelIconBlock} from './label.styles';


interface StyledLabelProps {
    textColor?:string;
    text: string;
    type: 'primary' | 'head' | 'with-icon' | 'no-background';
    icon?: React.ElementType<SvgIconProps>;
}

const StyledLabel: React.FC<StyledLabelProps> = ({ textColor, text, type, icon: Icon }) => {
    const getClassName = (): 'primaryLabel' | 'headLabel' | 'withIconLabel' | 'noBackgroundLabel' => {
        switch (type) {
          case 'primary':
            return 'primaryLabel';
          case 'head':
            return 'headLabel';
          case 'with-icon':
            return 'withIconLabel';
          case 'no-background':
            return 'noBackgroundLabel';
          default:
            return 'primaryLabel';
        }
      };
    return (
        <LabelContainer>
            {Icon && (
                <LabelIconBlock>
                    <Icon sx={{ color: 'var(--dark-blue)' }} />
                </LabelIconBlock>
            )}
            <LabelTextBlock>
                <NewTypography className={getClassName()} color={textColor}>{text}</NewTypography>
            </LabelTextBlock>
        </LabelContainer>
    );
};

export default StyledLabel;