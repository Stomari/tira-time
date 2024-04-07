/**
 * Shuffles a list of items.
 * Explanation can be found here: https://bost.ocks.org/mike/shuffle/
 * @param array List of strings to shuffle
 * @returns Shuffled list
 */
export const shuffle = (array: string[]): string[] => {
  let currentIndex: number = array.length;
  let randomIndex: number;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
