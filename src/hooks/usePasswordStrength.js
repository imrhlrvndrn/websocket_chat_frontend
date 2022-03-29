import { useEffect } from 'react';

export const usePasswordStrength = (password, { colors = [] }) => {
    let passwordStrength;

    const countRegex = (data) => (data.length > 12 ? true : false);
    const lettersRegex = (data) => /[A-Za-z]+/.test(data);
    const numbersRegex = (data) => /[0-9]+/.test(data);
    const specialRegex = (data) => /[!\"$%&/()=?@~`\\.\';:+=^*_-]+/.test(data);

    const calculateStrength = (paramsObj) =>
        Object.values(paramsObj).filter((value) => value).length;

    passwordStrength = calculateStrength({
        count: countRegex(password),
        letters: lettersRegex(password),
        numbers: numbersRegex(password),
        special: specialRegex(password),
    });

    return {
        passwordStrength,
        color: colors[passwordStrength - 1]
            ? colors[passwordStrength - 1]
            : colors[colors.length - 1],
    };
};
