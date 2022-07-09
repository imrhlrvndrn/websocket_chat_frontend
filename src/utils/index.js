export const extractFontSize = (size = 'body/large', theme) => {
    const [category, categorySize] = size.split('/');
    return theme.fonts.size[category][categorySize];
};

export { getChatAvatar, getChatName } from './chat.utils';
