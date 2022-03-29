export const extractFontSize = (size = 'body/large', theme) => {
    const [category, categorySize] = size.split('/');
    console.log('extractFontSize', { size, theme });
    return theme.fonts.size[category][categorySize];
};
