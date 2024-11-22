import {Text, type TextProps} from 'react-native';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'subTitle' | 'subTitleMuted' | 'highlighted';
};

const variantStyles = {
  default: 'text-black dark:text-white text-base',
  highlighted: 'text-yellow-500 font-bold text-base',
  subTitle: 'text-black dark:text-white text-sm',
  subTitleMuted: 'text-gray-600 dark:text-gray-400 text-sm',
  title: 'text-black dark:text-white text-xl',
};

export function ThemedText({type = 'default', ...rest}: ThemedTextProps) {
  return (
    <Text
      className={`
        ${type === 'default' ? variantStyles.default : ''}
        ${type === 'title' ? variantStyles.title : ''}
        ${type === 'subTitle' ? variantStyles.subTitle : ''}
        ${type === 'subTitleMuted' ? variantStyles.subTitleMuted : ''}
        ${type === 'highlighted' ? variantStyles.highlighted : ''}
      `}
      {...rest}
    />
  );
}
