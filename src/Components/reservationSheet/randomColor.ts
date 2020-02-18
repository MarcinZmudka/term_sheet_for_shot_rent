export default mother();

function mother(){
  let previuos = 0;
  return function y(): string {
    const arrayOfColors = [
      "rgba(84, 18, 59, .5)",
      "rgba(132, 20, 45, .5)",
      "rgba(192, 39, 57, .5)",
      "rgba(41, 199, 172, .5)",
      "rgba(255, 231, 94, .5)",
      "rgba(82, 115, 24, .5)",
      "rgba(49,120,166, .5)",
      "rgba(77,180,182, .5)",
      "rgba(250,236,211, .5)",
      "rgba(248,85,115, .5)",
      "rgba(232,114,63, .5)"
    ];
    const randomNumber = Math.floor(Math.random() *(arrayOfColors.length-1));
    if(randomNumber == previuos){
      return y();
    }
    else{
      previuos = randomNumber;
    }
    return arrayOfColors[randomNumber];
  };
}