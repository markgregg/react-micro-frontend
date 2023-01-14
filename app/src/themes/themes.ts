import CSS from 'csstype';
export enum Themes {
  None = "None",
  Dark = "Dark",
  Light = "Light",
  Blue = "Blue",
}

export const themes = Object.keys(Themes).filter((item) => {
  return isNaN(Number(item));
});

type Theme = {
  selectBackgroundColor: CSS.Property.BackgroundColor | null;
  selectFontColor: CSS.Property.Color | null;
  selectFontHighLightColor: CSS.Property.Color | null;
  selectDisableBackgroundColor: CSS.Property.BackgroundColor | null;
  selectToolTipBackgroundColor: CSS.Property.Color | null;
  selectHighLightBackgroundColor: CSS.Property.Color | null;
  selectBorder: CSS.Property.Border | null;
  pageColor1: CSS.Property.BackgroundColor;
  pageColor2: CSS.Property.BackgroundColor;
  pageColor3: CSS.Property.BackgroundColor;
  pageColor4: CSS.Property.BackgroundColor;
  pageColor5: CSS.Property.BackgroundColor;
  pageFontColor: CSS.Property.Color;
}

const setColors = (theme: Theme) => {
  document.documentElement.style.setProperty("--universalSelectBackgroundColor", theme.selectBackgroundColor);
  document.documentElement.style.setProperty("--universalSelectFontColor", theme.selectFontColor);
  document.documentElement.style.setProperty("--universalSelectDisabledBackgroundColor", theme.selectDisableBackgroundColor);
  document.documentElement.style.setProperty("--universalSelectSelectedBackgroundColor", theme.selectHighLightBackgroundColor);
  document.documentElement.style.setProperty("--universalSelectHighlihtedBackgroundColor", theme.selectHighLightBackgroundColor);
  document.documentElement.style.setProperty("--universalSelectBorder", theme.selectBorder !== null ? theme.selectBorder.toString() : null);
  document.documentElement.style.setProperty("--compactSelectBackgroundColor", theme.selectBackgroundColor);
  document.documentElement.style.setProperty("--compactSelectFontColor", theme.selectFontColor);
  document.documentElement.style.setProperty("--compactSelectFonHighlightColor", theme.selectFontHighLightColor);
  document.documentElement.style.setProperty("--compactSelectDisabledBackgroundColor", theme.selectDisableBackgroundColor);
  document.documentElement.style.setProperty("--compactSelectToolTipBackgroundColor", theme.selectToolTipBackgroundColor);
  document.documentElement.style.setProperty("--compactSelectHighlightedBackgroundColor", theme.selectHighLightBackgroundColor);
  document.documentElement.style.setProperty("--compactSelectBorder", theme.selectBorder !== null ? theme.selectBorder.toString() : null);
  document.documentElement.style.setProperty("--pageColor1", theme.pageColor1);
  document.documentElement.style.setProperty("--pageColor2", theme.pageColor2);
  document.documentElement.style.setProperty("--pageColor3",theme.pageColor3);
  document.documentElement.style.setProperty("--pageColor4",theme.pageColor4);
  document.documentElement.style.setProperty("--pageColor5",theme.pageColor5);
  document.documentElement.style.setProperty("--pageFont", theme.pageFontColor);
}

export const applyTheme = (theme: string) => {
  switch(theme){
    case Themes.Blue: 
      setColors({
        selectBackgroundColor: "#5555ad",
        selectFontColor: "White",
        selectFontHighLightColor: "LightGray",
        selectDisableBackgroundColor: "#9c9ccb",
        selectToolTipBackgroundColor: "#9c9ccb",
        selectHighLightBackgroundColor: "#6a6ab3",
        selectBorder: "none",
        pageColor1: "rgb(195, 212, 233)",
        pageColor2: "#353576",
        pageColor3: "#9c9ccb",
        pageColor4: "#9c9ccb",
        pageColor5: "rgb(195, 212, 233)",
        pageFontColor: "Black",
      });
      break;
     case Themes.Dark: 
       setColors({
        selectBackgroundColor: "#6f24a7",
        selectFontColor: "Gainsboro",
        selectFontHighLightColor: "DarkGray",
        selectDisableBackgroundColor: "#834baf",
        selectToolTipBackgroundColor: "#834baf",
        selectHighLightBackgroundColor: "#431369",
        selectBorder: "none",
        pageColor1: "Black",
        pageColor2: "#430770",
        pageColor3: "#9C2BF1",
        pageColor4: "#Black",
        pageColor5: "rgb(30, 6, 34)",
        pageFontColor: "Gainsboro",
      });
      break;
    case Themes.Light: 
      setColors({
        selectBackgroundColor: "#e7d46b",
        selectFontColor: "#3D350B",
        selectFontHighLightColor: "DarkGray",
        selectDisableBackgroundColor: "#d5b70e",
        selectToolTipBackgroundColor: "#d5b70e",
        selectHighLightBackgroundColor: "#FCE355",
        selectBorder: "none",
        pageColor1: "#FEF4B9",
        pageColor2: "#E7C504",
        pageColor3: "#FCE355",
        pageColor4: "#e7d46b",
        pageColor5: "#FEF4B9",
        pageFontColor: "#3D350B",
      });
      break;
    case Themes.None: 
      setColors({
        selectBackgroundColor: null,
        selectFontColor: null,
        selectFontHighLightColor: null,
        selectDisableBackgroundColor: null,
        selectToolTipBackgroundColor: null,
        selectHighLightBackgroundColor: null,
        selectBorder: null,
        pageColor1: "White",
        pageColor2: "#CEE538",
        pageColor3: "#849513",
        pageColor4: "Gainsboro",
        pageColor5: "White",
        pageFontColor: "Black",
      });
      break;
  }
  
}

