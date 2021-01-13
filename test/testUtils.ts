import { screen } from '@testing-library/react';

export function itemInView(name: string): boolean {
    try {
      screen.getByRole('img', {name: name});
      return true;
    } catch(err){
      return false;
    }
}
