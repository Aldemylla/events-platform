import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export const useFormatDate = (date: Date) => {
  const formattedDate = format(date, "EEEEEE'., 'd' de 'MMM'. de 'yyyy', 'p", {
    locale: ptBR,
  });

  return [formattedDate];
};
