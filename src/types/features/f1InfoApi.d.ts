export interface InfoTeam {
  id: string;
  miniImage: ImageMode;
  fullImage: ImageMode;
}

export interface ImageMode {
  light: string;
  dark?: string;
}

// export interface ImageModeWithDark extends ImageMode {
//     dark: string
// }
