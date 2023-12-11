function toMillionsRounder(number) {
     const result = Math.round(number / 1000000);
     if (result === 0) {
         return "less than a ";
     } else {
         return result;
     }
}

export default toMillionsRounder;