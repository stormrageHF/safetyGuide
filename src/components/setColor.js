export default class SetColor {
  getColor;
  constructor() {
    const colors = [
      "#2c5b8e",
      "#3e7abe",
      "#55a0f8",
      "#4db0ff",
      "#20b6ff",
      "#8bd5ff",
      "#bbe8ff",
      "#e0f6ff",
      "#efefef",
      "#ffffff",
    ];

    this.getColor = confirm => {
      let color = "#E2EBF4";
      if (confirm) {
        if (confirm >= 30000000) {
          color = colors[0];
        } else if (confirm >= 10000000) {
          color = colors[1];
        } else if (confirm >= 3000000) {
          color = colors[2];
        } else if (confirm >= 300000) {
          color = colors[3];
        } else if (confirm >= 100000) {
          color = colors[4];
        } else if (confirm >= 30000) {
          color = colors[5];
        } else if (confirm >= 10000) {
          color = colors[6];
        } else if (confirm >= 3000) {
          color = colors[7];
        } else if (confirm >= 0) {
          color = colors[8];
        }
      }
      return color;
    };
  }
}
