import acssRuleMap from './ruleMap';

export const generateAtomicClass = (selectedElementCssText = '') => {
    const inlineStyleText = selectedElementCssText;
    const inlineStyleArray =
        (inlineStyleText && inlineStyleText.split('; ')) || [];
    const styleMap = [];

    inlineStyleArray.forEach(styleString => {
        if (!styleString) {
            return;
        }
        const styleArray = styleString.replace(';', '').split(': ');
        const style = {
            [styleArray[0]]: styleArray[1]
        };

        let acssClass = acssRuleMap[`${styleArray[0]}: ${styleArray[1]}`];

        if (acssClass) {
            styleMap.push(acssClass);
        } else {
            acssClass = acssRuleMap[`${styleArray[0]}: value`];
            styleMap.push(
                acssClass
                    .replace('<value> or ', '')
                    .replace('<custom-param>', styleArray[1])
            );
        }
    });

    return {
        acss: styleMap.join(' ').toString()
    };
};
