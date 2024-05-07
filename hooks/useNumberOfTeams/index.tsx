import { useState } from 'react';

export const useNumberOfTeams = (initialValue?: string) => {
  const [numberOfTeams, setNumberOfTeams] = useState<string>(
    initialValue ?? '',
  );
  const [error, setError] = useState<boolean>(false);

  const onSetNumberOfTeams = (text: string) => {
    validate(text);
    setNumberOfTeams(text);
  };

  const validate = (text: string) => {
    try {
      const value = parseInt(text, 10);
      // Number of teams must be between 2 and 100
      if (value <= 1 || value > 100 || isNaN(value)) {
        throw new Error();
      }
      if (error) {
        setError(false);
      }
    } catch {
      if (!error) {
        setError(true);
      }
    }
  };

  return {
    numberOfTeams,
    onSetNumberOfTeams,
    error,
  };
};
