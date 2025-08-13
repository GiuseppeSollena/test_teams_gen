import { teamsLightTheme, teamsDarkTheme, Theme, teamsHighContrastTheme } from '@fluentui/react-components';

export const getTheme = (themeString?: string): Theme => {
    switch (themeString) {
        case "dark":
            return teamsDarkTheme;
        case "contrast":
            return teamsHighContrastTheme;
        default:
            return {
                ...teamsLightTheme,       
                // -----COLORS-----
                // Brand
                colorBrandBackground: '#3E6FA3',         
            };
    }
};
